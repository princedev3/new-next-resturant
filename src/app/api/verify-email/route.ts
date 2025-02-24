"use server";
import { generateVerificationToken } from "@/action/generate-verification-token ";
import { findUserByEmail } from "@/action/get-user-by-email";
import { sendVerificationEmail } from "@/static/mail";
import prisma from "@/static/prisma";
import { emailVerification } from "@/static/schema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const tokenValue = await req.json();
    const validatedFields = emailVerification.safeParse(tokenValue);
    if (validatedFields.error) {
      return NextResponse.json({
        message: "can not verify token",
        status: 500,
      });
    }
    const { token } = validatedFields.data;
    const existingToken = await prisma.verificationToken.findFirst({
      where: {
        token,
      },
    });

    if (!existingToken) {
      return NextResponse.json({
        message: "can not verify token",
        status: 500,
      });
    }
    if (new Date(existingToken.expires) < new Date()) {
      const token = await generateVerificationToken(existingToken.email);
      await sendVerificationEmail(token.email, token.token);
      return NextResponse.json({
        message: "new token sent",
        status: 200,
      });
    }

    const findUser = await findUserByEmail(existingToken.email);
    if (!findUser) {
      return NextResponse.json({
        message: "can not verify email",
        status: 500,
      });
    }
    await prisma.user.update({
      where: {
        id: findUser.id,
      },
      data: {
        emailVerified: new Date(),
      },
    });

    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
    return NextResponse.json({ message: "email verifield" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "can not verify email", status: 500 });
  }
};
