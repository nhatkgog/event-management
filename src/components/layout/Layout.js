import Head from "next/head"
import Header from "./Header"
import Footer from "./Footer"
import { useDbUser } from "@/contexts/UserContext";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import {fetchWithInternalAccess} from "@/utils/internalAccess";

export default function Layout({ children, title = "UniVibe" }) {
  const { isSignedIn } = useAuth();
  const { setDbUser } = useDbUser();

  useEffect(() => {
    // We only want to sync the user if they are logged in.
      if (isSignedIn) {
          // Use an Immediately Invoked Function Expression (IIFE) to run the async logic.
          (async () => {
              try {
                  const response = await fetchWithInternalAccess('/api/auth/syncUser', 'POST');

                  if (response.ok) {
                      const data = await response.json();
                      // On success, place the user's DB profile into the context
                      setDbUser(data.data);
                      console.log('User profile synced and set in context.');
                  } else {
                      console.error('Failed to sync user:', response.status);
                      setDbUser(null); // Clear profile on failure
                  }

              } catch (error) {
                  console.error('An error occurred while syncing the user:', error);
                  setDbUser(null); // Clear profile on error
              }
          })(); // The extra parentheses here immediately call the function.
      } else {
          // If the user signs out, clear their profile from the context
          setDbUser(null);
      }
  }, [isSignedIn, setDbUser]); // The dependency array ensures this runs only when the sign-in state changes.

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Nền tảng sinh viên UniVibe" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}
