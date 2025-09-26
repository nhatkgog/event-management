import "../styles/globals.css"
import { AuthProvider } from "@/contexts/AuthContext"
import { ClerkProvider } from '@clerk/nextjs';
import Layout from "../components/layout/Layout"

export default function App({ Component, pageProps }) {
  return (
    // <AuthProvider>
    //   <Component {...pageProps} />
    // </AuthProvider>
      <ClerkProvider {...pageProps}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ClerkProvider>
  )
}
