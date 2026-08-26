type Bucket = { count: number; resetAt: number };

const globalForRateLimit = globalThis as typeof globalThis & {
  adminRateLimit?: Map<string, Bucket>;
};

const buckets = globalForRateLimit.adminRateLimit ?? new Map<string, Bucket>();
globalForRateLimit.adminRateLimit = buckets;

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (bucket.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
