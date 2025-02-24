import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { LoginSchema } from "./static/schema";
import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import { findUserByEmail } from "./action/get-user-by-email";

export default {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_Client_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_Client_SECRET as string,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await findUserByEmail(email);
          if (!user || !user.password) return null;
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
