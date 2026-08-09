import { MOMENCE_PRICING } from '@/lib/momence-pricing';

const OPENAI_PIXEL_ID = 'NNt77kxy126BaNaNgFbYjR';
const OPENAI_PIXEL_SDK = 'https://bzrcdn.openai.com/sdk/oaiq.min.js';

type OpenAIQueue = ((...args: unknown[]) => void) & { q?: unknown[][] };

declare global {
  interface Window {
    oaiq?: OpenAIQueue;
  }
}

function readParam(params: URLSearchParams, keys: string[]): string {
  for (const key of keys) {
    const value = params.get(key);
    if (value?.trim()) return value.trim();
  }
  return '';
}

function hasOpenAIAttribution(params: URLSearchParams): boolean {
  if (readParam(params, ['oppref'])) return true;

  return document.cookie.split(';').some((cookie) =>
    cookie.trim().startsWith('__oppref='),
  );
}

function initializeOpenAIPixel(): void {
  if (window.oaiq) return;

  const queue: OpenAIQueue = (...args: unknown[]) => {
    queue.q?.push(args);
  };
  queue.q = [];
  window.oaiq = queue;

  const script = document.createElement('script');
  script.async = true;
  script.src = OPENAI_PIXEL_SDK;
  document.head.insertBefore(script, document.head.firstChild);

  queue('init', {
    pixelId: OPENAI_PIXEL_ID,
    debug: true,
  });
}

function measureOpenAIPurchase(url: URL): void {
  if (url.pathname !== '/thank-you' || !hasOpenAIAttribution(url.searchParams)) {
    return;
  }

  const orderId = readParam(url.searchParams, [
    'order_id',
    'orderId',
    'booking_id',
    'bookingId',
    'transaction_id',
  ]);
  const momenceId = readParam(url.searchParams, [
    'membershipId',
    'productId',
    'packageId',
    'classId',
    'eventId',
    'id',
  ]);
  const explicitEventId = readParam(url.searchParams, ['event_id']);
  const catalogItem = MOMENCE_PRICING[momenceId] ?? null;
  const rawAmount = readParam(url.searchParams, ['value', 'amount', 'price', 'total']);
  const parsedAmount = Number.parseFloat(rawAmount.replace(/[^0-9.]/g, ''));
  const amount = Number.isFinite(parsedAmount) && parsedAmount > 0
    ? Math.round(parsedAmount * 100)
    : catalogItem
      ? Math.round(catalogItem.value * 100)
      : 0;
  const currency = (
    readParam(url.searchParams, ['currency']) || catalogItem?.currency || 'GBP'
  ).toUpperCase();
  const serviceName = readParam(url.searchParams, [
    'service',
    'service_name',
    'item',
    'product',
    'name',
    'content_name',
  ]) || catalogItem?.contentName || '';
  const contentType = readParam(url.searchParams, [
    'type',
    'purchase_type',
    'category',
    'content_type',
  ]) || catalogItem?.contentType || '';

  const sourceId = orderId || momenceId;
  const storageKey = `openai_order_created:${
    explicitEventId || orderId || url.search || url.pathname
  }`;

  try {
    if (sessionStorage.getItem(storageKey)) return;
  } catch {}

  let eventId = explicitEventId || orderId;
  if (!eventId) eventId = window.crypto?.randomUUID?.();
  if (!eventId) {
    eventId = `order_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  }
  eventId = eventId.replace(/[^A-Za-z0-9_-]/g, '').slice(0, 128);

  const eventData: {
    type: 'contents';
    amount?: number;
    currency?: string;
    contents?: Array<{
      id?: string;
      name?: string;
      content_type?: string;
      quantity: number;
    }>;
  } = { type: 'contents' };

  if (amount > 0) {
    eventData.amount = amount;
    eventData.currency = currency;
  }

  if (sourceId || serviceName || contentType) {
    eventData.contents = [{
      ...(sourceId ? { id: sourceId.slice(0, 128) } : {}),
      ...(serviceName ? { name: serviceName.slice(0, 256) } : {}),
      ...(contentType ? { content_type: contentType.slice(0, 128) } : {}),
      quantity: 1,
    }];
  }

  window.oaiq?.('measure', 'order_created', eventData, { event_id: eventId });

  try {
    sessionStorage.setItem(storageKey, eventId);
  } catch {}
}

initializeOpenAIPixel();
measureOpenAIPurchase(new URL(window.location.href));

export function onRouterTransitionStart(url: string): void {
  measureOpenAIPurchase(new URL(url, window.location.origin));
}
