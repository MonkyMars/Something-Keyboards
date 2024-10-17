import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "../../../lib/supabaseClient";
import bcrypt from "bcrypt";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Check if user exists in Supabase
        const { email, password } = credentials;

        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .ilike("email", email);
        if (error || user.length === 0) {
          throw new Error("Invalid credentials");
        }

        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user[0].id,
          email: user[0].email,
          first_name: user[0].first_name,
          last_name: user[0].last_name,
          display_mode: user[0].display_mode,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt", 
    maxAge: 60 * 60 * 24 * 7,
  },
  callbacks: {
    async jwt({ token, user }) {
      // If user is found, add details to the token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.display_mode = user.display_mode;
        token.first_name = user.first_name;
        token.last_name = user.last_name
      }
      return token;
    },
    async session({ session, token }) {
      // Attach token data to the session object
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.display_mode = token.display_mode;
      session.user.first_name = token.first_name;
      session.user.last_name = token.last_name
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,  // Store this securely in your env
});
