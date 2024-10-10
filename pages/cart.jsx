import Nav from '../components/Nav';
import Head from 'next/head';
import Footer from '../components/Footer';
import React, { use } from 'react';
import styles from '../styles/Cart.module.css';
import GlobalContext from '../global/GlobalContext';
import ProductCart from '../components/ProductCart';
import { useRouter } from 'next/router';
const Cart = () => {
  const router = useRouter();
  const [totals, setTotals] = React.useState({
    subtotal: 0.00,
    tax: 21.00,
    total: 0.00,
  });
  const { cart, products, setCart } = React.useContext(GlobalContext);

  const [disabled, setDisabled] = React.useState(true);

  React.useEffect(() => {
    const subtotal = cart.reduce((acc, subCart) => acc + subCart.price, 0);
    setTotals((prevTotals) => ({
      ...prevTotals,
      subtotal,
    }));
  }, [cart]);

  React.useEffect(() => {
    const calculateTotal = (tax, subtotal) => {
      return parseFloat((subtotal + (subtotal * tax / 100)).toFixed(2));
    };

    const newTotal = calculateTotal(totals.tax, totals.subtotal);
    setTotals((prevTotals) => ({
      ...prevTotals,
      total: newTotal.toFixed(2),
    }));

    setDisabled(newTotal === 0);
  }, [totals.subtotal, totals.tax, cart]);

  React.useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch('/api/cart', {
        method: 'GET',
      });
  
      const data = await response.json();
  
      if (!Array.isArray(data.cart)) {
        console.error("Cart data is not an array:", data.cart);
        return;
      }
  
      const foundProducts = [];
  
      data.cart.forEach((cartItem) => {
        const productIds = cartItem.product_id.split(',');
  
        productIds.forEach((id) => {
          const product = getProductById(parseInt(id.trim()));
          if (product) {
            foundProducts.push(product);
          }
        });
      });
  
      setCart(foundProducts);
    };
  
    fetchCart();
  }, []);
  
  
  const handleContinue = () => {
    if (totals.total !== 0) {
      router.push('/cart/checkout')
    }
  };

  const getProductById = (productId) => {
    return products.find(product => product.id === productId) || null;
  };
  return (
    <>
      <Head>
        <title>{'Something | Cart'}</title>
      </Head>
      <Nav />
      <main className={styles.main}>
        <h2 className={styles.title}>Shopping Cart</h2>
        <div className={styles.CartMain}>
          {cart?.map((item, index) => (
            <ProductCart key={index} item={item} />
          ))}
        </div>
      </main>
      <aside className={styles.Aside}>
        <h2>Summary</h2>
        <div>
          <ul>
            <li>Subtotal: ${totals.subtotal.toFixed(2)}</li>
            <li>Tax: {totals.tax}%</li>
          </ul>
        </div>
        <div>
          {cart?.map((item, subIndex) => (
            <div key={subIndex}>
              <label>1 - {item.name}</label>
            </div>
          ))}
        </div>
        <h3>Total: ${totals.total}</h3>
        <button onClick={handleContinue} disabled={disabled}>Continue</button>
      </aside>
      <Footer />
    </>
  );
};

export default Cart;
