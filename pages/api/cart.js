import { supabase } from "../../lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { data: cart, error } = await supabase
      .from("cart")
      .select("*")
      .eq("user_id", 1);

    if (error) {
      console.error("Error fetching cart:", error);
      return res.status(500).json({ error: "Failed to fetch cart" });
    }

    if (!cart || cart.length === 0) {
      return res.status(200).json({ message: "No items in the cart." });
    }

    return res.status(200).json({ cart });
  }

  else if (req.method === "POST") {
    const { product_id, user_id } = req.body;
    const { data: existingCart, error: fetchError } = await supabase
      .from("cart")
      .select("*")
      .eq("user_id", user_id)
      .single();

    if (fetchError) {
      console.error("Error fetching cart:", fetchError);
      return res.status(500).json({ error: "Failed to fetch user's cart" });
    }

    let updatedProductIds = [product_id];
    if (existingCart) {
      const currentProductIds = existingCart.product_id.split(',');
      if (!currentProductIds.includes(product_id)) {
        updatedProductIds = [...currentProductIds, product_id];
      }
    }
    const updatedProductIdsString = updatedProductIds.join(',');

    const { data, error } = await supabase
      .from("cart")
      .upsert([{ product_id: updatedProductIdsString, user_id }], { onConflict: ['user_id'] });

    if (error) {
      console.error("Error updating cart:", error);
      return res.status(500).json({ error: "Failed to update cart" });
    }

    return res.status(200).json({ message: "Cart updated successfully", data });
  }

  else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
