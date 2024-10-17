import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalProvider } from "../global/GlobalContext";
import React, { useEffect, useState } from "react";
import { SessionProvider, useSession } from "next-auth/react";

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
  const { data: session } = useSession();
  const [display, setDisplay] = useState(0);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      const result = await fetch(`/api/user?email=${session?.user.email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();

      data[0] && setDisplay(data[0].display_mode);
    };
    fetchUser();
    const root = document.documentElement;
    const displayMode = display;
    session ? (session.user.display_mode = display) : "";
    root.style.setProperty("--Bg", displayMode === 1 ? "#272727" : "#e3e3e3");
    root.style.setProperty("--font-color", displayMode === 1 ? "#fff" : "#000");
    root.style.setProperty(
      "--reversed-background-color",
      displayMode === 1 ? "#000" : "#f9f9f9"
    );
    setLoaded(true)
  }, [session, session?.user.display_mode, display, loaded]);
  return null;
};

export default MyApp;
