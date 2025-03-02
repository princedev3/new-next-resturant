import prisma from "@/static/prisma";
import { NextRequest, NextResponse } from "next/server";
import streamifier from "streamifier";
import { v2 as cloud } from "cloudinary";

type paramsType = {
  params: Promise<{ id: string }>;
};

cloud.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});

export const GET = async (req: NextRequest, { params }: paramsType) => {
  try {
    const { id } = await params;
    const singleProduct = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    return NextResponse.json(singleProduct, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "can not get single product" },
      { status: 500 }
    );
  }
};

export const PUT = async (req: NextRequest, { params }: paramsType) => {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const id = formData.get("id") as string;
    const desc = formData.get("desc") as string;
    const images = formData.get("existingImages");
    const price = Number(formData.get("price"));
    const available = formData.get("available") === "true";
    let files = formData.getAll("newImages") as File[];

    const buffer = files.map(async (item) => {
      return new Promise(async (resolve, reject) => {
        const bytes = Buffer.from(await item.arrayBuffer());

        const stream = cloud.uploader.upload_stream({}, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result?.secure_url as string);
          }
        });
        streamifier.createReadStream(bytes).pipe(stream);
      });
    });
    const newImage = (await Promise.all(buffer)) as string[];
    await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        desc,
        image: [
          ...(Array.isArray(images) ? images : images ? [images] : []),
          ,
          ...newImage,
        ],
        price,
        available,
      },
    });

    return NextResponse.json({ message: "product updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "can not update product" },
      { status: 500 }
    );
  }
};
