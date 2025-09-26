import { getAuth } from "@clerk/nextjs/server"

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
