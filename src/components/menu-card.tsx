"use client";
import { Product } from "@prisma/client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCartSore } from "@/static/cartstore";

const MenuCard = ({ item }: { item: Product }) => {
  const addToCart = useCartSore((state) => state.addToCart);

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
          disabled={!item.available}
          onClick={() => handleAddToCart(item)}
          className="motion-preset-slide-right motion-duration-75"
        >
          {!item.available ? "re-stocking" : " add to cart"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MenuCard;
