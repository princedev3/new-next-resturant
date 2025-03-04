"use client";
import Autoplay from "embla-carousel-autoplay";
import { carouselData } from "@/static/data";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import StarRating from "@/static/star-rating";
import Subscribe from "./subscribe";

const Customers = () => {
  return (
    <div className=" h-full bg-gray-200 grid gap-y-10  p-4  ">
      <div className="w-[300px] h-[300px] absolute ">
        <Image
          src={"/Group.png"}
          width={200}
          height={200}
          alt=""
          className="object-cover -z-10 "
        />
      </div>
      <div className="grid justify-center items-center gap-y-3">
        <h1 className="capitalize font-bold text-2xl w-full justify-center flex items-center">
          our happy customers
        </h1>
        <span className="text-sm text-gray-800  md:w-[60%]  text-center  mx-auto ">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos eligendi
          natus magnam aspernatur neque laboriosam! Eius voluptatibus temporibus
          esse ullam.
        </span>
      </div>
      <div className="flex items-center justify-center">
        <div className="">
          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="relative grid w-full max-w-4xl overflow-hidden"
          >
            <CarouselContent>
              {carouselData.map((item, index) => (
                <CarouselItem key={index} className="   grid w-full max-w-xl ">
                  <Card className="h-full grid w-full max-w-xl ">
                    <CardContent className="grid  w-full gap-y-3 mx-auto justify-center">
                      <div className="flex w-full flex-col items-center justify-center">
                        <Image
                          src={item.path}
                          width={120}
                          alt=""
                          height={120}
                          className="rounded-full mx-auto object-cover"
                        />
                        <StarRating rating={item.rating} />
                      </div>
                      <span className="text-gray-500 text-center text-[12px] font-semibold w-full">
                        {item.desc}
                      </span>
                      <div className="mx-auto">
                        <h2 className="font-bold text-base text-center text-gray-700">
                          {item.name}{" "}
                        </h2>
                        <h2 className="text-center text-gray-500">
                          {item.position}{" "}
                        </h2>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Customers;
