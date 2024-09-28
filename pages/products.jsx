import React from "react";
import Nav from '/components/Nav';
import Footer from '/components/Footer';
import Head from 'next/head';
import styles from '../styles/components/Product.module.css';
import Product from "../components/Product";
import GlobalContext from '../global/GlobalContext';

const Products = () => {
  const { products, setProducts } = React.useContext(GlobalContext)
  const [filters, setFilters] = React.useState({
    priceRange: { min: 0, max: 160, value: 160 },
    name: { value: ''},
    color: { value: ''},
    size: { value: ''},
  })
  const [search, setSearch] = React.useState('')
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryValue = urlParams.get('query');
    setSearch(queryValue)
    if (queryValue) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        name: { ...prevFilters.name, value: queryValue },
      }));
    }
  }, [search]);
  return (
    <>
      <Head>
        <title>Something | Products</title>
      </Head>
      <Nav />

      <main className={styles.main}>
        <h2 className={styles.h2}>Something Products</h2>
        <div className={styles.filters}>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={filters.name.value} 
            onChange={(e) => setFilters(prev => ({ ...prev, name: { value: e.target.value } }))}
          />
          <div>
          <input 
            type="range" 
            min={filters.priceRange.min} 
            max={filters.priceRange.max}  
            value={filters.priceRange.value} 
            onChange={(e) => setFilters(prev => ({ ...prev, priceRange: { value: e.target.value, min: 0, max: 160 } }))}
          />
          <label>{`<$${filters.priceRange.value}`}</label>
          </div>
          <select value={filters.color.value} onChange={(e) => setFilters(prev => ({...prev, color: {value: e.target.value}}))}>
            <option value="">Color</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
          </select>
        </div>  
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

export default Products;
