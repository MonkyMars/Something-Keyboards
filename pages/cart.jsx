import Nav from '../components/Nav';
import Head from 'next/head';
import Footer from '../components/Footer';
import React from 'react';
import styles from '../styles/Cart.module.css';
import GlobalContext from '../global/GlobalContext';
import ProductCart from '../components/ProductCart';

const Cart = () => {
  const [totals, setTotals] = React.useState({
    subtotal: 0.00,
    tax: 21.00,
    total: 0.00,
  });
  const { cart } = React.useContext(GlobalContext);
  const [disabled, setDisabled] = React.useState(true);

  // Update subtotal when cart changes
  React.useEffect(() => {
    const subtotal = cart.reduce((acc, subCart) => acc + subCart.price, 0);
    setTotals((prevTotals) => ({
      ...prevTotals,
      subtotal,
    }));
  }, [cart]);

  // Update total when subtotal or tax changes
  React.useEffect(() => {
    const calculateTotal = (tax, subtotal) => {
      return parseFloat((subtotal + (subtotal * tax / 100)).toFixed(2));
    };

    const newTotal = calculateTotal(totals.tax, totals.subtotal);
    setTotals((prevTotals) => ({
      ...prevTotals,
      total: newTotal,
    }));

    setDisabled(newTotal === 0);  // Disable button if total is 0
  }, [totals.subtotal, totals.tax]);

  const handleContinue = () => {
    if (totals.total !== 0) {
      window.location.href = '/cart/checkout';
    }
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
            <ProductCart key={item.id || index} item={item} />
          ))}
        </div>
      </main>
      <aside className={styles.Aside}>
        <h2>Summary</h2>
        <div>
          <ul>
            <li>Subtotal: ${totals.subtotal}</li>
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
