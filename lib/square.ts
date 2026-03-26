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

/**
 * Validates that a Square API path is safe (no traversal or injection).
 * Only allows paths starting with '/' followed by alphanumeric segments,
 * hyphens, underscores, and query strings.
 */
function validateSquarePath(path: string): void {
  // Must start with /
  if (!path.startsWith('/')) {
    throw new SquareApiError('Invalid API path', 400);
  }
  // Block path traversal attempts
  if (path.includes('..') || path.includes('//') || path.includes('\\')) {
    throw new SquareApiError('Invalid API path', 400);
  }
  // Only allow safe characters: alphanumeric, /, -, _, ., ?, =, &
  const safePath = path.split('?')[0]; // validate path portion only
  if (!/^\/[a-zA-Z0-9/_-]+$/.test(safePath)) {
    throw new SquareApiError('Invalid API path', 400);
  }
}

export async function squareFetch<T = unknown>(
  path: string,
  options: {
    method?: string;
    body?: unknown;
    idempotencyKey?: string;
  } = {},
): Promise<T> {
  // Validate path to prevent SSRF via path traversal
  validateSquarePath(path);

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
