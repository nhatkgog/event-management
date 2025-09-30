// pages/avatar-upload.js
'use client';
import { useRef, useState } from 'react';
import {saveImage} from "@/lib/saveImage";
import {withDevOnly} from "@/lib/devUtils";

export const getServerSideProps = withDevOnly(async (context) => {
    // your SSR logic here, e.g. fetch some test data
    return { props: { } };
});

export default function UploadPage() {
    const inputFileRef = useRef(null);
    const [blob, setBlob] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        const file = inputFileRef.current?.files?.[0];
        if (!file) return alert('Choose a file');

        try {
            setLoading(true);
            const result = await saveImage({ file }); // optional: { filename, access }
            setBlob(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ padding: 20 }}>
            <h1>Upload Your Avatar</h1>

            <form onSubmit={handleSubmit}>
                <input
                    name="file"
                    ref={inputFileRef}
                    type="file"
                    accept="image/jpeg, image/png, image/webp"
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
            </form>

            {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}

            {blob && (
                <div style={{ marginTop: 12 }}>
                    <div><strong>Blob URL</strong>: <a href={blob.url} target="_blank" rel="noreferrer">{blob.url}</a></div>
                    <div><strong>Name</strong>: {blob.name}</div>
                    <div><strong>Key</strong>: {blob.key}</div>
                    <div><strong>Size</strong>: {blob.size} bytes</div>
                    <div><strong>Type</strong>: {blob.mimeType}</div>
                    <div><strong>Image</strong>: <img src={blob.url}/></div>
                </div>
            )}
        </div>
    );
}
