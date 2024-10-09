import React from "react";
import styles from '../../styles/Checkout.module.css';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Image from "next/image";
import Head from "next/head";
import GlobalContext from '../../global/GlobalContext';

export default function Checkout() {
  const delivery_options = [
    { id: 1, name: 'Standard', duration: '5 business days', price: 0 },
    { id: 2, name: 'Premium', duration: '1-2 business days', price: 1.99 }
  ];
  const { user, cart } = React.useContext(GlobalContext);
  // window.alert(cart)
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

  React.useEffect(() => {
    if(user.email) {
      setFormData(user)
    }
  }, [user])

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

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      payment: {
        ...prevData.payment,
        [name]: value
      }
    }))
  }

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
          {formPage !== 2 && <h1>{'Checkout'}</h1>}
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
                  {delivery_options.map((option, index) => (
                    <div
                      key={option.id || index}
                      className={styles.deliveryBox}
                      style={{ border: formData.delivery_option === option.id ? '3px solid #6200EA' : '3px solid #ccc' }}
                      onClick={() => handleDeliveryChange(option.id)}
                    >
                      <label>
                        <Image src={user.display_mode === 0 ? '/icons/package.png' : '/icons/lightmode/package_white.png'} width={25} height={25} alt="" />
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
                <label>{'Credit Card Number:'}</label>
                <input 
                  name="credit_number" 
                  value={formData.payment.credit_number} 
                  placeholder="Card Number" 
                  onChange={handlePaymentChange}
                />
                <label>{'Credit Card Expires:'}</label>
                <input
                  name="credit_expires" 
                  value={formData.payment.credit_expires} 
                  placeholder="MM/YY" 
                  onChange={handlePaymentChange}
                />
                <label>{'Credit Card CVC:'}</label>
                <input 
                  type='text'
                  name="credit_cvc" 
                  value={formData.payment.credit_cvc} 
                  placeholder="CVC" 
                  onChange={handleCVCChange}
                />
                {user.payment_methods&& <div>
                  <label>{'Or select from added payment methods:'}</label>
                  <select>
                    {user.payment_methods?.map((method, index) => (
                      <option key={index}>{method.name}</option>
                    ))}
                  </select>
                </div>}
                <button type="submit" onClick={() => setFormPage(2)}>{'Order overview'}</button>
              </>
            )}
            {formPage === 2 && (
              <>
              <div className={styles.orderOverview}>
              
              <h1>{'Order overview'}</h1>
              <div>
                {cart?.map((item, index) => (
                  <label key={index}>{item.name}</label>
                ))}
              </div>
              <label>{cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</label>
              </div>
              </>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
