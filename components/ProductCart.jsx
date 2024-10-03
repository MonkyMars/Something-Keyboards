import React from "react";
import styles from "../styles/components/ProductCart.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import GlobalContext from '../global/GlobalContext';

export default function ProductCart({ item }) {
  const router = useRouter();
  const { products, setCart } = React.useContext(GlobalContext);

  const removeFromCart = async(id) => {
    const user_id = 1;

    try {
      const response = await fetch('/api/cart', {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          product_id: id,
          user_id: user_id
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to remove from cart');
      }
      location.reload()
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };
  

  return (
    <div className={styles.ProductCart}>
        <div
          key={item.id}
          className={styles.productCart}
        >
          <Image
            priority
            src={item.image}
            alt={item.name}
            width={200}
            height={200}
          />
          <div>
            <h2>{item.name}</h2>
            <div className={styles.buttons}>
              <label onClick={() => router.push(item.url)}>${item.price}</label>
              <label onClick={() => removeFromCart(item.id)}><Image src={'/icons/shoppingcart_remove.png'} width={25} height={25} alt="remove"/></label>
            </div>
          </div>
        </div>
    </div>
  );
}
