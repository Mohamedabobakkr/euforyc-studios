'use client';

import { useState } from 'react';
import './menu.css';

/* ─────────── MENU DATA ─────────── */

type MenuItem = {
  name: string;
  price: string;
  addons?: string;
};

type Category = {
  title: string;
  items: MenuItem[];
};

type MenuSection = {
  number: string;
  title: string;
  categories: Category[];
};

const menu: MenuSection[] = [
  {
    number: '01',
    title: 'drinks',
    categories: [
      {
        title: 'MATCHAS',
        items: [
          { name: 'Honey Matcha', price: '£5.00', addons: 'Milk upgrade · Serve hot or iced · Cold foam' },
          { name: 'Coconut Matcha', price: '£5.00', addons: 'Milk upgrade · Serve hot or iced · Cold foam' },
          { name: 'Spanish Matcha', price: '£5.00', addons: 'Milk upgrade · Serve hot or iced · Cold foam' },
          { name: 'White Chocolate Matcha', price: '£5.00', addons: 'Milk upgrade · Serve hot or iced · Cold foam' },
          { name: 'Strawberry Matcha', price: '£5.00', addons: 'Milk upgrade · Serve hot or iced · Cold foam' },
          { name: 'Blueberry Matcha', price: '£5.00', addons: 'Milk upgrade · Serve hot or iced · Cold foam' },
          { name: 'Vanilla Matcha', price: '£5.00', addons: 'Milk upgrade · Serve hot or iced · Cold foam' },
          { name: 'Date Matcha', price: '£5.00', addons: 'Milk upgrade · Serve hot or iced · Cold foam' },
          { name: 'Pistachio Matcha', price: '£5.00', addons: 'Milk upgrade · Serve hot or iced · Cold foam' },
          { name: 'Raspberry White Matcha', price: '£5.50', addons: 'Milk upgrade · Serve hot or iced · Cold foam' },
          { name: 'Coco Cloud Matcha', price: '£6.00', addons: 'Milk upgrade · Cold foam' },
          { name: 'Butterscotch Cookie Matcha', price: '£6.00', addons: 'Milk upgrade · Serve hot or iced · Cold foam' },
          { name: 'Straw Coco Cloud Matcha', price: '£6.00', addons: 'Milk upgrade · Cold foam' },
          { name: 'Mango Paradise Matcha', price: '£6.00', addons: 'Milk upgrade' },
        ],
      },
      {
        title: 'LATTES',
        items: [
          { name: 'Spanish Latte', price: '£4.50', addons: 'Milk upgrade · Serve hot or iced · Cold foam' },
          { name: 'Flat White', price: '£4.10', addons: 'Milk upgrade · Serve hot or iced · Coffee syrups' },
          { name: 'Espresso', price: '£3.50', addons: 'Coffee syrups' },
          { name: 'Mocha', price: '£4.60', addons: 'Milk upgrade · Coffee syrups · Cold foam' },
          { name: 'Mont Blanc', price: '£5.50', addons: 'Coffee syrups' },
          { name: 'Brown Sugar Shaken Espresso', price: '£5.50', addons: 'Cold foam' },
          { name: 'Blended Pistachio Spanish Latte', price: '£6.50', addons: 'Milk upgrade · Cold foam' },
          { name: 'Date Latte', price: '£5.00', addons: 'Milk upgrade · Serve hot or iced · Cold foam' },
          { name: 'Tahini Molasses Latte', price: '£5.00', addons: 'Milk upgrade · Serve hot or iced · Cold foam' },
          { name: 'Halawa Latte', price: '£5.00', addons: 'Milk upgrade · Serve hot or iced · Cold foam' },
        ],
      },
      {
        title: 'TEA & CHAI',
        items: [
          { name: 'Chai Latte', price: '£4.30', addons: 'Milk upgrade · Serve hot or iced' },
          { name: 'Tea', price: '£2.00' },
        ],
      },
      {
        title: 'PROTEIN SHAKES',
        items: [
          { name: 'Cookies & Cream', price: '£7.40', addons: 'Milk upgrade' },
          { name: 'Berries', price: '£7.20', addons: 'Milk upgrade' },
          { name: 'Snicker', price: '£7.40', addons: 'Milk upgrade' },
          { name: 'Blueberry Oat', price: '£7.40', addons: 'Milk upgrade' },
          { name: 'Avo Burst', price: '£7.40', addons: 'Milk upgrade' },
          { name: 'Straw-Nana', price: '£7.40', addons: 'Milk upgrade' },
          { name: 'Chocolate', price: '£7.20', addons: 'Milk upgrade' },
          { name: 'Pina Colada', price: '£7.20', addons: 'Milk upgrade' },
        ],
      },
      {
        title: 'SMOOTHIES',
        items: [
          { name: 'Date Caramel Banana', price: '£7.99' },
          { name: 'Pink Glow', price: '£7.90', addons: 'Collagen (+£1)' },
          { name: 'Dragon Ritual', price: '£7.90', addons: 'Collagen (+£1)' },
          { name: 'Blue Radiance', price: '£7.90', addons: 'Collagen (+£1)' },
          { name: 'Golden Aura', price: '£7.90', addons: 'Collagen (+£1)' },
        ],
      },
      {
        title: 'WATER',
        items: [{ name: 'Water', price: '£1.80' }],
      },
    ],
  },
  {
    number: '02',
    title: 'munchies',
    categories: [
      {
        title: 'TOASTIES',
        items: [
          { name: 'Classic Cheese', price: '£6.50' },
          { name: 'Tuna Melt', price: '£8.50' },
          { name: 'Chicken Pesto', price: '£8.50' },
          { name: 'Mozzarella Pesto', price: '£8.50' },
          { name: 'Halloumi & Hot Honey', price: '£8.50' },
          { name: 'Deli Toastie', price: '£9.00' },
        ],
      },
      {
        title: 'BOWLS & CAKES',
        items: [
          { name: 'Granola Bowl', price: '£5.50' },
          { name: 'Milk Cake', price: '£5.50', addons: 'Biscoff · Nutella · Pistachio' },
          { name: 'Protein Bar', price: '£2.30' },
        ],
      },
      {
        title: 'SAVOURY PASTRIES',
        items: [
          { name: 'Sausage Roll', price: '£4.50' },
          { name: 'Spinach & Feta Pastry', price: '£4.50' },
        ],
      },
    ],
  },
  {
    number: '03',
    title: 'desserts',
    categories: [
      {
        title: 'BAKERY',
        items: [
          { name: 'Muffins', price: '£2.50' },
          { name: 'Butter Croissant', price: '£3.50' },
          { name: 'Pain au Chocolat', price: '£4.50' },
          { name: 'Almond Croissant', price: '£4.50' },
          { name: 'Cookie', price: '£3.00' },
        ],
      },
    ],
  },
];

