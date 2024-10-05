import { supabase } from "../../lib/supabaseClient";

export default async function user(req, res) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email);

      if (fetchError) {
        return res.status(500).json({ error: "Error fetching user data", fetchError });
      }

      if (existingUser.length > 0) {
        return res.status(400).json({ error: "User already exists" });
      }

      const { error: insertError } = await supabase
        .from("users")
        .insert([{ email, password }]);

      if (insertError) {
        return res.status(500).json({ error: "Failed to add user to public.users", insertError });
      }

      return res.status(200).json({ message: "User successfully created" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to add user", details: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
