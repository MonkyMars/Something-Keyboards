import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { GlobalProvider } from '../global/GlobalContext';
import GlobalContext from '../global/GlobalContext';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <UserEffect />
      <Component {...pageProps} />
    </GlobalProvider>
  );
}

const UserEffect = () => {
  const { user, setUser } = React.useContext(GlobalContext);
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
            console.log('user', user)
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
    if (user && user.email) {
      localStorage.setItem('email', user.email);
      if(window.location.href == '/user/login') {
        router.push('/user/account')
      }
    }
  }, [user, router]);

  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(
      "--Bg",
      user.display_mode === 1 ? "#272727" : "#e3e3e3"
    );
    root.style.setProperty(
      "--font-color",
      user.display_mode === 1 ? "#fff" : "#000"
    );
    root.style.setProperty(
      "--reversed-background-color",
      user.display_mode === 1 ? "#000" : "#f9f9f9"
    );
  }, [user.display_mode]);

  return null;
};

export default MyApp;
