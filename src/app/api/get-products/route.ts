import prisma from "@/static/prisma";
import { NextRequest, NextResponse } from "next/server";
import streamifier from "streamifier";
import { v2 as cloud } from "cloudinary";

cloud.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});

export const GET = async (req: NextRequest) => {
  try {
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const POST_PER_PAGE = 10;
    const [allProducts, count] = await prisma.$transaction([
      prisma.product.findMany({
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * (page - 1),
      }),
      prisma.product.count(),
    ]);

    return NextResponse.json({ allProducts, count, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "can not get all product" },
      { status: 500 }
    );
  }
};

export const PUT = async (req: NextRequest) => {
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
    if (id) {
      await prisma.product.update({
        where: {
          id,
        },
        data: {
          name,
          desc,
          image: [
            ...(Array.isArray(images) ? images : []),
            ...(Array.isArray(newImage) ? newImage : []),
          ],
          price,
          available,
        },
      });
    }

    return NextResponse.json({ message: "product updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "can not update product" },
      { status: 500 }
    );
  }
};
