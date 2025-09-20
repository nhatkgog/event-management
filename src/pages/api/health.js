export default function handler(req, res) {
  const now = new Date().toISOString();
  res.status(200).json({ ok: true, name: process.env.APP_NAME || 'Club Management', now });
}
