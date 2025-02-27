"use client";
import { Product } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCartSore } from "@/static/cartstore";

const MenuCard = ({ item }: { item: Product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const addToCart = useCartSore((state) => state.addToCart);

  // useEffect(() => {
  //   if (!item?.image || item.image.length <= 1) return;
  //   const changeImage = setInterval(() => {
  //     setCurrentImageIndex((prev) =>
  //       prev === item.image.length - 1 ? 0 : prev + 1
  //     );
  //   }, 5000);
  //   return () => clearInterval(changeImage);
  // }, [item.image]);

  const handleAddToCart = async (item: Product) => {
    addToCart({
      ...item,
      quantity: 1,
    });
  };
  return (
    <Card className="">
      <CardContent className="p-4 grid  mx-auto items-center gap-2 w-full group ">
        <Image
          src={item?.image[0]}
          alt=""
          className="object-cover group-hover:rotate-12 transition-all duration-700 w-[100px] justify-center grid mx-auto h-[100px] rounded-full border "
          width={100}
          height={100}
        />
        {/* <div className=" w-full grid gap-3"> */}
        <span className="text-base capitalize text-center text-gray-700">
          {item.name}{" "}
        </span>
        <span className="text-base capitalize text-center text-gray-700">
          $ {item.price}{" "}
        </span>
        <span className="text-sm capitalize text-center text-gray-700">
          {item.available === true ? "in store" : "not in store"}{" "}
        </span>
        <Button
          onClick={() => handleAddToCart(item)}
          className="motion-preset-slide-right motion-duration-75"
        >
          add to cart
        </Button>
        {/* </div> */}
      </CardContent>
    </Card>
  );
};

export default MenuCard;
