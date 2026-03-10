'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import './barista.css';
import type { SipsOrder, FulfillmentState } from '@/lib/sips-types';

/* ─────────────── HELPERS ─────────────── */

function timeAgo(isoString: string): { text: string; urgency: 'normal' | 'urgent' | 'overdue' } {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60000);

  if (mins < 1) return { text: 'Just now', urgency: 'normal' };
  if (mins < 60) {
    const urgency = mins > 20 ? 'overdue' : mins > 10 ? 'urgent' : 'normal';
    return { text: `${mins}m ago`, urgency };
  }
  const hours = Math.floor(mins / 60);
  return { text: `${hours}h ${mins % 60}m ago`, urgency: 'overdue' };
}

function formatPickupTime(isoString: string): string {
  const d = new Date(isoString);
  const hours = d.getHours();
  const mins = String(d.getMinutes()).padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';
  return `${hours % 12 || 12}:${mins} ${period}`;
}

function getNextState(current: FulfillmentState): FulfillmentState | null {
  const map: Record<FulfillmentState, FulfillmentState | null> = {
    PROPOSED: 'RESERVED',
    RESERVED: 'PREPARED',
    PREPARED: 'COMPLETED',
    COMPLETED: null,
  };
  return map[current];
}

function getActionLabel(current: FulfillmentState): string {
  const map: Record<FulfillmentState, string> = {
    PROPOSED: 'Start Preparing',
    RESERVED: 'Mark Ready',
    PREPARED: 'Collected',
    COMPLETED: 'Done',
  };
  return map[current];
}

function getActionClass(current: FulfillmentState): string {
  const map: Record<FulfillmentState, string> = {
    PROPOSED: 'action-start',
    RESERVED: 'action-ready',
    PREPARED: 'action-collect',
    COMPLETED: '',
  };
  return map[current];
}

// Simple notification beep using Web Audio API
function playNotificationBeep() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    osc.type = 'sine';
    gain.gain.value = 0.15;
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);

    // Second beep
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.frequency.value = 1100;
    osc2.type = 'sine';
    gain2.gain.value = 0.15;
    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
    osc2.start(ctx.currentTime + 0.15);
    osc2.stop(ctx.currentTime + 0.45);
  } catch {
    // Audio not available, fail silently
  }
}

/* ─────────────── PASSWORD GATE ─────────────── */

function PasswordGate({ onAuth }: { onAuth: (password: string) => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/sips/orders', {
        headers: { 'Authorization': `Bearer ${password.trim()}` },
      });
      if (res.status === 401) {
        setError('Incorrect password');
        setLoading(false);
        return;
      }
      if (!res.ok) {
        setError('Something went wrong');
        setLoading(false);
        return;
      }
      // Password works — store and proceed
      localStorage.setItem('sips-barista-auth', password.trim());
      onAuth(password.trim());
    } catch {
      setError('Connection failed');
      setLoading(false);
    }
  };

  return (
    <div className="pw-gate">
      <form className="pw-card" onSubmit={handleSubmit}>
        <svg className="pw-icon" width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="8" y="22" width="32" height="22" rx="4" stroke="#EDE8D5" strokeWidth="2.5" fill="none" />
          <path d="M16 22V14C16 9.6 19.6 6 24 6C28.4 6 32 9.6 32 14V22" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="24" cy="33" r="3" fill="#EDE8D5" />
        </svg>
        <h1 className="pw-title">Barista Dashboard</h1>
        <p className="pw-sub">Enter the barista password to continue</p>
        <input
          className="pw-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          autoComplete="off"
        />
        <button className="pw-btn" type="submit" disabled={loading}>
          {loading ? 'Checking...' : 'Enter'}
        </button>
        {error && <p className="pw-error">{error}</p>}
      </form>
    </div>
  );
}

/* ─────────────── ORDER CARD ─────────────── */

