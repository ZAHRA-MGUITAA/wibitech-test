import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { headers } from "next/headers";

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
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, trigger, session, user }) {
      // if (trigger === "update") token.username = session.user.username;

      if (user) {
        token.username = user.username;
        token.token = user.token;
        token.firstName = user.firstName;
        token.roles = user.role;
      }
      return token;
    },

    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          roles: token.roles,
          integrations: token.integrations,
          firstName: token.firstName,
          accessToken: token.token,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
