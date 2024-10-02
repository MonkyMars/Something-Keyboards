import React from "react";
import styles from "../styles/components/ProductCart.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

export default function ProductCart({ item }) {
  const router = useRouter();
  return (
    <div className={styles.ProductCart}>
        <div
          key={item.id}
          className={styles.productCart}
          onClick={() => router.push(item.url)}
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
              <label>${item.price}</label>
              <label><Image src={'/icons/shoppingcart_remove.png'} width={25} height={25} alt="remove"/></label>
            </div>
          </div>
        </div>
    </div>
  );
}
