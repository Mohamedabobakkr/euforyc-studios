/* ── Euforyc Sips — Telegram Order Notifications ── */

const TELEGRAM_API = 'https://api.telegram.org';

interface OrderNotification {
  orderId: string;
  customerName: string;
  items: { name: string; quantity: number; variationName?: string }[];
  pickupTime: string;   // ISO string
  totalPence: number;
  note?: string;
}

/**
 * Sends a formatted Telegram message for a new Sips order.
 * Fails silently (logs error) — we never want notification failures
 * to break the webhook acknowledgement to Square.
 */
export async function notifyNewOrder(order: OrderNotification): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn('[Notify] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set — skipping notification');
    return;
  }

  const message = formatOrderMessage(order);

  try {
    const res = await fetch(`${TELEGRAM_API}/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`[Notify] Telegram API error (${res.status}):`, body);
    }
  } catch (err) {
    console.error('[Notify] Failed to send Telegram notification:', err);
  }
}

function formatOrderMessage(order: OrderNotification): string {
  const totalGBP = (order.totalPence / 100).toFixed(2);

  // Format pickup time in UK timezone
  const pickup = new Date(order.pickupTime);
  const pickupFormatted = pickup.toLocaleString('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  // Format items list
  const itemLines = order.items
    .map((item) => {
      const variation = item.variationName ? ` (${item.variationName})` : '';
      return `  • ${item.name}${variation} × ${item.quantity}`;
    })
    .join('\n');

  const noteSection = order.note
    ? `\n📝 <b>Note:</b> ${escapeHtml(order.note)}`
    : '';

  return [
    `☕ <b>New Sips Order!</b>`,
    ``,
    `🧾 <b>Order:</b> <code>${order.orderId.slice(-8)}</code>`,
    `👤 <b>Customer:</b> ${escapeHtml(order.customerName)}`,
    ``,
    `📦 <b>Items:</b>`,
    itemLines,
    ``,
    `💰 <b>Total:</b> £${totalGBP}`,
    `⏰ <b>Pickup:</b> ${pickupFormatted}`,
    noteSection,
  ]
    .filter(Boolean)
    .join('\n');
}

/** Escape HTML special characters for Telegram HTML parse mode */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
