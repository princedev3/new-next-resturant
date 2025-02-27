"use client";
import { useGetCouponQuery } from "@/apis/_coupon_index.api";
import React from "react";
import CountDownFunc from "./count-down-func";

const CountDown = () => {
  const { data, isLoading } = useGetCouponQuery();

  if (isLoading) {
    return null;
  }
  if (data === undefined || data?.length <= 0) {
    return null;
  }
  const isExpired = new Date() > new Date(data[0].expiryDate);
  if (isExpired) {
    return null;
  }
  return (
    <div className="h-[70px] bg-[#EA6D27] ">
      <CountDownFunc expiryDate={data[0]?.expiryDate} coupon={data[0].code} />
    </div>
  );
};

export default CountDown;
