'use client';

import { Suspense, useEffect, useReducer, useRef, useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import './order.css';
import type { MenuItem, MenuCategory, MenuVariation, MenuModifier, CartItem, CartAction } from '@/lib/sips-types';

/* ─────────────── CART HELPERS ─────────────── */

// Unique key for a cart item based on variation + selected modifiers
function cartKey(variationId: string, modifiers: MenuModifier[]): string {
  const modIds = modifiers.map((m) => m.id).sort().join(',');
  return `${variationId}::${modIds}`;
}

function cartItemKey(item: CartItem): string {
  return cartKey(item.selectedVariation.id, item.selectedModifiers);
}

/* ─────────────── CART REDUCER ─────────────── */

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD_ITEM': {
      const key = cartKey(action.variation.id, action.modifiers);
      const existing = state.find((i) => cartItemKey(i) === key);
      if (existing) {
        return state.map((i) =>
          cartItemKey(i) === key ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [
        ...state,
        {
          menuItem: action.menuItem,
          selectedVariation: action.variation,
          selectedModifiers: action.modifiers,
          quantity: 1,
        },
      ];
    }
    case 'REMOVE_ITEM':
      return state.filter((i) => cartItemKey(i) !== action.cartKey);
    case 'UPDATE_QUANTITY':
      if (action.quantity <= 0) {
        return state.filter((i) => cartItemKey(i) !== action.cartKey);
      }
      return state.map((i) =>
        cartItemKey(i) === action.cartKey ? { ...i, quantity: action.quantity } : i,
      );
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

/* ─────────────── HELPERS ─────────────── */

function formatPrice(pence: number): string {
  return `£${(pence / 100).toFixed(2)}`;
}

function getLondonDate(): Date {
  const str = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' });
  const [datePart, timePart] = str.split(', ');
  const [day, month, year] = datePart.split('/').map(Number);
  const [hours, minutes, seconds] = timePart.split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes, seconds);
}

const OPEN_HOUR = 10;
const CLOSE_HOUR = 22;

function isCurrentlyOpen(): boolean {
  const london = getLondonDate();
  return london.getHours() >= OPEN_HOUR && london.getHours() < CLOSE_HOUR;
}

function getCloseTime(): string {
  const h = CLOSE_HOUR > 12 ? CLOSE_HOUR - 12 : CLOSE_HOUR;
  return `${h}:00 ${CLOSE_HOUR >= 12 ? 'pm' : 'am'}`;
}

function generateTimeSlots(): { label: string; value: string }[] {
  const slots: { label: string; value: string }[] = [];
  const london = getLondonDate();
  const h = london.getHours();
  const open = h >= OPEN_HOUR && h < CLOSE_HOUR;
  let start: Date;
  let isNextDay = false;

  if (open) {
    start = new Date(london.getTime() + 30 * 60000);
    start.setMinutes(Math.ceil(start.getMinutes() / 15) * 15, 0, 0);
    const closeToday = new Date(london);
    closeToday.setHours(CLOSE_HOUR, 0, 0, 0);
    if (start >= closeToday) {
      start = new Date(london);
      start.setDate(start.getDate() + 1);
      start.setHours(OPEN_HOUR, 0, 0, 0);
      isNextDay = true;
    }
  } else {
    if (h < OPEN_HOUR) {
      start = new Date(london);
      start.setHours(OPEN_HOUR, 0, 0, 0);
    } else {
      start = new Date(london);
      start.setDate(start.getDate() + 1);
      start.setHours(OPEN_HOUR, 0, 0, 0);
      isNextDay = true;
    }
  }

  const closeTime = new Date(start);
  closeTime.setHours(CLOSE_HOUR, 0, 0, 0);

  for (let i = 0; i < 16 && new Date(start.getTime() + i * 15 * 60000) < closeTime; i++) {
    const slot = new Date(start.getTime() + i * 15 * 60000);
    const hrs = slot.getHours();
    const mins = String(slot.getMinutes()).padStart(2, '0');
    const period = hrs >= 12 ? 'PM' : 'AM';
    const displayH = hrs % 12 || 12;
    const dayLabel = isNextDay ? ' (tomorrow)' : '';
    slots.push({ label: `${displayH}:${mins} ${period}${dayLabel}`, value: slot.toISOString() });
  }
  return slots;
}

/* ─────────────── SVG PLACEHOLDERS ─────────────── */

function DrinkPlaceholderIllo() {
  return (
    <svg className="menu-card-img-placeholder" width="64" height="80" viewBox="0 0 64 80" fill="none">
      <path d="M16 18 L20 68 Q21 72 32 72 Q43 72 44 68 L48 18Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="32" cy="18" rx="16" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="40" y1="17" x2="48" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="52" cy="8" r="4" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

function CartEmptyIllo() {
  return (
    <svg className="cart-empty-illo" width="72" height="90" viewBox="0 0 80 100" fill="none">
      <path d="M20 25 L25 80 Q26 85 40 85 Q54 85 55 80 L60 25Z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="40" cy="25" rx="20" ry="5" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M23 45 Q40 40 57 45" stroke="currentColor" strokeWidth="1.2" fill="none" strokeDasharray="4 5" />
      <path d="M24 60 Q40 55 56 60" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="3 5" />
    </svg>
  );
}

/* ─────────────── ICONS ─────────────── */

function PhoneIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3.2 1.6C3.6 1.2 4.2 1 4.6 1.2L6.8 2.4C7.2 2.6 7.4 3.2 7.2 3.6L6.4 5.6C6.2 6 6.4 6.4 6.6 6.6L9.4 9.4C9.6 9.6 10 9.8 10.4 9.6L12.4 8.8C12.8 8.6 13.4 8.8 13.6 9.2L14.8 11.4C15 11.8 14.8 12.4 14.4 12.8L13 14.2C12.4 14.8 11.6 15 10.8 14.8C8.4 14 6.2 12.6 4.4 10.8C2.6 9 1.4 6.8 0.6 4.4C0.4 3.6 0.6 2.8 1.2 2.2L3.2 1.6Z" stroke="currentColor" strokeWidth="1.2" fill="none" /></svg>;
}
function LinkIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 2H3C2.4 2 2 2.4 2 3V13C2 13.6 2.4 14 3 14H13C13.6 14 14 13.6 14 13V10M10 2H14V6M14 2L7 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function InstagramIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="1.5" width="13" height="13" rx="4" stroke="currentColor" strokeWidth="1.2" /><circle cx="8" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.2" /><circle cx="12" cy="4" r="0.8" fill="currentColor" /></svg>;
}
function MapPinIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1C5.2 1 3 3.2 3 6C3 9.5 8 15 8 15C8 15 13 9.5 13 6C13 3.2 10.8 1 8 1Z" stroke="currentColor" strokeWidth="1.2" fill="none" /><circle cx="8" cy="6" r="2" stroke="currentColor" strokeWidth="1.2" fill="none" /></svg>;
}
function SearchIcon({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><circle cx="8.5" cy="8.5" r="6" stroke="currentColor" strokeWidth="1.5" /><path d="M13 13L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
}

/* ─────────────── PRODUCT DETAIL MODAL ─────────────── */

function ProductModal({
  item,
  onClose,
  onAddToCart,
}: {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, variation: MenuVariation, modifiers: MenuModifier[]) => void;
}) {
  const [selectedVar, setSelectedVar] = useState(0);
  const [selectedModifiers, setSelectedModifiers] = useState<Map<string, Set<string>>>(new Map());
  const [qty, setQty] = useState(1);
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset state when item changes
  useEffect(() => {
    if (item) {
      setSelectedVar(0);
      setSelectedModifiers(new Map());
      setQty(1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [item]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (item) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [item, onClose]);

  if (!item) return null;

  const toggleModifier = (groupId: string, modId: string, selectionType: 'SINGLE' | 'MULTIPLE') => {
    setSelectedModifiers((prev) => {
      const next = new Map(prev);
      const groupSet = new Set(next.get(groupId) || []);

      if (selectionType === 'SINGLE') {
        // Radio: toggle off or select new
        if (groupSet.has(modId)) {
          groupSet.delete(modId);
        } else {
          groupSet.clear();
          groupSet.add(modId);
        }
      } else {
        // Checkbox: toggle
        if (groupSet.has(modId)) {
          groupSet.delete(modId);
        } else {
          groupSet.add(modId);
        }
      }

      next.set(groupId, groupSet);
      return next;
    });
  };

  // Calculate total price
  const basePrice = item.variations[selectedVar]?.pricePence || 0;
  let modifierPrice = 0;
  for (const group of item.modifierGroups) {
    const selected = selectedModifiers.get(group.id);
    if (selected) {
      for (const mod of group.modifiers) {
        if (selected.has(mod.id)) modifierPrice += mod.pricePence;
      }
    }
  }
  const totalPrice = (basePrice + modifierPrice) * qty;

  const handleAdd = () => {
    // Collect all selected modifiers
    const mods: MenuModifier[] = [];
    for (const group of item.modifierGroups) {
      const selected = selectedModifiers.get(group.id);
      if (selected) {
        for (const mod of group.modifiers) {
          if (selected.has(mod.id)) mods.push(mod);
        }
      }
    }
    for (let i = 0; i < qty; i++) {
      onAddToCart(item, item.variations[selectedVar], mods);
    }
    onClose();
  };

  return (
    <>
      <div className="pdp-overlay" onClick={onClose} />
      <div className="pdp-modal" ref={modalRef}>
        <button className="pdp-close" onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Image */}
        <div className={`pdp-image${item.imageUrl ? ' has-img' : ''}`}>
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.name} />
          ) : (
            <div className="pdp-image-placeholder">
              <DrinkPlaceholderIllo />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="pdp-content">
          <h2 className="pdp-name">{item.name}</h2>
          {item.description && <p className="pdp-desc">{item.description}</p>}

          {/* Variations */}
          {item.variations.length > 1 && (
            <div className="pdp-section">
              <h3 className="pdp-section-title">Size</h3>
              <div className="pdp-options">
                {item.variations.map((v, i) => (
                  <button
                    key={v.id}
                    className={`pdp-option-btn${selectedVar === i ? ' active' : ''}`}
                    onClick={() => setSelectedVar(i)}
                  >
                    <span>{v.name}</span>
                    <span className="pdp-option-price">{formatPrice(v.pricePence)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Modifier Groups */}
          {item.modifierGroups.map((group) => (
            <div key={group.id} className="pdp-section">
              <h3 className="pdp-section-title">{group.name}</h3>
              <div className="pdp-modifiers">
                {group.modifiers.map((mod) => {
                  const isSelected = selectedModifiers.get(group.id)?.has(mod.id) || false;
                  return (
                    <label key={mod.id} className={`pdp-modifier${isSelected ? ' selected' : ''}`}>
                      <div className={`pdp-checkbox${group.selectionType === 'SINGLE' ? ' radio' : ''}`}>
                        {isSelected && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleModifier(group.id, mod.id, group.selectionType)}
                        style={{ display: 'none' }}
                      />
                      <span className="pdp-modifier-name">{mod.name}</span>
                      {mod.pricePence > 0 && (
                        <span className="pdp-modifier-price">+{formatPrice(mod.pricePence)}</span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sticky bottom bar */}
        <div className="pdp-footer">
          <div className="pdp-qty">
            <button className="pdp-qty-btn" onClick={() => setQty(Math.max(1, qty - 1))} disabled={qty <= 1}>−</button>
            <span className="pdp-qty-val">{qty}</span>
            <button className="pdp-qty-btn" onClick={() => setQty(qty + 1)}>+</button>
          </div>
          <button className="pdp-add-btn" onClick={handleAdd}>
            Add for {formatPrice(totalPrice)}
          </button>
        </div>
      </div>
    </>
  );
}

/* ─────────────── SEARCH MODAL ─────────────── */

function SearchModal({
  open,
  onClose,
  categories,
  onSelectItem,
}: {
  open: boolean;
  onClose: () => void;
  categories: MenuCategory[];
  onSelectItem: (item: MenuItem) => void;
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) { setQuery(''); setTimeout(() => inputRef.current?.focus(), 100); }
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const matches: (MenuItem & { _cat: string })[] = [];
    for (const cat of categories) {
      for (const item of cat.items) {
        if (item.name.toLowerCase().includes(q) || item.description?.toLowerCase().includes(q)) {
          matches.push({ ...item, _cat: cat.name });
        }
      }
    }
    return matches.slice(0, 8);
  }, [query, categories]);

  return (
    <>
      <div className={`search-overlay${open ? ' open' : ''}`} onClick={onClose} />
      <div className={`search-modal${open ? ' open' : ''}`}>
        <div className="search-input-wrap">
          <SearchIcon size={18} />
          <input ref={inputRef} className="search-input" type="text" placeholder="Search drinks..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        {query.trim() && (
          <div className="search-results">
            {results.length === 0 ? (
              <div className="search-empty">No drinks found for &quot;{query}&quot;</div>
            ) : (
              results.map((item) => (
                <div key={item.id} className="search-result-item" onClick={() => { onSelectItem(item); onClose(); }}>
                  <div className="search-result-img">
                    {item.imageUrl ? <img src={item.imageUrl} alt={item.name} /> : null}
                  </div>
                  <div className="search-result-info">
                    <div className="search-result-name">{item.name}</div>
                    <div className="search-result-cat">{(item as MenuItem & { _cat: string })._cat}</div>
                  </div>
                  <div className="search-result-price">{formatPrice(item.variations[0]?.pricePence || 0)}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}

/* ─────────────── MENU CARD ─────────────── */

function MenuItemCard({
  item,
  onTap,
}: {
  item: MenuItem;
  onTap: (item: MenuItem) => void;
}) {
  const lowestPrice = Math.min(...item.variations.map((v) => v.pricePence));

  return (
    <div className="menu-card" onClick={() => onTap(item)}>
      <div className="menu-card-img">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} loading="lazy" />
        ) : (
          <DrinkPlaceholderIllo />
        )}
      </div>
      <h3 className="menu-card-name">{item.name}</h3>
      {item.description && <p className="menu-card-desc">{item.description}</p>}
      <div className="menu-card-footer">
        <div className="menu-card-price">
          {item.variations.length > 1 && <span className="menu-card-price-from">from </span>}
          {formatPrice(lowestPrice)}
        </div>
        <button className="add-btn" onClick={(e) => { e.stopPropagation(); onTap(item); }} aria-label={`Add ${item.name}`}>
          +
        </button>
      </div>
    </div>
  );
}

/* ─────────────── CART CONTENT ─────────────── */

function CartContent({
  cart,
  dispatch,
  customerName,
  setCustomerName,
  pickupTime,
  setPickupTime,
  note,
  setNote,
  onCheckout,
  isSubmitting,
}: {
  cart: CartItem[];
  dispatch: React.Dispatch<CartAction>;
  customerName: string;
  setCustomerName: (v: string) => void;
  pickupTime: string;
  setPickupTime: (v: string) => void;
  note: string;
  setNote: (v: string) => void;
  onCheckout: () => void;
  isSubmitting: boolean;
}) {
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPence = cart.reduce((sum, i) => {
    const modPrice = i.selectedModifiers.reduce((s, m) => s + m.pricePence, 0);
    return sum + (i.selectedVariation.pricePence + modPrice) * i.quantity;
  }, 0);
  const timeSlots = generateTimeSlots();
  const canCheckout = cart.length > 0 && customerName.trim() && pickupTime;

  return (
    <>
      <button
        className="checkout-btn"
        disabled={!canCheckout || isSubmitting}
        onClick={onCheckout}
        style={{ marginBottom: 20 }}
      >
        {isSubmitting ? (
          <><span className="checkout-btn-loading" />Processing...</>
        ) : (
          cart.length > 0 ? `Pay & Collect — ${formatPrice(totalPence)}` : 'Next: Checkout'
        )}
      </button>

      <div className="cart-header">
        <h2 className="cart-title">Your basket</h2>
        <span className="cart-count">{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
      </div>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <CartEmptyIllo />
          <p className="cart-empty-text">Your basket is empty</p>
          <p className="cart-empty-sub">Add drinks from the menu</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => {
              const key = cartItemKey(item);
              const modPrice = item.selectedModifiers.reduce((s, m) => s + m.pricePence, 0);
              const unitPrice = item.selectedVariation.pricePence + modPrice;
              return (
                <div key={key} className="cart-item">
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.menuItem.name}</div>
                    {item.selectedVariation.name !== 'Regular' && (
                      <div className="cart-item-var">{item.selectedVariation.name}</div>
                    )}
                    {item.selectedModifiers.length > 0 && (
                      <div className="cart-item-mods">
                        {item.selectedModifiers.map((m) => m.name).join(', ')}
                      </div>
                    )}
                    <div className="qty-controls">
                      <button className="qty-btn" onClick={() => dispatch({ type: 'UPDATE_QUANTITY', cartKey: key, quantity: item.quantity - 1 })}>−</button>
                      <span className="qty-val">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => dispatch({ type: 'UPDATE_QUANTITY', cartKey: key, quantity: item.quantity + 1 })}>+</button>
                    </div>
                    <button className="cart-item-remove" onClick={() => dispatch({ type: 'REMOVE_ITEM', cartKey: key })}>Remove</button>
                  </div>
                  <div className="cart-item-price">{formatPrice(unitPrice * item.quantity)}</div>
                </div>
              );
            })}
          </div>

          <div className="cart-form">
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input className="form-input" type="text" placeholder="e.g. Sarah" value={customerName} onChange={(e) => setCustomerName(e.target.value)} maxLength={50} />
            </div>
            <div className="form-group">
              <label className="form-label">Pickup Time</label>
              <select className="form-select" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)}>
                <option value="">Select a time...</option>
                {timeSlots.map((slot) => (<option key={slot.value} value={slot.value}>{slot.label}</option>))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Note for barista <span className="form-label-optional">(optional)</span></label>
              <textarea className="form-textarea" placeholder="e.g. extra ice, less sugar, allergies..." value={note} onChange={(e) => setNote(e.target.value)} maxLength={200} rows={2} />
            </div>
          </div>

          <div className="cart-total-row">
            <span className="cart-total-label">Total</span>
            <span className="cart-total-amount">{formatPrice(totalPence)}</span>
          </div>
        </>
      )}
    </>
  );
}

/* ─────────────── CONFIRMATION ─────────────── */

function OrderConfirmation() {
  return (
    <div className="confirm-overlay">
      <div className="confirm-card">
        <svg className="confirm-check" width="72" height="72" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="35" stroke="#6FCF6A" strokeWidth="2.5" fill="none" />
          <polyline points="24,42 36,54 56,30" stroke="#6FCF6A" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h1 className="confirm-title">Order Placed!</h1>
        <p className="confirm-sub">Your wellness drink is being prepared</p>
        <div className="confirm-prep"><span className="confirm-prep-dot" /><span>Estimated prep: 5–10 minutes</span></div>
        <div className="confirm-details">
          <div className="confirm-detail-row"><span className="confirm-detail-label">Status</span><span className="confirm-detail-value">Confirmed</span></div>
          <div className="confirm-detail-row"><span className="confirm-detail-label">Payment</span><span className="confirm-detail-value">Complete</span></div>
          <div className="confirm-detail-row"><span className="confirm-detail-label">Collection</span><span className="confirm-detail-value">euforyc sips counter</span></div>
        </div>
        <a href="/sips" className="confirm-btn">Back to Sips</a>
      </div>
    </div>
  );
}

/* ─────────────── LOADING SKELETON ─────────────── */

function MenuSkeleton() {
  return (
    <div>
      {[3, 3].map((count, idx) => (
        <div key={idx} style={{ marginBottom: 56 }}>
          <div className="skeleton-bar" style={{ width: idx === 0 ? '25%' : '20%', height: 28, marginBottom: 28, borderRadius: 4 }} />
          <div className="skeleton-grid">
            {[...Array(count)].map((_, i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-bar skeleton-img" />
                <div className="skeleton-bar skeleton-title" />
                <div className="skeleton-bar skeleton-text" />
                <div className="skeleton-bar skeleton-text-short" />
                <div className="skeleton-bar skeleton-price" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────── MAIN PAGE ─────────────── */

export default function OrderPage() {
  return (
    <Suspense fallback={<MenuSkeleton />}>
      <OrderPageInner />
    </Suspense>
  );
}

function OrderPageInner() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get('success') === 'true';

  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [customerName, setCustomerName] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [note, setNote] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const catNavRef = useRef<HTMLDivElement>(null);

  const fetchMenu = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/sips/catalog');
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to load menu');
      setCategories(data.categories || []);
      if (data.categories?.length) setActiveCategory(data.categories[0].name);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { if (!isSuccess) fetchMenu(); }, [isSuccess, fetchMenu]);

  // Scroll spy + reveal
  useEffect(() => {
    if (categories.length === 0) return;
    let revealObs: IntersectionObserver | null = null;
    let spyObs: IntersectionObserver | null = null;
    const timer = setTimeout(() => {
      revealObs = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }); }, { threshold: 0.05, rootMargin: '0px 0px 50px 0px' });
      spyObs = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) { const n = e.target.getAttribute('data-category'); if (n) setActiveCategory(n); } }); }, { threshold: 0.15, rootMargin: '-60px 0px -55% 0px' });
      sectionRefs.current.forEach((el) => { revealObs!.observe(el); spyObs!.observe(el); });
    }, 50);
    return () => { clearTimeout(timer); revealObs?.disconnect(); spyObs?.disconnect(); };
  }, [categories]);

  // Auto-scroll active pill
  useEffect(() => {
    if (!catNavRef.current) return;
    const btn = catNavRef.current.querySelector('.cat-nav-btn.active');
    if (btn) btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeCategory]);

  const handleAddToCart = useCallback((item: MenuItem, variation: MenuVariation, modifiers: MenuModifier[]) => {
    dispatch({ type: 'ADD_ITEM', menuItem: item, variation, modifiers });
  }, []);

  const handleCheckout = async () => {
    if (isSubmitting || !customerName.trim() || !pickupTime || cart.length === 0) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/sips/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map((ci) => ({
            catalogObjectId: ci.selectedVariation.id,
            quantity: ci.quantity,
            modifierIds: ci.selectedModifiers.map((m) => m.id),
          })),
          customerName: customerName.trim(),
          pickupAt: pickupTime,
          note: note.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to create order');
      window.location.href = data.paymentUrl;
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  const scrollToCategory = (name: string) => {
    const el = sectionRefs.current.get(name);
    if (el) { window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' }); }
    setActiveCategory(name);
  };

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPence = cart.reduce((sum, i) => {
    const modPrice = i.selectedModifiers.reduce((s, m) => s + m.pricePence, 0);
    return sum + (i.selectedVariation.pricePence + modPrice) * i.quantity;
  }, 0);
  const open = isCurrentlyOpen();

  if (isSuccess) return <OrderConfirmation />;

  return (
    <>
      {/* STORE HEADER */}
      <header className="store-header">
        <div className="store-header-left">
          <h1 className="store-name">euforyc sips</h1>
          <div className="store-status">
            <span className={`store-status-dot${open ? '' : ' closed'}`} />
            <span className={`store-status-text${open ? '' : ' closed'}`}>
              {open ? `Open until ${getCloseTime()}` : 'Currently closed'}
            </span>
            <svg className="store-status-chevron" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div className="store-links">
            <a href="tel:07375710385" className="store-link"><PhoneIcon />07375 710385</a>
            <a href="https://euforyc.co.uk/sips" target="_blank" rel="noopener noreferrer" className="store-link"><LinkIcon />euforyc.co.uk/sips</a>
            <a href="https://instagram.com/euforycsips" target="_blank" rel="noopener noreferrer" className="store-link"><InstagramIcon />@euforycsips</a>
            <a href="https://share.google/AA0qk3eCG3kwpucSc" target="_blank" rel="noopener noreferrer" className="store-link"><MapPinIcon />Inside euforyc studios, 7 Holmstall Parade, Edgware, London, HA8 5HX</a>
          </div>
        </div>
        <div className="store-header-right">
          <div className="store-brand-logo">euforyc <span>sips</span></div>
          <div className="store-pickup-badge">Pre-order for Pickup</div>
        </div>
      </header>

      <div className="store-divider"><div className="store-divider-line" /></div>

      {/* CATEGORY NAV */}
      {!loading && !error && categories.length > 0 && (
        <div className="cat-nav-wrapper">
          <div className="cat-nav" ref={catNavRef}>
            {categories.map((cat) => (
              <button key={cat.name} className={`cat-nav-btn${activeCategory === cat.name ? ' active' : ''}`} onClick={() => scrollToCategory(cat.name)}>{cat.name}</button>
            ))}
            <div className="cat-nav-search">
              <button className="cat-nav-search-btn" onClick={() => setSearchOpen(true)} aria-label="Search menu"><SearchIcon /></button>
            </div>
          </div>
        </div>
      )}

      {/* SEARCH */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} categories={categories} onSelectItem={(item) => setSelectedItem(item)} />

      {/* PRODUCT DETAIL MODAL */}
      <ProductModal item={selectedItem} onClose={() => setSelectedItem(null)} onAddToCart={handleAddToCart} />

      {/* MAIN LAYOUT */}
      <div className="order-layout">
        <div className="order-menu-col">
          {loading && <MenuSkeleton />}
          {error && (
            <div className="menu-error">
              <svg className="menu-error-icon" width="56" height="56" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" /><line x1="24" y1="24" x2="40" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><line x1="40" y1="24" x2="24" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              <p className="menu-error-text">Couldn&apos;t load the menu</p>
              <p className="menu-error-sub">{error}</p>
              <button className="retry-btn" onClick={fetchMenu}>Try Again</button>
            </div>
          )}
          {!loading && !error && categories.map((cat) => (
            <section key={cat.name} className="menu-section reveal" data-category={cat.name} ref={(el) => { if (el) sectionRefs.current.set(cat.name, el); }}>
              <h2 className="menu-section-title">{cat.name}</h2>
              <div className="menu-grid">
                {cat.items.map((item) => (<MenuItemCard key={item.id} item={item} onTap={setSelectedItem} />))}
              </div>
            </section>
          ))}
        </div>

        <aside className="cart-sidebar">
          <CartContent cart={cart} dispatch={dispatch} customerName={customerName} setCustomerName={setCustomerName} pickupTime={pickupTime} setPickupTime={setPickupTime} note={note} setNote={setNote} onCheckout={handleCheckout} isSubmitting={isSubmitting} />
        </aside>
      </div>

      {/* MOBILE FAB */}
      {totalItems > 0 && (
        <button className="mobile-cart-fab" onClick={() => setCartOpen(true)}>
          <span>View basket <span className="mobile-cart-fab-count">{totalItems}</span></span>
          <span className="mobile-cart-fab-total">{formatPrice(totalPence)}</span>
        </button>
      )}

      {/* MOBILE DRAWER */}
      <div className={`cart-overlay${cartOpen ? ' open' : ''}`} onClick={() => setCartOpen(false)} />
      <div className={`mobile-cart-drawer${cartOpen ? ' open' : ''}`}>
        <div className="drawer-handle" />
        <CartContent cart={cart} dispatch={dispatch} customerName={customerName} setCustomerName={setCustomerName} pickupTime={pickupTime} setPickupTime={setPickupTime} note={note} setNote={setNote} onCheckout={handleCheckout} isSubmitting={isSubmitting} />
      </div>
    </>
  );
}
