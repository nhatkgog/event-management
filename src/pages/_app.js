import "../styles/globals.css"
import { ClerkProvider } from '@clerk/nextjs';
import Layout from "../components/layout/Layout"
import AdminLayout from "@/components/AdminLayout";

function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => {
    const role = pageProps?.role;
    const SelectedLayout = role === "admin" ? AdminLayout : Layout;
    return <SelectedLayout>{page}</SelectedLayout>;
  });

  return (
    <ClerkProvider {...pageProps}>
      {getLayout(<Component {...pageProps} />)}
    </ClerkProvider>
  );
}


export async function getServerSideProps(ctx) {
    // server-side Clerk auth
    const { getCurrentUserPrivateMetadata } = await import("../lib/auth-utils");
    const userData = getCurrentUserPrivateMetadata(ctx.req);
    const role = userData.role;
    return { props: { role } };
}

export default App;