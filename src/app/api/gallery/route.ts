import { NextRequest, NextResponse } from "next/server";
import streamifier from "streamifier";
import { v2 as cloud } from "cloudinary";
import prisma from "@/static/prisma";

cloud.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const file = formData.get("image") as File;

    const bytes = Buffer.from(await file.arrayBuffer());
    const uploadImage = () => {
      return new Promise<string>((resolve, reject) => {
        const stream = cloud.uploader.upload_stream({}, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result?.secure_url as string);
          }
        });
        streamifier.createReadStream(bytes).pipe(stream);
      });
    };
    const image = await uploadImage();
    await prisma.gallery.create({
      data: {
        name,
        image,
      },
    });
    return NextResponse.json({ message: "gallery created" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "can not create gallery" },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const allGallery = await prisma.gallery.findMany();
    return NextResponse.json(allGallery, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "can not get gallery" },
      { status: 500 }
    );
  }
};
