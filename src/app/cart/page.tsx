"use client";
import { useCartSore } from "@/static/cartstore";
import Image from "next/image";
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Cart = () => {
  const product = useCartSore((state) => state.products);
  const remove = useCartSore((state) => state.removeFromCart);

  const incrementQuantity = useCartSore((state) => state.incrementQuantity);
  const itemCount = useCartSore((state) => state.totalItems);

  const finalPrice = product.reduce((acc, cur) => acc + cur.price, 0);
  return (
    <div>
      <h1 className="text-center mb-4 text-xl font-semibold">
        Checkout (<span className="text-green-700">{itemCount} items</span>){" "}
      </h1>
      <div className="grid md:grid-flow-col md:grid-cols-[2fr_1.2fr] gap-4 ">
        <div className="grid gap-y-4 self-start ">
          {product.map((item) => (
            <div
              className="border grid grid-flow-col justify-between p-3 rounded-lg"
              key={item.id}
            >
              <div className="grid grid-flow-col auto-cols-max gap-3 ">
                <Image
                  src={item.image[0]}
                  alt=""
                  width={120}
                  height={120}
                  className="object-cover w-[120px] h-[120px] rounded-md"
                />

                <div className="grid gap-[3px] auto-rows-max ">
                  <span className="capitalize font-medium text-lg">
                    {item.name}{" "}
                  </span>
                  <span className="text-lg">quantity: {item.quantity} </span>
                  <div className="">
                    ${" "}
                    <span className="text-green-700 font-semibold">
                      {item.price}
                    </span>{" "}
                  </div>
                  <span
                    className="text-red-600 cursor-pointer"
                    onClick={() => remove(item)}
                  >
                    remove
                  </span>
                </div>
              </div>
              <span className="justify-end text-xl">
                <Plus
                  onClick={() => incrementQuantity(item.id)}
                  className="w-7 h-7 cursor-pointer"
                  size={30}
                />{" "}
              </span>
            </div>
          ))}
        </div>
        <div className="border rounded-lg p-3 self-start grid gap-y-3">
          <h1 className="text-lg font-semibold">Order Summary</h1>
          <div className="grid grid-flow-col justify-between  items-center">
            <span className="w-full">Total Item</span>
            <span className="">{itemCount} </span>
          </div>
          <div className="grid grid-flow-col justify-between  items-center">
            <span className="w-full">Shipping & handling</span>
            <span className="">-</span>
          </div>
          <div className="grid grid-flow-col justify-between  items-center">
            <span className="w-full">Estimated Tax</span>
            <span className="">vax (inclusive) </span>
          </div>
          <Separator className="my-4" />
          <div className="grid grid-flow-col justify-between  items-center">
            <span className="w-full text-red-800 font-medium text-xl">
              Total Purchase
            </span>
            <span className="text-red-800 font-medium text-xl">
              $ {finalPrice}{" "}
            </span>
          </div>
          <Button className="w-full bg-[#EA6D27] hover:bg-[#EA6D27] ">
            Place your order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