/* ─────────── COMPONENT ─────────── */

function MenuDivider() {
  return (
    <div className="menu-divider">
      <svg width="260" height="24" viewBox="0 0 260 24" fill="none">
        <path
          d="M0 12 Q32 3 65 12 Q97 21 130 12 Q162 3 195 12 Q227 21 260 12"
          stroke="#EDE8D5"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default function MenuPage() {
  const [addonsOpen, setAddonsOpen] = useState(false);

  return (
    <div className="menu-page">
      {/* HEADER */}
      <header className="menu-header">
        <h1 className="menu-brand">
          euforyc <span>sips</span>
        </h1>
        <p className="menu-tagline">Ceremonial matcha · Specialty coffee · Wellness blends</p>
        <div className="menu-subtitle">
          <span className="dot" />
          in-store menu
          <span className="dot" />
        </div>
      </header>

      {/* ADDONS LEGEND — collapsible, closed by default */}
      <div className={`addons-legend ${addonsOpen ? 'addons-open' : ''}`}>
        <button
          type="button"
          className="addons-legend-toggle"
          onClick={() => setAddonsOpen(!addonsOpen)}
          aria-expanded={addonsOpen}
        >
          <span>add-ons &amp; extras</span>
          <svg
            className={`addons-chevron ${addonsOpen ? 'addons-chevron-open' : ''}`}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path d="M5 8 L10 13 L15 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className={`addons-legend-body ${addonsOpen ? 'addons-body-open' : ''}`}>
          <div className="addons-legend-grid">
            <p className="addons-legend-category">Milk Upgrades</p>
            <div className="addons-legend-item">
              <span className="al-name">Oat Milk</span>
              <span className="al-price">+£0.60</span>
            </div>
            <div className="addons-legend-item">
              <span className="al-name">Almond Milk</span>
              <span className="al-price">+£0.60</span>
            </div>
            <div className="addons-legend-item">
              <span className="al-name">Coconut Milk</span>
              <span className="al-price">+£0.60</span>
            </div>

            <p className="addons-legend-category">Cold Foam</p>
            <div className="addons-legend-item">
              <span className="al-name">Plain Cold Foam</span>
              <span className="al-price">+£0.60</span>
            </div>
            <div className="addons-legend-item">
              <span className="al-name">Vanilla Cold Foam</span>
              <span className="al-price">+£1.20</span>
            </div>
            <div className="addons-legend-item">
              <span className="al-name">White Chocolate Cold Foam</span>
              <span className="al-price">+£1.20</span>
            </div>
            <div className="addons-legend-item">
              <span className="al-name">Banana Cold Foam</span>
              <span className="al-price">+£1.20</span>
            </div>
            <div className="addons-legend-item">
              <span className="al-name">Strawberry Cold Foam</span>
              <span className="al-price">+£1.20</span>
            </div>

            <p className="addons-legend-category">Coffee Syrups</p>
            <div className="addons-legend-item">
              <span className="al-name">Vanilla / Caramel / Hazelnut / Coconut</span>
              <span className="al-price">+£0.60</span>
            </div>
            <div className="addons-legend-item">
              <span className="al-name">Pistachio Sauce / Honey</span>
              <span className="al-price">+£0.60</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTIONS */}
      {menu.map((section, si) => (
        <div key={si}>
          <section className="menu-section">
            <p className="section-number">{section.number}</p>
            <h2 className="menu-section-title">{section.title}</h2>

            {section.categories.map((cat, ci) => (
              <div key={ci} className="menu-category">
                <h3 className="menu-category-title">{cat.title}</h3>
                {cat.items.map((item, ii) => (
                  <div key={ii} className="menu-item">
                    <div className="menu-item-header">
                      <span className="menu-item-name">{item.name}</span>
                      <span className="menu-item-dots" />
                      <span className="menu-item-price">{item.price}</span>
                    </div>
                    {item.addons && (
                      <div className="menu-item-addons">
                        <span className="addon-label">add-ons: </span>
                        <span className="addon-list">{item.addons}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </section>

          {si < menu.length - 1 && <MenuDivider />}
        </div>
      ))}

      {/* FOOTER */}
      <footer className="menu-footer">
        <p className="menu-footer-brand">
          euforyc <span>sips</span>
        </p>
        <address className="menu-footer-address">
          7-8 Holmstall Parade, Edgware, England, HA8 5HX
          <br />
          euforyc.co.uk/sips
        </address>
        <p className="menu-footer-note">
          All prices in GBP. Allergen info available on request.
        </p>
      </footer>
    </div>
  );
}
