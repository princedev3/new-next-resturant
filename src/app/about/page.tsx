"use client";
import AboutPage from "@/components/about-page";
import React from "react";

const About = () => {
  return (
    <div className="mb-3">
      <div className=" mb-3 flex items-center justify-center  ">
        <h1 className="text-center text-2xl flex flex-col  flex-none font-semibold overflow-x-hidden w-fit relative">
          About-Us
          <span className="h-[4px] w-[40%] translate-x-0 animate-rebound bg-[#EA6D27] "></span>
        </h1>
      </div>
      <div className="grid  mb-5">
        <h1 className="text-lg font-semibold text-gray-800">Who we are?</h1>
        <p className="text-gray-700 text-sm">
          <b className="text-xl">L</b> orem ipsum dolor sit, amet consectetur
          adipisicing elit. Minus omnis dolore, eaque dolores delectus
          recusandae, velit sequi sunt porro similique ad, repellendus neque
          iure aut mollitia quas molestiae molestias error?
        </p>
      </div>
      <div className="grid mb-5">
        <h1 className="text-lg font-semibold text-gray-800">What we do?</h1>
        <p className="text-gray-700 text-sm">
          <b className="text-xl">L</b> orem ipsum dolor sit, amet consectetur
          adipisicing elit. Minus omnis dolore, eaque dolores delectus
          recusandae, velit sequi sunt porro similique ad, repellendus neque
          iure aut mollitia quas molestiae molestias error?
        </p>
      </div>

      <AboutPage />
    </div>
  );
};

export default About;
