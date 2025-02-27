import NextAuth from "next-auth";
import { findUserById } from "./action/find-user-byId";
import { PrismaClient, UserRole } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import authConfig from "./auth.config";
import { findUserByEmail } from "./action/get-user-by-email";
// import prisma from "./static/prisma";
const prisma = new PrismaClient();
export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) return false;

      if (account?.provider === "google") {
        let existingUser = await findUserByEmail(user.email);

        if (!existingUser) {
          // await prisma.user.create({
          //   data: {
          //     // name: user.name || profile?.name,
          //     email: user.email,
          //     image: user.image || profile?.picture || "",
          //   },
          // });
        }
        return true;
      }

      if (account?.provider !== "credentials") return true;
      if (!user.id) return false;
      const existingUser = await findUserById(user?.id);
      if (!existingUser?.emailVerified) return false;
      const expiration = Math.floor(Date.now() / 1000) + 12 * 60 * 60;
      user.customExpiration = expiration;
      return true;
    },
    async jwt({ user, token }) {
      if (!token.sub) return token;
      const existingUser = await findUserById(token.sub);
      if (!existingUser) return token;

      // Always set role and expiration, not just when user.customExpiration exists
      token.role = existingUser.role;
      token.expiration =
        token.expiration || Math.floor(Date.now() / 1000) + 12 * 60 * 60; // Set default expiration
      return token;
      // if (!token.sub) return token;

      // const existingUser = await findUserById(token.sub);
      // if (!existingUser) return token;
      // if (user?.customExpiration) {
      //   token.role = existingUser.role;
      //   token.expiration = user.customExpiration;
      // }

      // return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
        session.user.customExpiration = token?.expiration as number;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  ...authConfig,
});

// console.log("session ", session);
// console.log("token-sub ", token.sub);

// console.log("token.role ", token.role);   console.log("final session ", session);
