import prisma from "@/static/prisma";
import { NextRequest, NextResponse } from "next/server";
import { subDays, startOfDay, endOfDay } from "date-fns";

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
      finalPrice =
        body.price >= 50 ? body.price - findCoupon?.discount : body.price;
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

export const GET = async (req: NextRequest) => {
  try {
    const sevenDaysAgo = subDays(new Date(), 7);
    const sales = await prisma.order.groupBy({
      by: ["createdAt"],
      where: {
        createdAt: {
          gte: startOfDay(sevenDaysAgo),
          lte: endOfDay(new Date()),
        },
        status: "payment successful, processing order",
      },
      _sum: {
        price: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const salesGrouped = sales.reduce<Record<string, number>>((acc, sale) => {
      const date = sale.createdAt.toISOString().split("T")[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += sale._sum?.price as number;
      return acc;
    }, {});

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), i);
      const formattedDate = date.toISOString().split("T")[0];

      return {
        date: formattedDate,
        totalSales: salesGrouped[formattedDate] || 0,
      };
    }).reverse();

    return NextResponse.json({ last7Days, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "can not create order" },
      { status: 500 }
    );
  }
};
