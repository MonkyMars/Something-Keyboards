import { supabase } from "../../lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { data: cart, error } = await supabase.from("cart").select("*");
    if (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ error: "Failed to fetch products" });
    }
    if (!cart || cart.length === 0) {
      console.log("No items in the cart.");
    }
    return res.status(200).json({cart});
  } else if(req.method === 'POST') {
    // logic for adding product_id, user_id to cart
  }
}