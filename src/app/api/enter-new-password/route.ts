import { findUserByEmail } from "@/action/get-user-by-email";
import prisma from "@/static/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { password, token } = body;
    const findToken = await prisma.verificationToken.findFirst({
      where: {
        token,
      },
    });
    if (!findToken) {
      return NextResponse.json(
        { message: "can not change password" },
        { status: 500 }
      );
    }
    const findUser = await findUserByEmail(findToken.email);
    if (!findUser) {
      return NextResponse.json(
        { message: "can not change password" },
        { status: 500 }
      );
    }
    const hashPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: {
        id: findUser.id,
      },
      data: {
        password: hashPassword,
      },
    });
    return NextResponse.json(
      { message: "change password successfull" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "can not change password" },
      { status: 500 }
    );
  }
};
