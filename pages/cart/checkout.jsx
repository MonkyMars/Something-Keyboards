import React from "react";
import styles from '../../styles/Checkout.module.css';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Image from "next/image";
import Head from "next/head";
export default function Checkout() {
  const delivery_options = [
    { id: 1, name: 'Standard', duration: '5 business days', price: 0 },
    { id: 2, name: 'Premium', duration: '1-2 business days', price: 1.99 }
  ];

  const [formData, setFormData] = React.useState({
    fullname: '',
    email: '',
    address: '',
    delivery_option: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDeliveryChange = (id) => {
    setFormData((prevData) => ({ ...prevData, delivery_option: id }));
  };

  return (
    <>
    <Head>
      <title>{'Something | checkout'}</title>
    </Head>
      <Nav />
      <main className={styles.main}>
        <div className={styles.checkout}>
          <h1>{'Checkout'}</h1>
          <div className={styles.inputBox}>
            <input 
              name="fullname" 
              placeholder="Full name" 
              value={formData.fullname} 
              onChange={handleInputChange} 
              required 
            />
            <input 
              type="email"
              name="email" 
              placeholder="Email" 
              value={formData.email} 
              onChange={handleInputChange} 
              required 
            />
            <input 
              name="address" 
              placeholder="Address" 
              value={formData.address} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          <label className={styles.deliveryText}>Delivery:</label>
          <div className={styles.deliveryOptionsSlider}>
            {delivery_options.map((option, index) => (
              <div
                key={option.id || index}
                className={styles.deliveryBox}
                style={{ border: formData.delivery_option === option.id ? '3px solid #6200EA' : '3px solid #ccc' }}
                onClick={() => handleDeliveryChange(option.id)}
              >
                <label><Image src={'/icons/package.png'} width={25} height={25} alt="" />{option.name}</label>
                <label>{option.duration}</label>
                <label>{option.price === 0 ? 'Free' : '$' + option.price}</label>
              </div>
            ))}
          </div>
          <button disabled={false}>Continue to payment</button>
        </div>
      </main>
      <Footer />
    </>
  );
}
