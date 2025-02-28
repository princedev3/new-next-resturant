import prisma from "@/static/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const findCoupon = await prisma.coupon.findUnique({
      where: {
        code: body.coupon,
      },
    });
    let finalPrice;
    if (findCoupon?.discount) {
      finalPrice = body.price - findCoupon?.discount;
    }

    const orderCreated = await prisma.order.create({
      data: {
        price:
          finalPrice !== null && finalPrice
            ? finalPrice > 0
              ? finalPrice
              : 0
            : body.price,
        products: body.products,
        ...(body.coupon && { coupon: body.coupon }),
        status: "NOT PAID",
        userEmail: body.userEmail,
      },
    });
    return NextResponse.json(orderCreated, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "can not create order" },
      { status: 500 }
    );
  }
};
