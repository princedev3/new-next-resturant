"use client";
import { useGetGalleryQuery } from "@/apis/_gallery_index.api";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Loading from "@/components/loading";

const Gallery = () => {
  const { data, isLoading } = useGetGalleryQuery();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="grid gap-y-3 my-4">
      <h1 className="text-3xl text-gray-600 flex flex-col  flex-none overflow-x-hidden font-semibold w-fit relative">
        Welcome to our new gallery decoration
        <span className="h-[6px] w-[40%] translate-x-0 animate-rebound bg-[#EA6D27] mt-2"></span>
      </h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
        {data &&
          data.length &&
          data.map((item) => (
            <Card className="relative h-[40vh] rounded-lg" key={item.id}>
              <CardContent>
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover  rounded-lg"
                />
                <Badge className="absolute bg-white text-black  text-lg top-2 right-2 z-30">
                  {item.name}{" "}
                </Badge>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Gallery;
