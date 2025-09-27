import "../styles/globals.css"
import { AuthProvider } from "@/contexts/AuthContext"
import { ClerkProvider } from '@clerk/nextjs';
import Layout from "../components/layout/Layout"
import AdminLayout from "@/components/AdminLayout";

function App({ Component, pageProps, role }) {
    const SelectLayout = role === "admin" ? AdminLayout : Layout;
  return (
    // <AuthProvider>
    //   <Component {...pageProps} />
    // </AuthProvider>
      <ClerkProvider {...pageProps}>
        <SelectLayout>
          <Component {...pageProps} />
        </SelectLayout>
      </ClerkProvider>
  )
}

export async function getServerSideProps(ctx) {
    // server-side Clerk auth
    const { getCurrentUserPrivateMetadata } = await import("../lib/auth-utils");
    const userData = getCurrentUserPrivateMetadata(ctx.req);
    const role = userData.role;
    return { props: { role } };
}

export default App;