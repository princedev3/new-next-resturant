"use client";
import Image from "next/image";
import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Separator } from "./ui/separator";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="grid gap-y-10 relative">
      <div className="w-[400px] h-[400px] absolute -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2  bg-[url('/Group.png')] bg-cover  bg-no-repeat -z-0" />
      {/* top */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
        <div className="self-start grid gap-y-3 z-20">
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              width={120}
              height={120}
              alt=""
              className="object-cover"
            />
          </Link>
          <span className="text-gray-600 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore .Learn more
          </span>
        </div>
        <div className="grid gap-y-4 self-start z-20">
          <span className="text-black text-lg font-semibold uppercase">
            Navigation
          </span>
          <Link href={"/menu"} className="text-gray-600 text-sm cursor-pointer">
            Menu
          </Link>
          <Link
            href={"/about"}
            className="text-gray-600 text-sm cursor-pointer"
          >
            About us{" "}
          </Link>
          <Link
            href={"/contact"}
            className="text-gray-600 text-sm cursor-pointer"
          >
            Contact us{" "}
          </Link>
          <Link href={"/menu"} className="text-gray-600 text-sm cursor-pointer">
            Main dishes
          </Link>
        </div>
        <div className="grid gap-y-4 self-start z-20">
          <span className="text-black text-lg font-semibold uppercase">
            dishes
          </span>
          <span className="text-gray-600 text-sm cursor-pointer">
            Fish & Viggies{" "}
          </span>
          <span className="text-gray-600 text-sm cursor-pointer">
            Tofu Chili{" "}
          </span>
          <span className="text-gray-600 text-sm cursor-pointer">
            Egg & Cocumber
          </span>
          <span className="text-gray-600 text-sm cursor-pointer">
            {" "}
            Lumpia w/Suace
          </span>
        </div>
        <div className="grid gap-y-5 self-start z-20">
          <span className="text-black text-lg font-semibold uppercase">
            FOLLOW US
          </span>
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
          </div>
        </div>
      </div>
      {/* middle */}
      <div className="grid gap-y-3">
        <h1 className="">OPENING HOURS</h1>
        <div className="grid  grid-flow-col auto-cols-max gap-8">
          <div className="self-start grid gap-y-3">
            <span className="">Monday - Saturday </span>
            <span className=""> 8:00 am to 9:00 pm</span>
          </div>
          <div className="self-start grid gap-y-3">
            <span className="">Sunday </span>
            <span className="">CLOSED</span>
          </div>
        </div>
      </div>
      <Separator />
      {/* down */}
      <div className="grid gap-y-4 sm:grid-flow-col">
        <div className="">
          <span className="text-gray-600 text-sm">
            &copy; 2025 Restaurants. All Right Reserved. Designed by Prince
          </span>
        </div>
        <div className="grid grid-flow-col auto-cols-max gap-5 sm:justify-end">
          <span className="text-gray-600 text-sm">Terms of Service</span>
          <span className="text-gray-600 text-sm">Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
