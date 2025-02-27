import prisma from "@/static/prisma";
import { NextRequest, NextResponse } from "next/server";

const generateCouponCode = (length = 6) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let coupon = "";
  for (let i = 0; i < length; i++) {
    coupon += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return coupon;
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    if (!body.discount || !body.desc) {
      return NextResponse.json(
        { message: "can not create coupon" },
        { status: 500 }
      );
    }
    if (typeof body.discount !== "number" || typeof body.desc !== "string") {
      return NextResponse.json(
        { message: "can not create coupon" },
        { status: 500 }
      );
    }

    const exsistingCoupon = await prisma.coupon.findMany();

    if (exsistingCoupon.length > 0) {
      return NextResponse.json(
        { message: "can only create one coupoun at a time" },
        { status: 500 }
      );
    }
    const code = generateCouponCode(6);

    await prisma.coupon.create({
      data: {
        code,
        desc: body.desc,
        discount: body.discount,
        expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    });
    return NextResponse.json(
      { message: "coupon created  successfully " },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "can not create coupon" },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const coupon = await prisma.coupon.findMany();
    return NextResponse.json(coupon, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "can not get coupon" },
      { status: 500 }
    );
  }
};
