import prisma from "@/static/prisma";
import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

type paramsType = {
  params: Promise<{ id: string }>;
};

export const POST = async (req: NextRequest, { params }: paramsType) => {
  try {
    const { id } = await params;
    const getOrder = await prisma.event.findUnique({
      where: {
        id,
      },
    });

    if (!getOrder) {
      return NextResponse.json(
        { message: "intent id not created" },
        { status: 500 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: getOrder.price * 100,
      currency: "USD",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const pd = await prisma.event.update({
      where: { id: getOrder.id },
      data: {
        intent_id: paymentIntent.id,
      },
    });

    return NextResponse.json(
      { client_secret: paymentIntent.client_secret },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "intent id not created" },
      { status: 500 }
    );
  }
};

export const PUT = async (req: NextRequest, { params }: paramsType) => {
  try {
    const { id } = await params;

    const findOrder = await prisma.event.findUnique({
      where: {
        intent_id: id,
      },
    });

    if (!findOrder) {
      return NextResponse.json(
        { message: "intent id not order" },
        { status: 500 }
      );
    }
    await prisma.event.update({
      where: {
        id: findOrder.id,
      },
      data: {
        status: "PAID",
      },
    });
    return NextResponse.json(
      { message: "payment successful" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "intent id not found" },
      { status: 500 }
    );
  }
};
export const GET = async (req: NextRequest, { params }: paramsType) => {
  try {
    const { id } = await params;
    console.log(id);
    const findOrder = await prisma.event.findUnique({
      where: {
        intent_id: id,
      },
      include: {
        gallery: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!findOrder) {
      return NextResponse.json(
        { message: "intent id not found" },
        { status: 500 }
      );
    }

    return NextResponse.json(findOrder, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "intent id not order" },
      { status: 500 }
    );
  }
};
