import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { handleApiError } from "./app/api/apiError/apiResponse";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (credentials === null) return null;

        try {
          const user = await axios.post(
            `${process.env.API_HOST}/api/login`,
            {
              username: credentials.username,
              password: credentials.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (user) {
            return user.data.user;
          } else {
            throw new Error("Email or Password is not correct");
          }
        } catch (error: unknown) {
          handleApiError(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return {
          ...token,
          ...session.user,
        };
      }
      if (user) {
        token.username = user.username;
        token.accessToken = user.token;
        token.firstName = user.firstName;
        token.role = user.role;
      }
      return token;
    },

    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          role: token.role,
          integrations: token.integrations,
          firstName: token.firstName,
          accessToken: token.accessToken,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
