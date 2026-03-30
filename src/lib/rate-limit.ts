/**
 * Simple in-memory rate limiter.
 * Tracks requests per IP using a sliding window.
 * Good enough for a low-traffic small business site.
 */

interface Window {
  count: number;
  resetAt: number;
}

const store = new Map<string, Window>();

export interface RateLimitOptions {
  /** Max requests allowed in the window */
  limit: number;
  /** Window duration in milliseconds */
  windowMs: number;
}

/**
 * Returns true if the request should be blocked (rate limit exceeded).
 * Pass the caller's IP as `key`.
 */
export function isRateLimited(key: string, options: RateLimitOptions): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + options.windowMs });
    return false;
  }

  entry.count += 1;

  if (entry.count > options.limit) {
    return true;
  }

  return false;
}

/** Extract the best available IP from a Next.js request */
export function getClientIp(request: Request): string {
  const headers = new Headers((request as Request).headers);
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headers.get("x-real-ip") ??
    "unknown"
  );
}
