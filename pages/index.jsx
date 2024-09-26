import Head from "next/head";
import styles from "../styles/Home.module.css";
import Product from "../components/Product";
import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import GlobalContext from '../global/GlobalContext';

const Home = () => {
  const { products, setProducts } = React.useContext(GlobalContext);

  return (
    <>
      <Head>
        <title>Something</title>
        <meta name="description" content="Something, who knows?" />
      </Head>
      <Nav />
      <header className={styles.header}>
        <h1>{'Something'}</h1>
        <h2>{'Who knows?'}</h2>
      </header>
      <main className={styles.main}>
        <h2 className={styles.keyboards}>{'Keyboards'}</h2>
        <div className={styles.slider}>
          {products.map((product, index) => (
            <Product key={product.id || index} product={product} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
