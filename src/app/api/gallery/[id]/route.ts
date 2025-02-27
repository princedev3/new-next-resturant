import prisma from "@/static/prisma";
import { NextRequest, NextResponse } from "next/server";
type Params = {
  params: Promise<{ id: string }>;
};
export const DELETE = async (req: NextRequest, { params }: Params) => {
  try {
    const { id } = await params;
    await prisma.gallery.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ message: "gallery deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "can not delete gallery" },
      { status: 500 }
    );
  }
};
