import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { GlobalProvider } from '../global/GlobalContext';
import React, { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import GlobalContext from '../global/GlobalContext';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <GlobalProvider>
      <SessionProvider session={session}>
        <UserEffect />
        <Component {...pageProps} />
      </SessionProvider>
    </GlobalProvider>
  );
}

const UserEffect = () => {
  const {  } = React.useContext(GlobalContext);
  const { data: session } = useSession();

  useEffect(() => {
    const root = document.documentElement;
    if (session && session.user) {
      root.style.setProperty(
        "--Bg",
        session.user.display_mode === 1 ? "#272727" : "#e3e3e3"
      );
      root.style.setProperty(
        "--font-color",
        session.user.display_mode === 1 ? "#fff" : "#000"
      );
      root.style.setProperty(
        "--reversed-background-color",
        session.user.display_mode === 1 ? "#000" : "#f9f9f9"
      );
    }
  }, [session?.user.display_mode, session]);

  return null;
};

export default MyApp;
