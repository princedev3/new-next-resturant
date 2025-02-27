"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Marquee from "react-fast-marquee";

const CountDownFunc = ({
  expiryDate,
  coupon,
}: {
  expiryDate: Date;
  coupon: string;
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(
    new Date(expiryDate).getTime() - Date.now()
  );

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(new Date(expiryDate).getTime() - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  if (timeLeft <= 0) return null;

  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coupon);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <Marquee className="w-full">
      <div className=" text-white text-center items-center gap-3 flex p-4 h-full">
        <p className="text-lg font-bold">Apply coupon for purchase over $50</p>
        <p className="text-xl">{`${hours}h ${minutes}m ${seconds}s`}</p>
        <Button
          onClick={handleCopy}
          className=" bg-white  text-[#EA6D27] hover:bg-white hover:scale-105 transition-all duration-700 "
        >
          <span className="">👉</span>
          {coupon}
        </Button>
      </div>
    </Marquee>
  );
};

export default CountDownFunc;
