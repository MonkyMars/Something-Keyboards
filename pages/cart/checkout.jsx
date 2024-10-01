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
    payment: {
      credit_number: '',
      credit_expires: '',
      credit_cvc: '',
    }
  });
  const [formPage, setFormPage] = React.useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCVCChange = (e) => {
    const { name, value } = e.target;
    if (/^\d{0,3}$/.test(value)) {
      setFormData((prevData) => ({
        ...prevData,
        payment: {
          ...prevData.payment,
          [name]: value
        }
      }));
    }
  };

  const handleDeliveryChange = (id) => {
    setFormData((prevData) => ({ ...prevData, delivery_option: id }));
  };

  const isFormValid = () => {
    return formData.fullname && formData.email && formData.address;
  };

  return (
    <>
      <Head>
        <title>{'Something | Checkout'}</title>
      </Head>
      <Nav />
      <main className={styles.main}>
        <div className={styles.checkout}>
          <h1>{'Checkout'}</h1>
          <form className={styles.inputBox}>
            {formPage === 0 && (
              <>
                <div>
                  <label>
                    Full name:
                    <input 
                      name="fullname" 
                      placeholder="Full name" 
                      value={formData.fullname} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </label>
                  <label>
                    Email:
                    <input 
                      type="email"
                      name="email" 
                      placeholder="Email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </label>
                  <label>
                    Address:
                    <input 
                      name="address" 
                      placeholder="Address" 
                      value={formData.address} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </label>
                </div>
    
                <label className={styles.deliveryText}>Delivery:</label>
                <div className={styles.deliveryOptionsSlider}>
                  {delivery_options.map((option) => (
                    <div
                      key={option.id}
                      className={styles.deliveryBox}
                      style={{ border: formData.delivery_option === option.id ? '3px solid #6200EA' : '3px solid #ccc' }}
                      onClick={() => handleDeliveryChange(option.id)}
                    >
                      <label>
                        <Image src={'/icons/package.png'} width={25} height={25} alt="" />
                        {option.name}
                      </label>
                      <label>{option.duration}</label>
                      <label>{option.price === 0 ? 'Free' : '$' + option.price}</label>
                    </div>
                  ))}
                </div>
                <button type="button" disabled={!isFormValid()} onClick={() => setFormPage(1)}>
                  Continue to payment
                </button>  
              </>
            )}
            {formPage === 1 && (
              <>
                <h3>{'Enter payment method:'}</h3>
                <label>{'Credit Card Number:'}</label>
                <input 
                  name="credit_number" 
                  value={formData.payment.credit_number} 
                  placeholder="Card Number" 
                  onChange={handleInputChange}
                />
                <label>{'Credit Card Expires:'}</label>
                <input 
                  name="credit_expires" 
                  value={formData.payment.credit_expires} 
                  placeholder="MM/YY" 
                  onChange={handleInputChange}
                />
                <label>{'Credit Card CVC:'}</label>
                <input 
                  type='text'
                  name="credit_cvc" 
                  value={formData.payment.credit_cvc} 
                  placeholder="CVC" 
                  onChange={handleCVCChange}
                />
              </>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
