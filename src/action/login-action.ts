"use server";

import { LoginSchema } from "@/static/schema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { findUserByEmail } from "@/action/get-user-by-email";
import { signIn } from "@/auth";
import { generateVerificationToken } from "@/action/generate-verification-token ";
import { sendVerificationEmail } from "@/static/mail";
import { z } from "zod";
import { AuthError } from "next-auth";

export const loginAction = async (body: z.infer<typeof LoginSchema>) => {
  try {
    const validatedFields = LoginSchema.safeParse(body);
    if (validatedFields.error) {
      return NextResponse.json({ message: "Can not login" }, { status: 400 });
    }

    const { email, password } = validatedFields.data;
    const isUserExist = await findUserByEmail(email);

    if (!isUserExist) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 }
      );
    }

    if (!isUserExist.emailVerified) {
      const token = await generateVerificationToken(email);
      await sendVerificationEmail(token.email, token.token);
      return NextResponse.json(
        { message: "Verification email sent" },
        { status: 200 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserExist.password
    );

    if (!isPasswordCorrect) {
      return { message: "Invalid password", status: 500 };
    }

    const redirectTo = isUserExist.role === "ADMIN" ? "/admin" : "/";

    await signIn("credentials", {
      email,
      password,
      redirectTo,
    });

    return NextResponse.json({ message: "login", status: 200 });
  } catch (error) {
    console.error(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credential!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
