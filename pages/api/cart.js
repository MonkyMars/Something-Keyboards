import { supabase } from "../../lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { user_id } = req.query;
    const { data: cart, error } = await supabase
      .from("cart")
      .select("*")
      .eq("user_id", user_id);

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

    // Fetch existing cart for the user
    const { data: existingCart, error: fetchError } = await supabase
      .from("cart")
      .select("*")
      .eq("user_id", user_id)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // Handle the case where there's no row (error PGRST116)
      console.error("Error fetching cart:", fetchError);
      return res.status(500).json({ error: "Failed to fetch user's cart" });
    }

    // Initialize updated product IDs
    let updatedProductIds = [product_id];

    // If the user already has a cart, update product_ids
    if (existingCart) {
      const currentProductIds = existingCart.product_id.split(",");
      if (!currentProductIds.includes(product_id)) {
        updatedProductIds = [...currentProductIds, product_id];
      }
    }

    // Convert the product IDs array back to a string
    const updatedProductIdsString = updatedProductIds.join(",");

    // Upsert (insert or update) the cart for the user
    const { data, error } = await supabase
      .from("cart")
      .upsert([{ product_id: updatedProductIdsString, user_id }], {
        onConflict: ["user_id"], // Upsert based on user_id conflict
      });

    if (error) {
      console.error("Error updating cart:", error);
      return res.status(500).json({ error: "Failed to update cart" });
    }

    return res.status(200).json({ message: "Cart updated successfully" });
  } 
  else if (req.method === "DELETE") {
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

    if (!existingCart || !existingCart.product_id.includes(product_id)) {
      return res.status(400).json({ error: "Product not found in the cart" });
    }

    let productIdsArray = existingCart.product_id.split(",");
    const indexToRemove = productIdsArray.indexOf(product_id.toString());

    if (indexToRemove !== -1) {
      productIdsArray.splice(indexToRemove, 1);
    }

    const updatedProductIds = productIdsArray.join(",");

    const { data, error } = await supabase
      .from("cart")
      .update({ product_id: updatedProductIds })
      .eq("user_id", user_id);

    if (error) {
      console.error("Error deleting product from cart:", error);
      return res.status(500).json({ error: "Failed to update cart" });
    }

    return res
      .status(200)
      .json({ message: "Product removed from cart successfully", data });
  } 
  else {
    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
