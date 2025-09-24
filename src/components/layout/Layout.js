import Head from "next/head"
import Header from "./Header"
import Footer from "./Footer"

export default function Layout({ children, title = "UniVibe" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Nền tảng sinh viên UniVibe" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}
