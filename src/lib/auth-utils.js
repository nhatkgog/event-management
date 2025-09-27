import {clerkClient, getAuth} from "@clerk/nextjs/server"

// Server-side authentication utility for getServerSideProps
export function requireAuth(context) {
    const { userId } = getAuth(context.req)

    if (!userId) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        }
    }

    return { userId }
}
/**
 * Return privateMetadata for a given Clerk userId.
 * Throws if userId is missing or Clerk returns an error.
 */
export async function getUserPrivateMetadata(userId) {
    if (!userId) throw new Error("Missing userId");
    const user = await clerkClient.users.getUser(userId);
    return user.privateMetadata || {};
}

/**
 * Return privateMetadata for the currently authenticated user.
 * Expects a Next.js server request (pages/api req or app Router req).
 */
export async function getCurrentUserPrivateMetadata(req) {
    const { userId } = getAuth(req);
    if (!userId) throw new Error("Not authenticated");
    return getUserPrivateMetadata(userId);
}

export async function isRole(userId, roleName) {
    if (!userId) throw new Error("Missing userId");
    const user = await clerkClient.users.getUser(userId);
    return user.privateMetadata.role.toLowerCase() === roleName.toLowerCase();
}

// Example usage in a page:
// export async function getServerSideProps(context) {
//   const authResult = requireAuth(context)
//   if (authResult.redirect) {
//     return authResult
//   }
//
//   const { userId } = authResult
//
//   // Fetch user-specific data here
//   return {
//     props: {
//       userId,
//     },
//   }
// }