function OrderCard({
  order,
  onAdvance,
  isNew,
}: {
  order: SipsOrder;
  onAdvance: (order: SipsOrder) => void;
  isNew: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const { text: timeText, urgency } = timeAgo(order.createdAt);
  const nextState = getNextState(order.state);

  const handleAction = async () => {
    if (!nextState || loading) return;
    setLoading(true);
    await onAdvance(order);
    setLoading(false);
  };

  return (
    <div className={`order-card${isNew ? ' new-flash' : ''}`}>
      <div className="order-card-top">
        <div className="order-card-name">{order.customerName}</div>
        <div className={`order-card-time-ago ${urgency}`}>{timeText}</div>
      </div>

      <ul className="order-card-items">
        {order.items.map((item, i) => (
          <li key={i}>
            <span className="order-card-qty">{item.quantity}x</span>
            {item.name}
            {item.variationName && item.variationName !== 'Regular' && (
              <span style={{ color: 'var(--cream-3)', fontSize: 17 }}>({item.variationName})</span>
            )}
          </li>
        ))}
      </ul>

      <div className="order-card-pickup">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6.5" stroke="#C8C1A4" strokeWidth="1.5" />
          <line x1="8" y1="4" x2="8" y2="8" stroke="#C8C1A4" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="8" y1="8" x2="11" y2="10" stroke="#C8C1A4" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        Pickup: {formatPickupTime(order.pickupTime)}
      </div>

      {nextState && (
        <button
          className={`order-card-action ${getActionClass(order.state)}`}
          onClick={handleAction}
          disabled={loading}
        >
          {loading ? (
            <span className="action-loading">
              <span className="action-spinner" />
              Updating...
            </span>
          ) : (
            getActionLabel(order.state)
          )}
        </button>
      )}
    </div>
  );
}

/* ─────────────── DASHBOARD ─────────────── */

function Dashboard({ password }: { password: string }) {
  const [orders, setOrders] = useState<SipsOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [clock, setClock] = useState('');
  const prevOrderIds = useRef<Set<string>>(new Set());
  const [newOrderIds, setNewOrderIds] = useState<Set<string>>(new Set());
  const isFirstLoad = useRef(true);

  // Clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const mins = String(now.getMinutes()).padStart(2, '0');
      const period = now.getHours() >= 12 ? 'PM' : 'AM';
      setClock(`${hours}:${mins} ${period}`);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch orders
  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch('/api/sips/orders', {
        headers: { 'Authorization': `Bearer ${password}` },
      });
      if (!res.ok) return;
      const data = await res.json();
      if (!data.success) return;

      const fetched: SipsOrder[] = data.orders || [];
      setOrders(fetched);

      // Detect new orders (skip first load)
      if (!isFirstLoad.current) {
        const currentIds = new Set(fetched.map((o) => o.id));
        const brandNew = new Set<string>();
        currentIds.forEach((id) => {
          if (!prevOrderIds.current.has(id)) {
            brandNew.add(id);
          }
        });
        if (brandNew.size > 0) {
          playNotificationBeep();
          setNewOrderIds(brandNew);
          setTimeout(() => setNewOrderIds(new Set()), 3000);
        }
        prevOrderIds.current = currentIds;
      } else {
        prevOrderIds.current = new Set(fetched.map((o) => o.id));
        isFirstLoad.current = false;
      }

      setLoading(false);
    } catch {
      setLoading(false);
    }
  }, [password]);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 15000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  // Advance order status
  const handleAdvance = async (order: SipsOrder) => {
    const nextState = getNextState(order.state);
    if (!nextState) return;

    try {
      const res = await fetch('/api/sips/update-order', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          fulfillmentUid: order.fulfillmentUid,
          newState: nextState,
          version: order.version,
          password,
        }),
      });

      if (res.ok) {
        // Optimistic update
        setOrders((prev) =>
          prev.map((o) =>
            o.id === order.id ? { ...o, state: nextState, version: o.version + 1 } : o,
          ),
        );
      }
    } catch {
      // Refetch on error
      fetchOrders();
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('sips-barista-auth');
    window.location.reload();
  };

  // Group orders by state
  const newOrders = orders.filter((o) => o.state === 'PROPOSED');
  const prepOrders = orders.filter((o) => o.state === 'RESERVED');
  const readyOrders = orders.filter((o) => o.state === 'PREPARED');
  const activeCount = newOrders.length + prepOrders.length + readyOrders.length;

  if (loading) {
    return (
      <>
        <header className="dash-header">
          <div className="dash-logo">euforyc <span>sips</span></div>
        </header>
        <div className="dash-loading">
          <div className="dash-loading-text">
            <span className="dash-loading-spinner" />
            Loading orders...
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <header className="dash-header">
        <div className="dash-logo">euforyc <span>sips</span></div>
        <div className="dash-info">
          <span className="dash-clock">{clock}</span>
          <div className="dash-order-count">
            <span className="dash-count-dot" />
            <span className="dash-count-text">{activeCount} active</span>
          </div>
          <button className="dash-logout" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className="dash-board">
        {/* NEW */}
        <div className="dash-col col-new">
          <div className="dash-col-header">
            <h2 className="dash-col-title">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="#6FCF6A" strokeWidth="2" />
                <line x1="10" y1="6" x2="10" y2="14" stroke="#6FCF6A" strokeWidth="2" strokeLinecap="round" />
                <line x1="6" y1="10" x2="14" y2="10" stroke="#6FCF6A" strokeWidth="2" strokeLinecap="round" />
              </svg>
              New
            </h2>
            <span className="dash-col-count">{newOrders.length}</span>
          </div>
          {newOrders.length === 0 ? (
            <div className="dash-col-empty">
              <p className="dash-col-empty-text">No new orders</p>
            </div>
          ) : (
            newOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onAdvance={handleAdvance}
                isNew={newOrderIds.has(order.id)}
              />
            ))
          )}
        </div>

        {/* PREPARING */}
        <div className="dash-col col-prep">
          <div className="dash-col-header">
            <h2 className="dash-col-title">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="#D4A853" strokeWidth="2" />
                <path d="M10 6V10L13 12" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Preparing
            </h2>
            <span className="dash-col-count">{prepOrders.length}</span>
          </div>
          {prepOrders.length === 0 ? (
            <div className="dash-col-empty">
              <p className="dash-col-empty-text">Nothing in progress</p>
            </div>
          ) : (
            prepOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onAdvance={handleAdvance}
                isNew={false}
              />
            ))
          )}
        </div>

        {/* READY */}
        <div className="dash-col col-ready">
          <div className="dash-col-header">
            <h2 className="dash-col-title">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="#EDE8D5" strokeWidth="2" />
                <polyline points="6,10 9,13 14,7" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Ready
            </h2>
            <span className="dash-col-count">{readyOrders.length}</span>
          </div>
          {readyOrders.length === 0 ? (
            <div className="dash-col-empty">
              <p className="dash-col-empty-text">No drinks ready</p>
            </div>
          ) : (
            readyOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onAdvance={handleAdvance}
                isNew={false}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

/* ─────────────── MAIN PAGE ─────────────── */

export default function BaristaPage() {
  const [password, setPassword] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  // Check for stored auth on mount
  useEffect(() => {
    const stored = localStorage.getItem('sips-barista-auth');
    if (stored) {
      // Validate stored password still works
      fetch('/api/sips/orders', {
        headers: { 'Authorization': `Bearer ${stored}` },
      })
        .then((res) => {
          if (res.ok) {
            setPassword(stored);
          } else {
            localStorage.removeItem('sips-barista-auth');
          }
          setChecking(false);
        })
        .catch(() => {
          setChecking(false);
        });
    } else {
      setChecking(false);
    }
  }, []);

  if (checking) {
    return (
      <div className="dash-loading" style={{ minHeight: '100vh' }}>
        <div className="dash-loading-text">
          <span className="dash-loading-spinner" />
        </div>
      </div>
    );
  }

  if (!password) {
    return <PasswordGate onAuth={setPassword} />;
  }

  return <Dashboard password={password} />;
}
