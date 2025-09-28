import { getAuth } from '@clerk/nextjs/server';
import dbConnect, { User, Role } from '../../../lib/db';
import {fetchWithInternalAccess, internalAccess} from "@/utils/internalAccess";

// This API endpoint is responsible for syncing a Clerk user to the local database.
// It should be called by the frontend immediately after a user logs in.
async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { userId, isAuthenticated} = getAuth(req);

    // If the user is not authenticated, deny access.
    if (!userId || !isAuthenticated) {
      return res.status(401).json({ success: false, message: `Unauthorized` });
    }

    let user = await fetchWithInternalAccess("/api/user/userApi?clerkUserId=" + userId);

    // If the user exists, we're done. Return their profile.
    if (user.success === true && user.data.length > 0) {
      return res.status(200).json({ success: true, message: 'User already exists', data: user.data[0].roleId.name });
    }

    // --- If the user does NOT exist, create them --- 

    // 1. Find the default role for new users.
    const defaultRole = await fetchWithInternalAccess(`/api/role/roleApi?name=member`);
    if (defaultRole.success === false) {
      console.error("Default role 'member' not found. Please seed your database.");
      return res.status(500).json({ success: false, message: "Server configuration error: Default role not found." });
    }

    const response = await fetchWithInternalAccess(`/api/clerk?userId=${userId}`);

    // 2. Create the new user document.
    const newUser = {
      clerkUserId: userId,
      email: response.email_addresses[0].email_address,
      fullName: `${response.first_name || 'first'} ${response.last_name || 'last'}`.trim(),
      roleId: defaultRole.data[0]._id,
      isActive: true,
    };

    const created = await fetchWithInternalAccess("/api/user/userApi", 'POST', newUser);

    if (created.success === false) {
        return res.status(500).json({ success: false, message: 'An internal server create error occurred.' });
    }

    console.log(`Successfully created new user in DB with Clerk ID: ${userId}`);
    return res.status(201).json({ success: true, message: 'User created successfully', data: created.data.roleId.name });

  } catch (error) {
    console.error('Error in syncUser API:', error);
    return res.status(500).json({ success: false, message: 'An internal server error occurred.' });
  }
}

export default internalAccess(handler);