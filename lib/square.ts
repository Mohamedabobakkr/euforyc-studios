/* ── Euforyc Sips — Square API Client ── */

const SQUARE_BASE_URL = 'https://connect.squareup.com/v2';

export class SquareApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public errors?: unknown[],
  ) {
    super(message);
    this.name = 'SquareApiError';
  }
}

function getHeaders(idempotencyKey?: string): Record<string, string> {
  const token = process.env.SQUARE_ACCESS_TOKEN;
  if (!token) {
    throw new SquareApiError('SQUARE_ACCESS_TOKEN is not configured', 500);
  }

  const headers: Record<string, string> = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Square-Version': '2024-11-20',
  };

  if (idempotencyKey) {
    headers['Idempotency-Key'] = idempotencyKey;
  }

  return headers;
}

export async function squareFetch<T = unknown>(
  path: string,
  options: {
    method?: string;
    body?: unknown;
    idempotencyKey?: string;
  } = {},
): Promise<T> {
  const { method = 'GET', body, idempotencyKey } = options;

  const jsonBody = body ? JSON.stringify(body) : undefined;

  console.log(`[Square API] ${method} ${path}`);

  const res = await fetch(`${SQUARE_BASE_URL}${path}`, {
    method,
    headers: getHeaders(idempotencyKey),
    body: jsonBody,
  });

  const data = await res.json();

  if (!res.ok) {
    console.error(`[Square API] Error response:`, JSON.stringify(data, null, 2));
    const message = data.errors?.[0]?.detail || `Square API error (${res.status})`;
    throw new SquareApiError(message, res.status, data.errors);
  }

  return data as T;
}

export function getLocationId(): string {
  const id = process.env.SQUARE_LOCATION_ID;
  if (!id) {
    throw new SquareApiError('SQUARE_LOCATION_ID is not configured', 500);
  }
  return id;
}

export function newIdempotencyKey(): string {
  return crypto.randomUUID();
}
