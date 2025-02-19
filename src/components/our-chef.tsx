import { Check } from "lucide-react";
import Image from "next/image";
import React from "react";

const OurChef = () => {
  return (
    <div className="grid grid-flow-col md:grid-cols-[1.3fr_1fr] ">
      <div className=" flex flex-col  justify-center items-end  ">
        <div className="  grid gap-y-7">
          <h1 className="capitalize text-3xl font-semibold">
            our expects chefs
          </h1>
          <span className=" text-gray-700 ">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis
            quae illum reiciendis consectetur iusto, ad quis consequuntur
            ratione magnam quos!
          </span>
          <div className="grid sm:grid-cols-2  gap-y-5">
            <div className="grid grid-flow-col gap-2 auto-cols-max  ">
              <div className="w-5 h-5 rounded-full bg-[#EA6D27] flex items-center justify-center">
                <Check className="text-white font-semibold" size={15} />
              </div>
              <span className="text-sm text-gray-700 sm:w-[80%] ">
                Lorem, ipsum dolor sit amet consectetur
              </span>
            </div>
            <div className="grid grid-flow-col gap-2 auto-cols-max  ">
              <div className="w-5 h-5 rounded-full bg-[#EA6D27] flex items-center justify-center">
                <Check className="text-white font-semibold" size={15} />
              </div>
              <span className="text-sm text-gray-700 sm:w-[80%] ">
                Lorem, ipsum dolor sit amet consectetur
              </span>
            </div>
            <div className="grid grid-flow-col gap-2 auto-cols-max  ">
              <div className="w-5 h-5 rounded-full bg-[#EA6D27] flex items-center justify-center">
                <Check className="text-white font-semibold" size={15} />
              </div>
              <span className="text-sm text-gray-700 sm:w-[80%] ">
                Lorem, ipsum dolor sit amet consectetur
              </span>
            </div>
            <div className="grid grid-flow-col gap-2 auto-cols-max  ">
              <div className="w-5 h-5 rounded-full bg-[#EA6D27] flex items-center justify-center">
                <Check className="text-white font-semibold" size={15} />
              </div>
              <span className="text-sm text-gray-700 sm:w-[80%] ">
                Lorem, ipsum dolor sit amet consectetur
              </span>
            </div>
            <div className="grid grid-flow-col gap-2 auto-cols-max  ">
              <div className="w-5 h-5 rounded-full bg-[#EA6D27] flex items-center justify-center">
                <Check className="text-white font-semibold" size={15} />
              </div>
              <span className="text-sm text-gray-700 sm:w-[80%] ">
                Lorem, ipsum dolor sit amet consectetur
              </span>
            </div>
            <div className="grid grid-flow-col gap-2 auto-cols-max  ">
              <div className="w-5 h-5 rounded-full bg-[#EA6D27] flex items-center justify-center">
                <Check className="text-white font-semibold" size={15} />
              </div>
              <span className="text-sm text-gray-700 sm:w-[80%] ">
                Lorem, ipsum dolor sit amet consectetur
              </span>
            </div>
          </div>
          <div className="grid grid-flow-col  auto-cols-max gap-6">
            <button className="bg-black   text-white px-4 rounded-tl-lg rounded-br-lg cursor-pointer shadow-lg py-2">
              menu
            </button>
            <button className="bg-[#EA6D27]   text-white px-4 rounded-tl-lg rounded-br-lg cursor-pointer shadow-lg py-2">
              Book a table
            </button>
          </div>
        </div>
      </div>
      <div className=" md:grid place-content-start hidden  ">
        <Image
          src={"/chef-1.png"}
          alt=""
          width={250}
          height={250}
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default OurChef;
