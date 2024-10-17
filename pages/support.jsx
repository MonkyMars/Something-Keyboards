import Nav from "../components/Nav";
import Footer from "../components/Footer";
import styles from "../styles/Support.module.css";
import Image from "next/image";
import React, { useState, useCallback } from "react";
import { useSession } from "next-auth/react";

const Support = () => {
  const [page, setPage] = useState(0);
  const { data: session, status } = useSession();

  const support_options = [
    {
      name: "Site Bugs",
      icon:
        session?.user?.display_mode === 0
          ? "/icons/bugreport.png"
          : "/icons/lightmode/bugreport_white.png",
    },
    {
      name: "Products",
      icon:
        session?.user?.display_mode === 0
          ? "/icons/inventory.png"
          : "/icons/lightmode/inventory_white.png",
    },
  ];

  const supportHandler = useCallback((buttonID) => {
    switch (buttonID) {
      case 1:
        reportError_siteBugs();
        break;
      case 2:
        reportVisual_siteBugs();
        break;
      case 3:
        reportServer_siteBugs();
        break;
      case 4:
        reportOther_siteBugs();
        break;
      case 5:
        reportMissing_products();
        break;
      case 6:
        reportWrong_products();
        break;
      case 7:
        reportDefects_products();
        break;
      case 8:
        reportOther_products();
        break;
      default:
        console.warn("Unknown buttonID \n", buttonID, ' does not exist');
    }
  }, []);

  const reportOther_siteBugs = () => {};
  const reportError_siteBugs = () => {};
  const reportVisual_siteBugs = () => {};
  const reportServer_siteBugs = () => {};
  const reportMissing_products = () => {};
  const reportWrong_products = () => {};
  const reportDefects_products = () => {};
  const reportOther_products = () => {};

  return (
    <>
      <Nav />
      <main className={styles.main}>
        <aside className={styles.supportOptions}>
          <h2>Support</h2>
          <div>
            {support_options.map((option, index) => (
              <label
                role="button"
                key={index}
                onClick={() => setPage(index)}
                style={{
                  outline:
                    page === index ? "2.5px solid var(--button-color)" : "none",
                }}
                className={styles.optionButton}
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
          {page === 0 ? (
            <>
              <p>
                {
                  "Report any error or issue you've encountered associated with the website. If you have multiple errors or issues to report, please report them one by one."
                }
              </p>
              <button onClick={() => supportHandler(1)}>Report Error</button>
              <button onClick={() => supportHandler(2)}>
                Report Visual Bug
              </button>
              <button onClick={() => supportHandler(3)}>
                Report Server Issue
              </button>
              <button onClick={() => supportHandler(4)}>Other</button>
            </>
          ) : (
            <>
              <p>
                {
                  "Report any issue you've encountered associated with the products. If you have multiple issues to report, please report them one by one."
                }
              </p>
              <button onClick={() => supportHandler(5)}>
                Report Missing Information
              </button>
              <button onClick={() => supportHandler(6)}>
                Report Wrong Information
              </button>
              <button onClick={() => supportHandler(7)}>
                Report Products Defects
              </button>
              <button onClick={() => supportHandler(8)}>Other</button>
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Support;
