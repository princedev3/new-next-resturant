"use server";

import { LoginSchema } from "@/static/schema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { findUserByEmail } from "@/action/get-user-by-email";
import { signIn } from "@/auth";
import { generateVerificationToken } from "@/action/generate-verification-token ";
import { sendVerificationEmail } from "@/static/mail";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const body = await req.json();
    const validatedFields = LoginSchema.safeParse(body);
    if (validatedFields.error) {
      return NextResponse.json({ message: "can not login" }, { status: 500 });
    }
    const { email, password } = validatedFields.data;
    const isUserExist = await findUserByEmail(email);
    if (!isUserExist) {
      return NextResponse.json(
        { message: "user does not exist" },
        { status: 500 }
      );
    }
    if (!isUserExist.emailVerified) {
      const token = await generateVerificationToken(email);
      await sendVerificationEmail(token.email, token.token);
      return NextResponse.json(
        { message: "verification email sent" },
        { status: 200 }
      );
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserExist.password
    );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "user does not exist" },
        { status: 500 }
      );
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return NextResponse.json(
      { message: " login successfull" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "can not login" }, { status: 500 });
  }
};
