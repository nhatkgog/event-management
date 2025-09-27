export async function saveImage({ file, filename, access = 'public', req } = {}) {
    // Client branch (browser)
    if (typeof window !== 'undefined') {
        if (!file) throw new Error('Client: file is required');
        const safeFilename = filename ?? `${Date.now()}_${String(file.name).replace(/\s+/g, '_')}`;
        const resp = await fetch(`/api/upload?filename=${encodeURIComponent(safeFilename)}`, {
            method: 'POST',
            body: file,
            credentials: 'same-origin',
        });

        const text = await resp.text();
        if (!resp.ok) {
            throw new Error(`Upload failed: ${resp.status} - ${text}`);
        }

        try {
            return JSON.parse(text);
        } catch (err) {
            throw new Error(`Invalid JSON from server: ${text}`);
        }
    }

    // Server branch (Node)
    // dynamic import so server-only module is never bundled to client
    const mod = await import('@vercel/blob');
    const put = mod.put;
    if (!put) throw new Error('Server: @vercel/blob.put not available');

    const safeFilename = filename ?? `${Date.now()}_upload`;
    // If an IncomingMessage (Pages API) or similar is provided, pass it directly
    if (req) {
        // req is the raw request stream for Pages API routes
        const blob = await put(safeFilename, req, { access });
        return blob;
    }

    // If the caller passed a Buffer
    if (typeof Buffer !== 'undefined' && Buffer.isBuffer(file)) {
        const blob = await put(safeFilename, file, { access });
        return blob;
    }

    // If the caller passed a readable stream (Node)
    if (file && typeof file.pipe === 'function') {
        const blob = await put(safeFilename, file, { access });
        return blob;
    }

    throw new Error('Server: provide either req (IncomingMessage), a Buffer, or a readable stream');
}