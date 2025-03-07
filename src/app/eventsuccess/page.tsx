"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  useGetSingleOrderQuery,
  useConfirmPaymentMutation,
} from "@/apis/_event_index.api";
const html2pdf = require("html2pdf.js");

type Event = {
  createdAt: string;
  dob: string;
  gallery: {
    name: string;
  };
  galleryId: string;
  id: string;
  intent_id: string;
  price: number;
  startTime: string;
  status: "PAID" | "NOTPAID";
  stopTime: string;
  user: {
    email: string;
  };
  userId: string;
};

const page = () => {
  const [confirmPayment, { isSuccess }] = useConfirmPaymentMutation();
  const [showSuccess, setShowSuccess] = useState(false);

  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent");

  const { data } = useGetSingleOrderQuery(payment_intent);

  useEffect(() => {
    const updateData = async () => {
      if (payment_intent) {
        await confirmPayment(payment_intent);
      }
    };
    updateData();
  }, [payment_intent]);

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  }, [isSuccess]);

  const handlePdf = () => {
    const element = document.querySelector("#invoice");
    html2pdf(element, {
      margin: 20,
    });
  };

  return (
    <div className="relative my-4">
      <div className="grid gap-y-4" id="invoice">
        <div className="" data-html2canvas-ignore>
          <Button
            onClick={handlePdf}
            className="w-full py-5 bg-[#EA6D27] hover:bg-[#EA6D27]"
          >
            Download Reciept
          </Button>
        </div>
        <div
          style={{ gridTemplateColumns: "auto minmax(auto,1fr)" }}
          className="grid gap-x-6 gap-y-2"
        >
          <span className="font-semibold">Purchase ID</span>
          <span className="font-light motion-text-in-gray-700 text-sm">
            {data?.id}{" "}
          </span>
          <span className="font-semibold">Customer Email</span>
          <span className="font-light motion-text-in-gray-700 text-sm">
            {data?.user.email}{" "}
          </span>
          <span className="font-semibold">Total Price</span>
          <span className="font-light motion-text-in-gray-700 text-sm">
            $ {data?.price}{" "}
          </span>

          <span className="font-semibold">Purchase status</span>
          <span className="font-light motion-text-in-gray-700 text-sm">
            {data?.status}{" "}
          </span>
          <span className="font-semibold">Purchase Date</span>
          <span className="font-light motion-text-in-gray-700 text-sm">
            {data?.createdAt
              ? format(new Date(data.createdAt), "yyyy-MM-dd")
              : "N/A"}
          </span>
        </div>
        <div className="">
          <span className="font-semibold">Booking receipt</span>
          <div className="">
            <div className="">
              <table className="w-full border-collapse border border-gray-300 table-fixed -z-0">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border hidden md:table-cell  border-gray-300 px-4 py-2  text-center capitalize">
                      Hall
                    </th>
                    <th className="border lg:table-cell border-gray-300 px-4 py-2  text-center capitalize">
                      Date
                    </th>
                    <th className="border  border-gray-300 px-4 py-2  text-center capitalize">
                      Price
                    </th>
                    <th className="border  border-gray-300 px-4 py-2  text-center capitalize">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-100 group">
                    <td className="border hidden md:table-cell border-gray-300 px-4 py-2 whitespace-nowrap text-center">
                      {data?.gallery?.name}
                    </td>
                    <td className="border  lg:table-cell border-gray-300 px-4 py-2 whitespace-nowrap text-center">
                      {data?.dob && format(new Date(data?.dob), "yyyy-MM-dd")}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-center">
                      {data?.price}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-center">
                      {data?.startTime
                        ? format(parseISO(data.startTime), "HH:mm")
                        : "Invalid Time"}{" "}
                      -{" "}
                      {data?.stopTime
                        ? format(parseISO(data?.stopTime), "HH:mm")
                        : "Invalid Time"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {showSuccess && (
        <div
          className={`bg-black bg-opacity-50 z-40 fixed top-0 left-0 w-full h-full grid place-items-center transition-all overflow-hidden 
             opacity-100 visible
            `}
        >
          <div
            className={`bg-white w-full grid max-w-xl max-h-[80vh] rounded-lg shadow-lg relative overflow-hidden`}
          >
            <div className="text-center justify-center items-center flex flex-col my-10 p-6 ">
              <h1 className="text-[#EA6D27]  uppercase mb-5 font-semibold">
                thank you for your Booking
              </h1>
              <span className="text-[#EA6D27] ">
                Please <b className="text-xl ">do not</b> close page while we
                process your order
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
