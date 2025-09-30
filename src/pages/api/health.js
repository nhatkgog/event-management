import {internalAccess} from "@/utils/internalAccess";

function handler(req, res) {
  const now = new Date().toISOString();
  res.status(200).json({ ok: true, name: process.env.APP_NAME || 'Event Management', now });
}

export default internalAccess(handler);