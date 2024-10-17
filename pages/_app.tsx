import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { GlobalProvider } from '../global/GlobalContext';
import React, { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import GlobalContext from '../global/GlobalContext';
import { useRouter } from 'next/router';

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
  const { user, setUser } = React.useContext(GlobalContext);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const email = localStorage.getItem('email');
      if (email) {
        try {
          const response = await fetch(`/api/user?email=${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            console.log('Fetched user:', userData); // Log the fetched user data
          } else {
            console.error("Failed to fetch user:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUser();
  }, [setUser]);

  useEffect(() => {
    const root = document.documentElement;
    if (session && session?.user.display_mode) {
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
  }, [session]);

  return null;
};

export default MyApp;
