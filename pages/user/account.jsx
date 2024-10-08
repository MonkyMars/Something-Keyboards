import React from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/user/Account.module.css";
import GlobalContext from '../../global/GlobalContext';
import { useRouter } from "next/router";
const Account = () => {
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [visible, setVisible] = React.useState(null);
  const { user, setUser } = React.useContext(GlobalContext);

  const account_settings = [
    { name: "Account Details", icon: user.display_mode === 0 ? "/icons/account.png" : "/icons/lightmode/account_white.png" },
    { name: "Delivery Addresses", icon: user.display_mode === 0 ? "/icons/package.png" : "/icons/lightmode/package_white.png" },
    { name: "Payment Methods", icon: user.display_mode === 0 ? "/icons/creditcard.png" : "/icons/lightmode/creditcard_white.png" },
    { name: "Preferences", icon: user.display_mode === 0 ? "/icons/settings-acc.png" : "/icons/lightmode/settings_acc_white.png"},
    { name: "Display", icon: user.display_mode === 0 ? "/icons/display.png" : "/icons/lightmode/display_white.png" },
  ];

  React.useEffect(() => {
    if (!user.email) {
      router.push('/user/login');
    }
  }, [user.email, router]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({ ...prevData, [name]: value }));
  };

  const toggleDisplayMode = (mode) => {
    setUser((prevUser) => ({ ...prevUser, display_mode: mode }));
    handleSubmit();
  };

  const handleAddAddress = () => {
    // Add logic to save new address
    // Example: setUser((prevUser) => ({
    //   ...prevUser,
    //   delivery_addresses: [...prevUser.delivery_addresses, newAddress],
    // }));
    setVisible(null);
  };

  const handleAddPaymentMethod = () => {
    // Add logic to save new payment method
    // Example: setUser((prevUser) => ({
    //   ...prevUser,
    //   added_payment_methods: [...prevUser.added_payment_methods, newPaymentMethod],
    // }));
    setVisible(null);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      });
  
      const result = await response.json();
      if (!response.ok) {
        console.error("Error updating user:", result.error);
      } else {
        console.log("Update successful:", result.message);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };
  

  return (
    <>
      <Head>
        <title>{'Something | Account'}</title>
      </Head>
      <Nav />
      <main className={styles.main}>
        <aside className={styles.optionsList}>
          <h2>{'Settings'}</h2>
          <div>
            {account_settings.map((setting, index) => (
              <label
                key={index}
                onClick={() => setPage(index)}
                style={{
                  outline: page === index ? "2.5px solid var(--button-color)" : "none",
                }}
              >
                <Image
                  src={setting.icon}
                  alt={setting.name}
                  width={25}
                  height={25}
                />{" "}
                {setting.name}
              </label>
            ))}
          </div>
        </aside>

        <section className={styles.section}>
          <h2>{account_settings[page].name}</h2>
          <form onSubmit={handleSubmit}>
            {page === 0 && (
              <div className={styles.userInformation}>
                <label>Email:</label>
                <input
                  placeholder="Email..."
                  value={user.email}
                  name="email"
                  onChange={handleInputChange}
                />
                <div>
                  <div>
                    <label>First name:</label>
                    <input
                      placeholder="First name..."
                      value={user.first_name}
                      name="first_name"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Last name:</label>
                    <input
                      placeholder="Last name..."
                      value={user.last_name}
                      name="last_name"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <label>Password:</label>
                <input
                  type="password"
                  placeholder="Password..."
                  value={user.password}
                  name="password"
                  onChange={handleInputChange}
                />
              </div>
            )}

            {page === 1 && (
              <div>
                <button type="button" className={styles.addAddress} onClick={() => setVisible(1)}>
                  Add Address
                </button>
                {user.delivery_addresses?.map((address, index) => (
                  <div key={address.id || index} className={styles.address}>
                    <label>Country:</label>
                    <input value={address.country} readOnly />
                    <label>City:</label>
                    <input value={address.city} readOnly />
                    <label>Postal code:</label>
                    <input value={address.postal_code} readOnly />
                    <div>
                      <div>
                        <label>Street name:</label>
                        <input value={address.street} readOnly />
                      </div>
                      <div>
                        <label>Street number:</label>
                        <input value={address.street_number} readOnly />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {page === 2 && (
              <div className={styles.paymentMethods}>
                <button type="button" onClick={() => setVisible(2)}>
                {'Add Payment Method'}
                </button>
                {user.added_payment_methods?.length > 0 ? (
                  user.added_payment_methods?.map((method, index) => (
                    <div key={index} className={styles.paymentMethod}>
                      <div>
                        <Image src={method.icon} alt={method.name} width={45} height={45} />
                        <label>{method.name}</label>
                      </div>
                      <label>Card holder:</label>
                      <input value={method.card_holder} readOnly />
                      <label>Card Number:</label>
                      <input value={method.number} readOnly />
                      <label>Expires:</label>
                      <input value={method.expires} readOnly />
                    </div>
                  ))
                ) : (
                  <label>No added payment methods</label>
                )}
              </div>
            )}

            {page === 4 && (
              <div className={styles.Display}>
                <label>
                  {`Current display mode: ${user.display_mode === 0 ? "Light" : "Dark"}mode`}
                </label>
                <div className={`${styles.container}`}>
                <div onClick={() => toggleDisplayMode(0)} className={`${styles.lightmode} ${user.display_mode === 0 && styles.active}`} >
                  <Image
                    src="/icons/display.png"
                    alt="Light mode icon"
                    width={35}
                    height={35}
                  />
                </div>
                <div onClick={() => toggleDisplayMode(1)} className={`${styles.darkmode} ${user.display_mode === 1 && styles.active}`}>
                  <Image
                    src="/icons/darkmode.png"
                    alt="Dark mode icon"
                    width={35}
                    height={35}
                  />
                </div>
                </div>
              </div>
            )}

            <button type="submit">Submit</button>
          </form>
        </section>

        {visible && (
          <div className={styles.visible}>
            {visible === 1 && (
              <>
                <div className={styles.title}>
                  <h2>Add Delivery Address</h2>
                  <h2 onClick={() => setVisible(null)}>x</h2>
                </div>
                <div>
                  <label>Country:</label>
                  <input />
                  <label>City:</label>
                  <input />
                  <label>Postal code:</label>
                  <input />
                  <div>
                    <div>
                      <label>Street name:</label>
                      <input />
                    </div>
                    <div>
                      <label>Street number:</label>
                      <input />
                    </div>
                  </div>
                  <button onClick={handleAddAddress}>Save Address</button>
                </div>
              </>
            )}
            {visible === 2 && (
              <>
                <div className={styles.title}>
                  <h2>Add Payment Method</h2>
                  <h2 onClick={() => setVisible(null)}>x</h2>
                </div>
                <div>
                  <label>Card holder:</label>
                  <input name="credit_holder" placeholder="..." />
                  <label>Card number:</label>
                  <input name="credit_number" placeholder="..." />
                  <label>Expires:</label>
                  <input name="credit_expires" placeholder="..." />
                  <button onClick={handleAddPaymentMethod}>Save Payment Method</button>
                </div>
              </>
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Account;
