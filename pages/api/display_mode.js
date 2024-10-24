import { supabase } from "../../lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    try {
      const { id, mode } = req.body;

      const { data: existingUser, error } = await supabase
        .from("users")
        .update({ display_mode: mode })
        .eq("id", id)
        .select();

      if (error) {
        console.error("Supabase error:", error);
        return res.status(500).json({
          message: "Failed to update display mode",
          error: error.message || error,
        });
      }
      if (!existingUser || existingUser.length === 0) {
        return res
          .status(404)
          .json({ message: "No user found", user: existingUser, error: error });
      }
      return res.status(200).json({
        message: "Display mode updated successfully",
        user: existingUser,
      });
    } catch (error) {
      console.error("Unexpected server error:", error);
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message || error,
      });
    }
  } else {
    res.setHeader("Allow", ["PATCH"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
