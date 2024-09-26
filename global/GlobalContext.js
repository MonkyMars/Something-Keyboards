import { createContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [products, setProducts] = useState(
    [
      [
        {
          id: 1,
          name: "Something Nebula",
          description: "A sleek, minimalist keyboard with RGB lighting",
          image: "/products/nebula/Nebula.webp",
          price: 100.99,
          url: "/product/nebula",
          dimensions: {
            width: 200,
            height: 200,
          },
        },
      ],
      [
        {
          id: 2,
          name: "Something Glow",
          description:
            "A powerful, lightweight mouse with a built-in lighting system",
          image: "/products/glow/Glow.webp",
          price: 150.99,
          url: "/product/glow",
          dimensions: {
            width: 200,
            height: 200,
          },
        },
      ],
      [
        {
          id: 2,
          name: "Something Glow",
          description:
            "A powerful, lightweight mouse with a built-in lighting system",
          image: "/products/glow/Glow.webp",
          price: 150.99,
          url: "/product/glow",
          dimensions: {
            width: 200,
            height: 200,
          },
        },
      ],
      [
        {
          id: 2,
          name: "Something Glow",
          description:
            "A powerful, lightweight mouse with a built-in lighting system",
          image: "/products/glow/Glow.webp",
          price: 150.99,
          url: "/product/glow",
          dimensions: {
            width: 200,
            height: 200,
          },
        },
      ],
    ]
  );
  const [cart, setCart] = useState([])
  return (
    <GlobalContext.Provider value={{ products, setProducts, cart, setCart }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
