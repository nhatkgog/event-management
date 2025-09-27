// pages/api/upload.js
import {saveImage} from "@/lib/saveImage";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed');
    }

    try {
        const filename = req.query.filename;
        if (!filename) return res.status(400).json({ error: 'filename query param required' });

        const blob = await saveImage({ req, filename, access: 'public' });

        return res.status(200).json({
            url: blob.url,
            key: blob.key,
            size: blob.size,
            mimeType: blob.mimeType,
            name: filename,
        });
    } catch (err) {
        console.error('Upload error:', err);
        // return plain text or JSON so client can inspect the error body
        return res.status(500).json({ error: err?.message || 'Upload failed' });
    }
}
