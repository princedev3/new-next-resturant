"use server";
import bcrypt from "bcryptjs";
import { findUserByEmail } from "@/action/get-user-by-email";
import { RegisterSchema } from "@/static/schema";
import { NextRequest, NextResponse } from "next/server";
import { generateVerificationToken } from "@/action/generate-verification-token ";
import { sendVerificationEmail } from "@/static/mail";
import prisma from "@/static/prisma";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const body = await req.json();
    const validatedFields = RegisterSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { message: "details not correct" },
        { status: 500 }
      );
    }
    const { name, email, password } = validatedFields.data;
    const existingUser = await findUserByEmail(email);
    const hashedPassword = await bcrypt.hash(password, 10);

    if (existingUser) {
      return NextResponse.json(
        { message: "user already exist" },
        { status: 500 }
      );
    }
    await prisma.user.create({
      data: {
        password: hashedPassword,
        email,
        name,
      },
    });
    const token = await generateVerificationToken(email);
    await sendVerificationEmail(token.email, token.token);
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Cannot create" }, { status: 500 });
  }
};
