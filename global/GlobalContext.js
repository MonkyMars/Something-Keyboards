import { createContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [products, setProducts] = useState(
    [
      [
        {
          id: 1,
          name: "Something Nebula",
          description: "Step into the cosmos with Something Nebula, a keyboard inspired by the beauty of distant galaxies. Featuring an ethereal blend of colors and effects, its RGB lighting paints your workspace with cosmic energy. Beneath the surface, Nebula is powered by advanced mechanical switches, ensuring a tactile and responsive typing experience. Whether you're exploring vast gaming worlds or creating your own, Something Nebula takes you beyond the ordinary with its out-of-this-world design and precision.",
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
            "Illuminate your setup with Something Glow, a keyboard designed to shine as brightly as your skills. Its vibrant, fully customizable RGB backlighting creates a mesmerizing ambiance, perfect for late-night gaming or focused work sessions. Built with premium mechanical switches for smooth and responsive keystrokes, Something Glow offers both style and performance in one sleek package. Let your personality shine through with a keyboard that’s as bold and unique as you are.",
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
          name: "Something Pulse",
          description:
            "Feel the heartbeat of your performance with Something Pulse. Built to deliver rapid-fire responses, this keyboard pulses with energy, featuring customizable lighting that reacts to your touch. Every keystroke is powered by high-performance switches that provide tactile feedback, giving you complete control in the heat of the moment. Whether you're commanding your game or powering through projects, Something Pulse ensures your every move is precise, sharp, and perfectly timed.",
          image: "/products/glow/Glow.webp",
          price: 139.99,
          url: "/product/pulse",
          dimensions: {
            width: 200,
            height: 200,
          },
        },
      ],
      [
        {
          id: 2,
          name: "Something Flux",
          description:
            "Something Flux is where precision meets fluidity. Designed for both gamers and creators, this keyboard adapts to your every move with seamless responsiveness. The dynamic RGB lighting enhances your experience with a flow of colors that shift in real time, while its durable mechanical switches ensure every keystroke feels satisfying and consistent. Whether you're diving into an intense gaming session or typing at lightning speed, Something Flux keeps up with your rhythm, making it the perfect blend of form and function.",
          image: "/products/flux/Flux.webp",
          price: 199.99,
          url: "/product/flux",
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
