"use client";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="grid lg:grid-cols-[1.2fr_2fr] gap-y-5 my-4 ">
      <div className=" flex flex-col justify-center  gap-y-6 relative mt-[90px] ">
        <Image
          src={"/g1.png"}
          alt=""
          width={60}
          height={60}
          className="object-cover absolute -top-[80px] left-0 lg:-left-8   "
        />
        <div className="grid gap-y-2 ">
          <h1 className="text-4xl font-semibold">We provide the</h1>
          <h1 className="text-4xl font-semibold">best food for you</h1>
        </div>
        <span className="text-base w-[100%]  ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
          similique debitis accusamus repellendus odit earum nostrum rem. Et,
          similique debitis accusamus repellendus odit earum nostrum rem.
        </span>
        <div className="grid grid-flow-col auto-cols-max gap-6">
          <button className="bg-black   text-white px-4 rounded-tl-lg rounded-br-lg cursor-pointer shadow-lg py-2">
            <Link href={"/menu"}> menu</Link>
          </button>
          <button className="bg-[#EA6D27]   text-white px-4 rounded-tl-lg rounded-br-lg cursor-pointer shadow-lg py-2">
            Book a table
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="border p-2 rounded-full flex items-center justify-center">
            <Facebook className="text-gray-600" />
          </div>
          <div className="border p-2 rounded-full flex items-center justify-center">
            <Instagram className="text-gray-600" />
          </div>
          <div className="border p-2 rounded-full flex items-center justify-center">
            <Twitter className="text-gray-600" />
          </div>
          <div className="w-[100px] border " />
        </div>
      </div>
      <div className="relative h-[50vh] lg:h-auto rounded-lg">
        <Image
          src={"/h1.png"}
          alt=""
          fill
          className="object-cover rounded-3xl"
        />
      </div>
    </div>
  );
};

export default Hero;
