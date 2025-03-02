import prisma from "@/static/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const pageNumber = parseInt(
      req.nextUrl.searchParams.get("page") || "1",
      10
    );
    const POST_PER_PAGE = 5;

    const [orders, count] = await prisma.$transaction([
      prisma.order.findMany({
        where: {
          active: "ACTIVE",
          status: "payment successful, processing order",
        },
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * (pageNumber - 1),
      }),
      prisma.order.count(),
    ]);

    return NextResponse.json({ orders, count, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      massage: "can not get all orders",
      status: 500,
    });
  }
};
