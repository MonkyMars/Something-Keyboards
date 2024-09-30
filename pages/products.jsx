import React from "react";
import Nav from '/components/Nav';
import Footer from '/components/Footer';
import Head from 'next/head';
import styles from '../styles/components/Product.module.css';
import Product from "../components/Product";
import GlobalContext from '../global/GlobalContext';
import { useRouter } from 'next/router';

const Products = () => {
  const { products } = React.useContext(GlobalContext);
  const [search, setSearch] = React.useState('');
  const [filteredProducts, setFilteredProducts] = React.useState(products);
  const [filters, setFilters] = React.useState({
    priceRange: { min: 59.99, max: 199.99, value: 199.99 },
    name: { value: search },
    color: { value: '' },
    size: { value: '' },
  });

  const router = useRouter();
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryValue = urlParams.get('query');

    if (queryValue) {
      setSearch(queryValue);
      setFilters((prevFilters) => ({
        ...prevFilters,
        name: { value: queryValue },
      }));
    }
  }, [router.query]);

  React.useEffect(() => {
    if (filters.name.value !== search) {
      const encodedSearch = encodeURIComponent(filters.name.value);
      router.push(`/products?query=${encodedSearch}`, undefined, { shallow: true });
      setSearch(filters.name.value);
    }
  }, [filters.name.value, router, search]);

  React.useEffect(() => {
    const flatProducts = products.flat();
    const filteredProduct = flatProducts.filter((product) => {
      const matchesName = product.name.toLowerCase().includes(filters.name.value.toLowerCase());
      const matchesPrice = product.price <= filters.priceRange.value;
      const matchesColor = filters.color.value ? product.color === filters.color.value : true;
      
      return matchesName && matchesPrice && matchesColor;
    });

    setFilteredProducts(filteredProduct);
  }, [search, filters, products]);

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
              onChange={(e) => setFilters(prev => ({ 
                ...prev, 
                priceRange: { ...prev.priceRange, value: e.target.value } 
              }))}
            />
            <label>{`<$${filters.priceRange.value}`}</label>
          </div>
          <select 
            value={filters.color.value} 
            onChange={(e) => setFilters(prev => ({...prev, color: {value: e.target.value}}))}
          >
            <option value="">Color</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="grey">Grey</option>
            <option value="black">Black</option>
          </select>
        </div>  
        <div className={styles.slider}>
  {filteredProducts && filteredProducts.length > 0 ? (
    filteredProducts.map((product, index) => (
      <Product key={product.id || index} product={product} />
    ))
  ) : (
    <h2 className={styles.error}>No products found</h2>
  )}
</div>

      </main>

      <Footer />
    </>
  );
};

export default Products;
