import React from "react";
import Image from "next/image";
import styles from "/styles/components/Product.module.css";

export default function Product({ product }) {
  if (!product || product.length === 0) {
    return <p>No products available</p>;
  }
  const imageSrc = product.image || '/icons/shoppingcart.png';
  return (
        <div
          key={product.id}
          className={styles.product}
          onClick={() => (window.location.href = product.url)}
        >
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <Image
            priority
            src={imageSrc}
            alt={product.name || product.id}
            width={200}
            height={200}
          />
          <div className={styles.buttons}>
            <button>${product.price}</button>
            <button>
              <Image
                src="/icons/shoppingcart_add.png"
                alt={product.name || 'Add to cart'}
                width={25}
                height={25}
              />
            </button>
          </div>
        </div>
  );
}
