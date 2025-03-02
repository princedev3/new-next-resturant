import prisma from "@/static/prisma";
import { NextRequest, NextResponse } from "next/server";

type paramsType = {
  params: Promise<{ id: string }>;
};

export const PUT = async (req: NextRequest, { params }: paramsType) => {
  try {
    const { id } = await params;
    const order = await prisma.order.update({
      where: {
        id,
      },
      data: {
        active: "NOTACTIVE",
      },
    });

    return NextResponse.json({ message: "user archived", status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "can not get all users", status: 500 });
  }
};
