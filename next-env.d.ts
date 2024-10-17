/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/pages/building-your-application/configuring/typescript for more information.
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      first_name: string;
      last_name: string;
      email: string;
      display_mode: number;
    };
  }
}