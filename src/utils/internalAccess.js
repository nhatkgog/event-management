export const internalAccess = (handler) => async (req, res) => {
    // Check if the application is running in the development environment
    if (process.env.NODE_ENV === 'development') {
        // In development, simply execute the original handler and return
        return handler(req, res);
    }

    // --- Production/Staging Check Logic ---
    const internalSecret = req.headers['x-internal-secret'];
    const serverApiKey = process.env.SERVER_API_KEY;

    // 1. Ensure the secret key is configured
    if (!serverApiKey) {
        console.error("SERVER_API_KEY is not defined in environment variables. Access is blocked.");
        // Block access if the key is missing in production/staging
        return res.status(500).json({ error: 'Server configuration error.' });
    }

    // 2. Validate the incoming secret against the server's secret
    if (internalSecret !== serverApiKey) {
        // Block the request if the secret is missing or incorrect
        return res.status(403).json({ error: 'Access Denied: Internal use only.' });
    }

    // 3. If validation passes (in non-dev environment), execute the original handler
    return handler(req, res);
};

export const fetchWithInternalAccess = async (url) => {
    const secretKey = process.env.SERVER_API_KEY;
    const baseUrl = process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'YOUR_PROD_URL';

    return (await fetch(`${baseUrl}${url}`, {
        method: 'GET',
        headers: {
            'X-Internal-Secret': secretKey, // <-- Essential secret included on the server
            'Content-Type': 'application/json',
        },
    })).json();
}