import { generateVerificationToken } from "@/action/generate-verification-token ";
import { findUserByEmail } from "@/action/get-user-by-email";
import { sendPasswordResetEmail } from "@/static/mail";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email } = body;
    if (typeof email !== "string" || !email) {
      return NextResponse.json(
        { message: "can not generate token for reset password" },
        { status: 500 }
      );
    }
    const existingUser = await findUserByEmail(email);
    if (!existingUser) {
      return NextResponse.json(
        { message: "can not generate token for reset password" },
        { status: 500 }
      );
    }
    const token = await generateVerificationToken(email);
    await sendPasswordResetEmail(token.email, token.token);
    return NextResponse.json(
      { message: "sent generated token for reset password" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "can not generate token for reset password" },
      { status: 500 }
    );
  }
};
