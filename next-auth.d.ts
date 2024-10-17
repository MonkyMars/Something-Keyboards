import "next-auth";

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
