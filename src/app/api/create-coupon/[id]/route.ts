import prisma from "@/static/prisma";
import { NextRequest, NextResponse } from "next/server";

type CouponType = {
  params: Promise<{ id: string }>;
};
export const DELETE = async (req: NextRequest, { params }: CouponType) => {
  try {
    const id = (await params).id;
    await prisma.coupon.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(
      { message: "coupon deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "can not delete coupon" },
      { status: 500 }
    );
  }
};
