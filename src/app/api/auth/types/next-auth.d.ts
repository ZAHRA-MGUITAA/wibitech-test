import "next-auth";

declare module "next-auth" {
  interface User {
    username?: string;
    role?: "admin" | "user";
    integrations?: any;
    firstName?: string;
    token?: string;
  }

  interface Session {
    user?: User;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    username?: string;
    roles?: "admin" | "user";
    integrations?: any;
    firstName?: string;
    accessToken?: string;
  }
}
