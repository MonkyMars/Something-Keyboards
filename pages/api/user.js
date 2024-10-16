import { supabase } from "../../lib/supabaseClient";
import bcrypt from "bcrypt";

export default async function user(req, res) {
  if (req.method === "POST") {
    try {
      const { email, password, first_name, last_name, display_mode } = req.body;

      const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .ilike("email", email);

      if (fetchError) {
        return res.status(500).json({ error: "Error fetching user data", fetchError });
      }

      if (first_name) {
        // Register new user
        if (existingUser.length > 0) {
          return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const { error: insertError } = await supabase
          .from("users")
          .insert([{ email, password: hashedPassword, first_name, last_name, display_mode }]);

        if (insertError) {
          return res.status(500).json({ error: "Failed to add user to public.users", insertError });
        }

        return res.status(200).json({ message: "User successfully created" });
      } else {
        // Login user
        if (existingUser.length > 0) {
          const validPassword = await bcrypt.compare(password, existingUser[0].password);

          if (validPassword) {
            return res.status(200).json({ message: "Login successful" });
          } else {
            return res.status(401).json({ error: "Invalid credentials" });
          }
        } else {
          return res.status(404).json({ error: "User not found" });
        }
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal server error", details: error.message });
    }
  } else if (req.method === "PUT") {
    try {
      const { email, password, first_name, last_name, delivery_addresses, payment_methods } = req.body;

      console.log(email)
      const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .ilike("email", email);

      if (fetchError || existingUser.length === 0) {
        return res.status(404).json({ error: "User not found or error fetching data", fetchError, existingUser });
      }

      let hashedPassword = existingUser[0].password;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      const { error: updateError } = await supabase
        .from("users")
        .update({ email, password: hashedPassword, first_name, last_name, delivery_addresses, payment_methods })
        .eq("email", email);

      if (updateError) {
        return res.status(500).json({ error: "Failed to update user in public.users", updateError });
      }

      return res.status(200).json({ message: "User successfully updated" });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error", details: error.message });
    }
  } else if(req.method === 'GET') {
    try{
      const { email } = req.query;

      const { data: user, error: fetchError } = await supabase
          .from("users")
          .select("*")
          .ilike("email", email);
      console.log(user)
      if(user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ error: "User not logged in"})
      }
    } catch(error) {
      console.log(error)
      return res.status(500).json({ error: "Internal server error", details: error.message})
    }
    
  } else {
    res.setHeader("Allow", ["POST", "PUT", "GET"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
