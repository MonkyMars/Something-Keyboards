export default function fetchProduct(req, res) {
  if (req.method === 'GET') {
    try {
      const product = [
        {
          id: 1,
          name: "Something Nebula",
          description: "A sleek, minimalist keyboard with RGB lighting",
          image: "/products/nebula/Nebula.webp",
          price: 100.99,
          url: "/products/nebula",
          dimensions: {
            width: 200,
            height: 200,
          },
        },
        {
          id: 2,
          name: "Something Glow",
          description: "A powerful, lightweight mouse with a built-in lighting system",
          image: "/products/glow/Glow.webp",
          price: 150.99,
          url: "/products/glow",
          dimensions: {
            width: 200,
            height: 200,
          },
        }
      ];
      
      res.status(200).json({ product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
