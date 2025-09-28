import {internalAccess} from "@/utils/internalAccess";

async function handler(req, res) {

    // const { getAuth } = await import("@clerk/nextjs/server");
    const { userId } = req.query;

    // const { userId } = getAuth(req);

    // Make sure we have a userId
    if (!userId) {
        return res.status(400).json({ error: "Missing userId parameter" });
    }

    try {
        // Use a secret from your environment, never hard-code it
        const CLERK_SECRET = process.env.CLERK_SECRET_KEY;

        const clerkRes = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${CLERK_SECRET}`,
                "Content-Type": "application/json"
            }
        });

        if (!clerkRes.ok) {
            throw new Error(`Clerk responded with ${clerkRes.status}`);
        }

        const user = await clerkRes.json();
        return res.status(200).json(user);

    } catch (err) {
        console.error("Error fetching user:", err);
        return res.status(500).json({ error: err.message });
    }
}

export default internalAccess(handler);