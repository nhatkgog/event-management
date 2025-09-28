import LRUCache from 'lru-cache';

/**
 * @param {Object} options
 * @param {number} options.interval   Milliseconds for rate-limit window (e.g. 60000)
 * @param {number} options.max       Max requests per window per key
 * @param {number} [options.uniqueTokenPerInterval]  Max distinct IPs tracked
 */
export default function rateLimit({ interval, max, uniqueTokenPerInterval }) {
    const tokenCache = new LRUCache({
        max: uniqueTokenPerInterval || 500,
        ttl: interval,
    });

    return {
        /**
         * Check and update the count for this key.
         * @param {string} key  Unique identifier, e.g. IP address
         * @throws Error if rate limit is exceeded
         */
        check: (key) =>
            new Promise((resolve, reject) => {
                const entry = tokenCache.get(key) || { count: 0 };
                if (entry.count >= max) {
                    // optionally set Retry-After header in your handler
                    return reject(new Error('Rate limit exceeded'));
                }
                entry.count += 1;
                tokenCache.set(key, entry);
                resolve();
            }),
    };
}

export function withRateLimit({ interval = 60_000, max = 10 } = {}) {
    // One limiter instance per wrapper
    const limiter = rateLimit({ interval, max });

    return (handler) =>
        async function rateLimitedHandler(req, res) {
            // Check if the application is running in the development environment
            if (process.env.NODE_ENV === 'development') {
                // In development, simply execute the original handler and return
                return handler(req, res);
            }

            // identify client IP
            const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

            try {
                await limiter.check(ip);
            } catch (err) {
                // too many requests: 429 + Retry-After
                res.setHeader('Retry-After', String(Math.ceil(interval / 1000)));
                return res.status(429).json({ error: err.message });
            }

            // pass through to your real handler
            return handler(req, res);
        };
}