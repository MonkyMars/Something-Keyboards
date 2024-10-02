import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import GlobalContext from '../../global/GlobalContext';
import styles from '../../styles/ProductPage.module.css';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Head from 'next/head';

const ProductPage = ({ params }) => {
  const { products, setCart, user } = useContext(GlobalContext);
  const [filteredProduct, setFilteredProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(0);

  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--Bg', user.display_mode === 1 ? '#272727' : '#e3e3e3');
    root.style.setProperty('--font-color', user.display_mode === 1 ? '#fff' : '#000');
    root.style.setProperty('--reversed-background-color', user.display_mode === 1 ? '#000' : '#f9f9f9');
  }, [user.display_mode]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTime(1);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);
  
  useEffect(() => {
    if (products && products.length > 0 && time === 1) {
      const flatProduct = products.flat();
      const foundProduct = flatProduct.find((item) => item.name.toLowerCase().includes(params.product));
      setFilteredProduct(foundProduct);
      setLoading(false);
    }
  }, [products, time, params]);

  if (loading) return <div>Loading...</div>;
  if (!filteredProduct) return <div>Product not found</div>;


  const addToCart = (id) => {
    const flatProduct = products.flat();
    const productToAdd = flatProduct.find(product => product.id === id);
  
    if (productToAdd) {
      setCart(prevCart => [...prevCart, productToAdd]);
      console.log('added', productToAdd)
    } else {
      console.log("Product not found");
    }
  }

  return (
    <>
      <Nav />
      <Head>
        <title>Something | {filteredProduct.name.slice(9)}</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.product}>
          <h1>{filteredProduct.name}</h1>
          <div>
            <Image
              src={filteredProduct.image}
              alt={filteredProduct.name}
              width={500}
              height={500}
              priority
            />
            <p>{filteredProduct.description}</p>
          </div>
        </div>
        <aside className={styles.aside}>
          <h2>{filteredProduct.name.slice(9)}</h2>
          <p>${filteredProduct.price}</p>
          <button onClick={() => addToCart(filteredProduct.id)}>Add to cart</button>
        </aside>
      </main>
      <Footer />
    </>
  );
};

export async function getStaticPaths() {
  const products = ['something nebula', 'something glow'];
  const paths = products.map((product) => ({
    params: { product: product.toLowerCase() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: { params },
  };
}

export default ProductPage;
