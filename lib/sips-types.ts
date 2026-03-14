/* ── Euforyc Sips — Shared Types ── */

// Square catalog → parsed menu

export interface MenuModifier {
  id: string;
  name: string;
  pricePence: number;  // 0 for free modifiers (e.g. "Remove Pineapple")
}

export interface MenuModifierGroup {
  id: string;
  name: string;           // e.g. "Remove Choices", "Add-ons", "Milk Choice"
  selectionType: 'SINGLE' | 'MULTIPLE';  // radio vs checkbox
  modifiers: MenuModifier[];
}

export interface MenuVariation {
  id: string;
  name: string;       // e.g. "Regular", "Large"
  pricePence: number;  // GBP pence — £4.50 = 450
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  categoryName: string;
  variations: MenuVariation[];
  modifierGroups: MenuModifierGroup[];
  imageUrl?: string;
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}

// Cart
export interface CartItem {
  menuItem: MenuItem;
  selectedVariation: MenuVariation;
  selectedModifiers: MenuModifier[];  // chosen modifiers for this cart entry
  quantity: number;
}

export type CartAction =
  | { type: 'ADD_ITEM'; menuItem: MenuItem; variation: MenuVariation; modifiers: MenuModifier[] }
  | { type: 'REMOVE_ITEM'; cartKey: string }
  | { type: 'UPDATE_QUANTITY'; cartKey: string; quantity: number }
  | { type: 'CLEAR' };

// Orders
export type FulfillmentState =
  | 'PROPOSED'    // New — just placed
  | 'RESERVED'    // Preparing
  | 'PREPARED'    // Ready for pickup
  | 'COMPLETED';  // Collected

export interface SipsOrderItem {
  name: string;
  quantity: number;
  variationName: string;
  pricePence: number;
}

export interface SipsOrder {
  id: string;
  fulfillmentUid: string;
  customerName: string;
  items: SipsOrderItem[];
  pickupTime: string;       // ISO string
  createdAt: string;        // ISO string
  totalPence: number;
  state: FulfillmentState;
  version: number;          // Square order version (for updates)
}

// API payloads
export interface CreateOrderPayload {
  items: {
    catalogObjectId: string;     // variation ID
    quantity: number;
    modifierIds: string[];       // selected modifier catalog IDs
  }[];
  customerName: string;
  pickupAt: string;              // ISO string
  note?: string;                 // customer note for barista
}

export interface UpdateOrderPayload {
  orderId: string;
  fulfillmentUid: string;
  newState: FulfillmentState;
  version: number;
}
