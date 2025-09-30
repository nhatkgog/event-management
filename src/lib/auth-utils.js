import {clerkClient, getAuth} from "@clerk/nextjs/server"
import {fetchWithInternalAccess} from "@/utils/internalAccess";

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

export function forRoleOnly(allowedRoles, fn) {
    return async (context) => {
        // 1. Authenticate request
        const { userId } = getAuth(context.req);
        if (!userId) {
            return { redirect: { destination: "/login", permanent: false } };
        }

        // 2. Fetch user from database
        const userRes = await fetchWithInternalAccess('/api/user/userApi?clerkUserId=' + userId, 'GET')

        const user = userRes.success ? userRes.data : null;

        if (!user) {
            console.error('User not found in database');
            return {
                notFound: true
            };
        }

        // 3. Check if role is allowed
        const roles = Array.isArray(allowedRoles)
            ? allowedRoles
            : [allowedRoles];

        if (!user || !roles.includes(user[0].roleId.name)) {
            console.error('Unauthorized access');
            return { notFound: true };
        }

        // 4. If authorized, call the original function
        return fn ? await fn(context) : { props: {} };
    };
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
