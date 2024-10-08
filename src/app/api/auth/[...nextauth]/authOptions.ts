import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/libs/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),

    CredentialsProvider({
      credentials: {
        password: {
          label: "Password",
          type: "password",
        },
        username: {
          label: "username",
          type: "text",
          placeholder: "Username",
        },
      },

      async authorize(credentials) {
        try {
          const res = await axios.post(
            `/auth/login`,
            {
              password: credentials?.password,
              username: credentials?.username,
            },
            {
              headers: {
                // "x-api-key": `Key ${API_KEY}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          );

          return res.data; // Return the user data if successful
        } catch (err: any) {
          if (err.response?.status === 401) {
            throw new Error("CredentialsSignin"); // Specific error for client-side handling
          }
          throw new Error("An error occurred during authentication.");
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  // pages: {
  //   signIn: "/signin",
  // },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.accessToken = token.data.token;
      // const decoded = decodeJwt(session.user.accessToken);
      // session.user.decoded = decoded;
      // session.user.username = decoded?.AdminRole;
      session.user.role = "USer";
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) token.id = user.id;

      return { ...token, ...user };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
