import { auth } from "@/auth";
import prisma from "@/static/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const session = await auth();
    const body = await req.json();
    if (!body) {
      return NextResponse.json({
        message: "Invalid request body",
        status: 400,
      });
    }
    if(!session){
      return NextResponse.json({
        message: "you have to login",
        status: 400,
      });
    }
    const { dob, startTime, endTime, price, gallery } = body;
    if (!dob || !startTime || !endTime || !price || !gallery) {
      return NextResponse.json({
        message: "Missing required fields",
        status: 400,
      });
    }
    const startDateTime = new Date(`${dob.split("T")[0]}T${startTime}:00.000Z`);
    const endDateTime = new Date(`${dob.split("T")[0]}T${endTime}:00.000Z`);
    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
      return NextResponse.json({ message: "Invalid date format", status: 400 });
    }
    const existingBooking = await prisma.event.findFirst({
      where: {
        galleryId: gallery,
        dob: {
          equals: new Date(dob),
        },
        OR: [
          {
            startTime: {
              lte: endDateTime,
            },
            stopTime: {
              gte: startDateTime,
            },
          },
          {
            startTime: {
              lte: endDateTime,
            },
            stopTime: {
              gte: startDateTime,
            },
          },
        ],
      },
    });
    if (existingBooking) {
      return NextResponse.json({ message: "time already booked", status: 500 });
    }

    const resData = await prisma.event.create({
      data: {
        startTime: startDateTime as Date,
        stopTime: endDateTime as Date,
        price,
        dob: dob as Date,
        userId: session?.user?.id as string,
        galleryId: gallery,
      },
    });

    return NextResponse.json({ resData, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "can not create order", status: 500 });
  }
};
