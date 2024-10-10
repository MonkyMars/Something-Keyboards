import React from "react";
import styles from "../../styles/Checkout.module.css";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Image from "next/image";
import Head from "next/head";
import GlobalContext from "../../global/GlobalContext";
import { useRouter } from "next/router";
import Map from "../../components/Map";

export default function Checkout() {
  const router = useRouter();
  const delivery_options = [
    { id: 1, name: "Standard", duration: "5 business days", price: 0 },
    { id: 2, name: "Premium", duration: "1-2 business days", price: 1.99 },
  ];
  const { user, cart, products, setCart } = React.useContext(GlobalContext);
  const [formData, setFormData] = React.useState({
    fullname: "",
    email: "",
    address: "",
    country: "",
    zipCode: "",
    delivery_option: 1,
    payment: {
      credit_number: "",
      credit_expires: "",
      credit_cvc: "",
    },
  });
  const [icons, setIcons] = React.useState<{ src: string }[]>([]);
  const [formPage, setFormPage] = React.useState(0);

  React.useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch("/api/cart", {
        method: "GET",
      });

      const data = await response.json();

      if (!Array.isArray(data.cart)) {
        console.error("Cart data is not an array:", data.cart);
        return;
      }

      const foundProducts: any = [];

      data.cart.forEach((cartItem: any) => {
        const productIds = cartItem.product_id.split(",");

        productIds.forEach((id: any) => {
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

  const getProductById = (productId: number) => {
    return products.find((product: any) => product.id === productId) || null;
  };

  React.useEffect(() => {
    if (user.email) {
      setFormData(user);
    }
    console.log(user.address, user.zipCode, user.country);
  }, [user]);

  React.useEffect(() => {
    type Icons = {
      src: string
    }
    const root = document.documentElement;
    const icons: Icons[] = [
      {
        src:
          root.style.getPropertyValue("--Bg") === "#e3e3e3"
            ? "/icons/package.png"
            : "/icons/lightmode/package_white.png",
      },
    ];
    setIcons(icons);
  }, [user.display_mode]);

  React.useEffect(() => {
    if (!cart) {
      router.push("/cart");
    }
  }, [cart, router]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCVCChange = (e: any) => {
    const { name, value } = e.target;
    if (/^\d{0,3}$/.test(value)) {
      setFormData((prevData) => ({
        ...prevData,
        payment: {
          ...prevData.payment,
          [name]: value,
        },
      }));
    }
  };

  const handlePaymentChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      payment: {
        ...prevData.payment,
        [name]: value,
      },
    }));
  };

  const handleDeliveryChange = (id: number) => {
    setFormData((prevData) => ({ ...prevData, delivery_option: id }));
  };

  const isFormValid = () => {
    return formData.fullname && formData.email && formData.address;
  };

  return (
    <>
      <Head>
        <title>{"Something | Checkout"}</title>
      </Head>
      <Nav />
      <main className={styles.main}>
        <div className={styles.checkout}>
          {formPage !== 2 && <h1>{"Checkout"}</h1>}
          <form className={styles.inputBox}>
            {formPage === 0 && (
              <>
                <div>
                  <label>
                    Full name:
                    <input
                      name="fullname"
                      placeholder="Full name"
                      value={formData?.fullname}
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
                      value={formData?.email}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Address:
                    <input
                      name="address"
                      placeholder="Address"
                      value={formData?.address}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                </div>

                <label className={styles.deliveryText}>Delivery:</label>
                <div className={styles.deliveryOptionsSlider}>
                  {delivery_options?.map((option, index) => (
                    <div
                      key={option?.id || index}
                      className={styles.deliveryBox}
                      style={{
                        border:
                          formData?.delivery_option === option.id
                            ? "3px solid #6200EA"
                            : "3px solid #ccc",
                      }}
                      onClick={() => handleDeliveryChange(option.id)}
                    >
                      <label>
                        <Image
                          src={icons[0]?.src}
                          width={25}
                          height={25}
                          alt=""
                        />
                        {option.name}
                      </label>
                      <label>{option?.duration}</label>
                      <label>
                        {option?.price === 0 ? "Free" : "$" + option.price}
                      </label>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  disabled={!isFormValid()}
                  onClick={() => setFormPage(1)}
                >
                  Continue to payment
                </button>
              </>
            )}
            {formPage === 1 && (
              <>
                <label>{"Credit Card Number:"}</label>
                <input
                  name="credit_number"
                  value={formData?.payment.credit_number}
                  placeholder="Card Number"
                  onChange={handlePaymentChange}
                />
                <label>{"Credit Card Expires:"}</label>
                <input
                  name="credit_expires"
                  value={formData?.payment.credit_expires}
                  placeholder="MM/YY"
                  onChange={handlePaymentChange}
                />
                <label>{"Credit Card CVC:"}</label>
                <input
                  type="text"
                  name="credit_cvc"
                  value={formData?.payment.credit_cvc}
                  placeholder="CVC"
                  onChange={handleCVCChange}
                />
                {user.payment_methods && (
                  <div>
                    <label>{"Or select from added payment methods:"}</label>
                    <select>
                      {user.payment_methods?.map(
                        (method: any, index: number) => (
                          <option key={index}>{method.name}</option>
                        )
                      )}
                    </select>
                  </div>
                )}
                <button type="submit" onClick={() => setFormPage(2)}>
                  {"Order overview"}
                </button>
              </>
            )}
            {formPage === 2 && (
              <>
                <div className={styles.orderOverview}>
                  <Map
                    address={formData?.address}
                    zipCode={formData?.zipCode}
                    country={formData?.country}
                  />
                  <label className={styles.address}>
                    {formData.address}, {formData.country}
                  </label>
                  <h1>{"Order overview"}</h1>
                  <div className={styles.account}>
                    <label>{formData?.fullname}</label>
                    <label>{formData?.email}</label>
                  </div>
                  <div className={styles.cart}>
                    {cart?.map((item: any, index: number) => (
                      <label key={index}>
                        1.{item.name} - ${item.price}
                      </label>
                    ))}
                  <label>{formData.delivery_option === 1  ? 'Free Delivery - $0' : 'Premium Delivery - $1.99'}</label>
                  </div>
                  <label className={styles.price}>
                    $
                    {(
                      cart?.reduce(
                        (total: number, item: any) => total + item.price,
                        0
                      ) *
                        1.21 +
                      (formData.delivery_option === 1 ? 0 : 1.99)
                    ).toFixed(2)}
                  </label>

                  <button>{"Continue & Confirm"}</button>
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

// 352.09
