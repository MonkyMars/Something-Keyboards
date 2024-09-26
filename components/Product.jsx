import React from "react";
import Image from "next/image";
import styles from "/styles/components/Product.module.css";

export default function Product({ product }) {
  if (!product || product.length === 0) {
    return <p>No products available</p>;
  }

  return (
    <div className={styles.productList}>
      {product.map((item, index) => (
        <div
          key={index || item.id}
          className={styles.product}
          onClick={() => (window.location.href = item.url)}
        >
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <Image
            priority
            src={item.image}
            alt={item.name}
            width={item.dimensions.width}
            height={item.dimensions.height}
          />
          <div className={styles.buttons}>
            <button>
              <label>{item.price}</label>
              <Image
                src="/icons/shoppingcart_add.png"
                alt="add to cart"
                width={25}
                height={25}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
