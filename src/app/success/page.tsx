"use client";
import {
  useConfirmPaymentMutation,
  useGetSingleOrderQuery,
} from "@/apis/_order_index.api";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Product } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useCartSore } from "@/static/cartstore";
const html2pdf = require("html2pdf.js");

const page = () => {
  const [confirmPayment, { isSuccess }] = useConfirmPaymentMutation();
  const [showSuccess, setShowSuccess] = useState(false);
  const clearCart = useCartSore((state) => state.clearCart);

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
      clearCart();
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

  useEffect(() => {
    useCartSore.persist.rehydrate();
  }, []);
  return (
    <div className="relative my-4">
      <div className="grid gap-y-4" id="invoice">
        <div className="" data-html2canvas-ignore>
          <Button
            onClick={handlePdf}
            className="w-full bg-[#EA6D27] hover:bg-[#EA6D27]"
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
            {data?.userEmail}{" "}
          </span>
          <span className="font-semibold">Total Price</span>
          <span className="font-light motion-text-in-gray-700 text-sm">
            $ {data?.price}{" "}
          </span>
          {(data?.coupon !== undefined || data?.coupon !== null) && (
            <>
              <span className="font-semibold">Purchase discount</span>
              <span className="font-light motion-text-in-gray-700 text-sm">
                {data?.coupon}{" "}
              </span>
            </>
          )}
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
          <span className="font-semibold">Purchase Items</span>
          <div className="">
            <div className="">
              <table className="w-full border-collapse border border-gray-300 table-fixed">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border hidden md:table-cell  border-gray-300 px-4 py-2  text-center capitalize">
                      ID
                    </th>
                    <th className="border lg:table-cell border-gray-300 px-4 py-2  text-center capitalize">
                      Name
                    </th>
                    <th className="border  border-gray-300 px-4 py-2  text-center capitalize">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data?.products?.length > 0 &&
                    data?.products?.map((item: Product) => (
                      <tr className="hover:bg-gray-100 group" key={item.id}>
                        <td className="border hidden md:table-cell border-gray-300 px-4 py-2 whitespace-nowrap text-center">
                          {item?.id}
                        </td>
                        <td className="border  lg:table-cell border-gray-300 px-4 py-2 whitespace-nowrap text-center">
                          {item?.name}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-center">
                          {item?.price}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {showSuccess && (
        <div
          className={`bg-black bg-opacity-50 z-20 fixed top-0 left-0 w-full h-full grid place-items-center transition-all overflow-hidden 
             opacity-100 visible
            `}
        >
          <div
            className={`bg-white w-full grid max-w-xl max-h-[80vh] rounded-lg shadow-lg relative overflow-hidden`}
          >
            <div className="text-center justify-center items-center flex flex-col my-10 p-6 ">
              <h1 className="text-[#EA6D27]  uppercase mb-5 font-semibold">
                thank you for shopping with us
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
