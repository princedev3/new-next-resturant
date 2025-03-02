"use client";
import { menuData } from "@/static/data";
import { AlignJustify } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCartSore } from "@/static/cartstore";
import { useSessionStore } from "@/sessions/auth-session";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const totalItems = useCartSore((state) => state.totalItems);
  const sesssion = useSessionStore((state) => state.session);
  const pathName = usePathname();
  const isAdminRoute = pathName.startsWith("/admin");
  useEffect(() => {
    useCartSore.persist.rehydrate();
  }, []);

  return (
    <div className="h-[100px] w-full grid items-center grid-flow-col px-2 xl:px-0 ">
      <div className=" grid items-center h-full ">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            width={150}
            height={150}
            alt=""
            className="object-cover cursor-pointer mb-2"
          />
        </Link>
      </div>
      <div className=" md:grid justify-center  items-center grid-flow-col gap-5 hidden h-full overflow-hidden">
        {menuData.map((item) => (
          <div key={item.title} className={``}>
            <Link
              href={item.path}
              className={`${
                pathName === item.path ? "text-[#EA6D27] " : ""
              }  cursor-pointer capitalize`}
            >
              {" "}
              {item.title}
            </Link>
          </div>
        ))}
        {sesssion?.user?.role === "ADMIN" && (
          <Link
            href={"/admin"}
            className={`${
              isAdminRoute ? "text-[#EA6D27] " : ""
            } cursor-pointer capitalize`}
          >
            {" "}
            admin
          </Link>
        )}
      </div>
      <div className=" grid grid-flow-col gap-2 justify-end items-center h-full ">
        <Link href={"/cart"}>
          <button className="bg-[#EA6D27] relative text-center  md:inline-block  text-white px-4 rounded-tl-lg rounded-br-lg cursor-pointer shadow-lg py-2">
            <ShoppingCart />
            <span className="absolute top-0 right-1 w-5 h-5 bg-white rounded-full text-[#EA6D27] flex items-center justify-center">
              {totalItems}
            </span>
          </button>
        </Link>

        <AlignJustify
          onClick={() => setOpen(!open)}
          size={30}
          className={`${
            open ? "text-white" : "text-black"
          } md:hidden cursor-pointer z-50`}
        />
        {
          <div
            className={`${
              open
                ? "bg-gray-900/70 backdrop-blur md:hidden w-full h-full fixed top-0 left-0"
                : ""
            } z-40`}
          >
            <div
              className={`${
                open
                  ? "md:hidden w-full h-full fixed top-0 left-0 bg-[#EA6D27]  ease-in duration-500 transition-all"
                  : "-left-[100%] ease-in duration-500 transition-all w-full h-full fixed top-0 "
              } `}
            >
              <div className="flex flex-col gap-5 items-center justify-center gap-y-5  h-full ">
                {menuData.map((item) => (
                  <div
                    key={item.title}
                    className=" grid gap-5 items-center justify-center"
                  >
                    <Link
                      href={item.path}
                      onClick={() => setOpen(false)}
                      className="cursor-pointer  text-white font-semibold text-xl"
                    >
                      {" "}
                      {item.title[0].toUpperCase() + item.title.slice(1)}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default Navbar;
