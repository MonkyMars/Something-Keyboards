import React from "react";
import styles from "../styles/components/ProductCart.module.css";
import Image from "next/image";

export default function ProductCart({ item }) {
  console.log(item)
  return (
    <div className={styles.ProductCart}>
        <div
          key={item.id}
          className={styles.productCart}
          onClick={() => (window.location.href = item.url)}
        >
          <Image
            priority
            src={item.image}
            alt={item.name}
            width={item.dimensions.width}
            height={item.dimensions.height}
          />
          <div>
            <h2>{item.name}</h2>
            <div className={styles.buttons}>
              <label>${item.price}</label>
              <label><Image src={'/icons/shoppingcart_remove.png'} width={25} height={25} alt="remove"/></label>
            </div>
          </div>
        </div>
    </div>
  );
}
