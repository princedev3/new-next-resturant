import prisma from "@/static/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        active: "ACTIVE",
      },
    });

    return NextResponse.json({ users, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "can not get all users", status: 500 });
  }
};
