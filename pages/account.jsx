import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Account.module.css";

const Account = () => {
  const [page, setPage] = React.useState(0);
  const [visible, setVisible] = React.useState(null)
  const account_settings = [
    { name: "Account Details", icon: "/icons/account.png" },
    { name: "Delivery Addresses", icon: "/icons/package.png" },
    { name: "Payment Methods", icon: "/icons/creditcard.png" },
    { name: "Preferences", icon: "/icons/settings-acc.png" },
    { name: "Display", icon: "/icons/display.png" },
  ];

  const [user, setUser] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    hashed_password: "",
    added_payment_methods: [
      {
        id: 1,
        name: "iDEAL",
        card_holder: 'Levi Noppers',
        number: "057857535684",
        expires: '07/17/2028',
        icon: `/icons/banking/ideal_logo.svg`,
      },
    ],
    delivery_addresses: [
      {
        id: 1,
        country: "NL",
        city: "The Hague",
        postal_code: "2531XG",
        street: "Jan de Weertstraat",
        street_number: "37",
      },
      {
        id: 2,
        country: "NL",
        city: "The Hague",
        postal_code: "2553JB",
        street: "Gravin Othildehof",
        street_number: "12",
      },
    ],
    display_mode: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({ ...prevData, [name]: value }));
  };

  const toggleDisplayMode = (mode) => {
    setUser((prevUser) => ({ ...prevUser, display_mode: mode }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted user data:", user);
  };

  return (
    <>
      <Head>
        <title>Something | Account</title>
      </Head>
      <Nav />
      <main className={styles.main}>
        <aside className={styles.optionsList}>
          <h2>Settings</h2>
          <div>
            {account_settings.map((setting, index) => (
              <label
                key={index}
                onClick={() => setPage(index)}
                style={{
                  outline:
                    page === index ? "2.5px solid var(--button-color)" : "none",
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
                  placeholder="Password..."
                  value={user.password}
                  name="password"
                  onChange={handleInputChange}
                />
              </div>
            )}

            {page === 1 && (
              <div>
                <button className={styles.addAddress} onClick={() => setVisible(page)}>Add Address</button>
                {user.delivery_addresses.map((address, index) => (
                  <div key={address.id || index} className={styles.address}>
                    <label>Country:</label>
                    <input value={address.country} />
                    <label>City:</label>
                    <input value={address.city} />
                    <label>Postal code:</label>
                    <input value={address.postal_code} />
                    <div>
                      <div>
                        <label>Street name:</label>
                        <input
                          value={address.street}
                          name="street"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label>Street number:</label>
                        <input
                          value={address.street_number}
                          name="street_number"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {page === 2 && (
              <div className={styles.paymentMethods}>
                <button onClick={() => setVisible(page)}>{'Add Payment Method'}</button>
                {user.added_payment_methods.length > 0 ? (
                  user.added_payment_methods.map((method, index) => (
                    <div key={index} className={styles.paymentMethod}>
                      <div>
                        <Image src={'/icons/banking/ideal_logo.svg'} alt={method.name} width={45} height={45}/>
                        <label>{method.name}</label>
                      </div>
                      <label>{'Card holder:'}</label>
                      <input name="card_holder" value={method.card_holder}/>
                      <label>{'Card Number:'}</label>
                      <input name="card_number" value={method.number}/>
                      <label>{'Expires:'}</label>
                      <input name="expires" value={method.expires}/>
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
                  Current display mode:{" "}
                  {user.display_mode === 0 ? "Light" : "Dark"}
                </label>
                <div
                  className="light-mode"
                  onClick={() => toggleDisplayMode(0)}
                >
                  <Image
                    src={"/icons/display.png"}
                    alt="Light mode icon"
                    width={35}
                    height={35}
                  />
                </div>
                <div className="dark-mode" onClick={() => toggleDisplayMode(1)}>
                  <Image
                    src={"/icons/darkmode.png"}
                    alt="Dark mode icon"
                    width={35}
                    height={35}
                  />
                </div>
              </div>
            )}
            <button type="submit">Submit</button>
          </form>
        </section>
        {visible && <div className={styles.visible}>
            {visible === 1 && (
              <>
              <div className={styles.title}>
                <h2>{'Add Delivery Address'}</h2>
                <h2 onClick={() => setVisible(null)}>{'x'}</h2>
              </div>
                <div>
                    <label>Country:</label>
                    <input/>
                    <label>City:</label>
                    <input/>
                    <label>Postal code:</label>
                    <input/>
                    <div>
                      <div>
                        <label>Street name:</label>
                        <input
                          
                        />
                      </div>
                      <div>
                        <label>Street number:</label>
                        <input
                          
                        />
                      </div>
                    </div>
                  </div>
              </>
            )}
            {visible === 2 && (
             <>
              <div className={styles.title}>
                <h2>{'Add Payment Method'}</h2>
                <h2 onClick={() => setVisible(null)}>{'x'}</h2>
              </div>
              <div>
                <label>{'Card holder:'}</label>
                <input name="credit_holder" placeholder="..."/>
                <label>{'Card number:'}</label>
                <input name="credit_number" placeholder="..."/>
                <label>{'Expires'}</label>
                <input name="credit_expires" placeholder="..."/>
              </div>
             </>
            )}
            {visible === 3 && (
              <>
              <div className={styles.title}>
                <h2>{'Add Payment Method'}</h2>
                <h2 onClick={() => setVisible(null)}>{'x'}</h2>
              </div>
              </>
            )}
        </div>}
      </main>
      <Footer />
    </>
  );
};

export default Account;
