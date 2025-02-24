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
    const available = formData.get("available") === "true";
    const name = formData.get("name") as string;
    const desc = formData.get("desc") as string;
    const price = Number(formData.get("price"));
    let files = formData.getAll("image") as File[];

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

    const image = (await Promise.all(buffer)) as string[];
    await prisma.product.create({
      data: {
        image,
        price,
        desc,
        available,
        name,
      },
    });
    return NextResponse.json({ message: "product created" }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "can not create product" },
      { status: 500 }
    );
  }
};
