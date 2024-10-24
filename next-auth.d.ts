import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      display_mode: number;
      payment_methods: [],
      delivery_addresses: [],
    };
  }
}
