import Nav from "../components/Nav";
import Footer from "../components/Footer";
import styles from "../styles/Support.module.css";
import GlobalContext from ".//../global/GlobalContext";
import Image from "next/image";
import React from "react";
import { useSession } from "next-auth/react";

const Support = () => {
  const { user } = React.useContext(GlobalContext);
  const [page, setPage] = React.useState(0);
  const { data: session, status } = useSession();
  const support_options = [
    {
      name: "Site Bugs",
      icon:
        session?.user.display_mode === 0
          ? "/icons/bugreport.png"
          : "/icons/lightmode/bugreport_white.png",
    },
    {
      name: "Products",
      icon:
        session?.user.display_mode === 0
          ? "/icons/inventory.png"
          : "/icons/lightmode/inventory_white.png",
    },
  ];

  return (
    <>
      <Nav />
      <main className={styles.main}>
        <aside className={styles.supportOptions}>
          <h2>{"Support"}</h2>
          <div>
            {support_options?.map((option, index) => (
              <label
                key={index}
                onClick={() => setPage(index)}
                style={{
                  outline:
                    page === index ? "2.5px solid var(--button-color)" : "none",
                }}
              >
                <Image
                  src={option.icon}
                  alt={option.name}
                  width={25}
                  height={25}
                />{" "}
                {option.name}
              </label>
            ))}
          </div>
        </aside>
        <section className={styles.section}>
          <h2>{support_options[page].name}</h2>
          {page === 0 && <>
            <button>Report Error</button>Report Visual Bug<button></button><button></button>
          </>}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Support;
