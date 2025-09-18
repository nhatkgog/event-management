import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import "../styles.css";

export default function App({ Component, pageProps }) {
  return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <NavBar />
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
  );
}
