"use client";
import { dishData } from "@/static/data";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const SpecialDish = () => {
  const [selected, setSelected] = useState(0);
  return (
    <div className="h-full bg-gray-200 p-8 ">
      <div className="grid grid-flow-col justify-center  gap-5">
        <Image
          src={"/f2.png"}
          alt=""
          width={100}
          height={100}
          className="object-cover"
        />
        <div className="flex items-center flex-col justify-center ">
          <h1 className="text-3xl font-semibold text-center">
            Our Special Dishes
          </h1>
          <span className="text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt
          </span>
        </div>
        <Image
          src={"/f3.png"}
          alt=""
          width={100}
          height={60}
          className="object-cover"
        />
      </div>
      <div className="grid sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10  mx-auto gap-y-20 gap-x-6 relative">
        {dishData.map((item, index) => (
          <div
            key={item.title}
            className={`${
              selected === index
            } relative grid justify-center items-center`}
          >
            <Image
              src={item.path}
              alt=""
              width={150}
              height={150}
              className="object-cover mx-auto absolute left-1/2 -translate-x-1/2 -top-[20%] z-10"
            />
            {/* round absolute left-1/2 -translate-x-1/2 top-1/2  */}
            <div
              onClick={() => setSelected(index)}
              className={`${
                selected === index ? "bg-white " : ""
              }  w-[250px] border-white border rounded-tl-[40px] rounded-tr-lg rounded-bl-lg rounded-br-[40px] h-[250px] z-0 flex flex-col items-center  justify-center mt-6 gap-2`}
            >
              <h2 className="text-lg font-semibold">{item.title} </h2>
              <span className=" text-center">{item.desc} </span>
            </div>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-y-10  mt-10 p-2">
        <div className="grid place-content-center relative">
          <Image
            src={"/d6.png"}
            alt=""
            width={400}
            height={400}
            className="object-cover"
          />
        </div>
        <div className="grid place-content-center justify-center items-center mx-auto w-full  gap-4">
          <h1 className="font-semibold text-2xl capitalize">
            welcome to our resturant
          </h1>
          <span className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
            possimus perferendis ipsum laudantium quod. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Labore possimus perferendis ipsum
            laudantium quod. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Labore possimus perferendis ipsum laudantium quod.
          </span>
          <div className="grid grid-flow-col auto-cols-max gap-6">
            <button className="bg-black   text-white px-4 rounded-tl-lg rounded-br-lg cursor-pointer shadow-lg py-2">
              <Link href={"/menu"}> menu</Link>
            </button>
            <button className="bg-[#EA6D27]   text-white px-4 rounded-tl-lg rounded-br-lg cursor-pointer shadow-lg py-2">
              <Link href={"/events"}>Book a table</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialDish;
