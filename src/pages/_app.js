import "../styles/globals.css"
import { UserProvider } from "@/contexts/UserContext";
import { ClerkProvider } from '@clerk/nextjs';

function App({ Component, pageProps}) {

  return (
    <ClerkProvider {...pageProps}>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
    </ClerkProvider>
  );
}

export default App;