import "next-auth";

declare module "next-auth" {
  interface User {
    username?: string;
    role?: "admin" | "user";
    firstName?: string;
    token?: string;
    accessToken?: string;
  }

  interface Session {
    user?: User;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    username?: string;
    role?: "admin" | "user";
    firstName?: string;
    accessToken?: string;
  }
}
