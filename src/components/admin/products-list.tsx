"use client";
import React, { useEffect, useState } from "react";
import { MoreHorizontal } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetProductsQuery } from "@/apis/_product_index.api";

const ProductsList = () => {
  const { data, isError, isLoading } = useGetProductsQuery();

  return (
    <div className="">
      <div className=" gap-y-4 w-full">
        {/* <div className=""></div> */}
        {/* <h2 className="capitalize font-medium text-xl"></h2> */}
        <div className="">
          <table className="w-full border-collapse border border-gray-300 table-fixed">
            <thead>
              <tr className="bg-gray-200">
                <th className="border  hidden lg:table-cell  border-gray-300 px-4 py-2  text-center capitalize">
                  Name
                </th>
                <th className="border hidden lg:table-cell border-gray-300 px-4 py-2  text-center capitalize">
                  Price
                </th>
                <th className="border  border-gray-300 px-4 py-2  text-center capitalize">
                  Desc
                </th>
                <th className="border border-gray-300 px-4 py-2  text-center capitalize">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data?.length > 0 &&
                data?.map((item) => (
                  <tr className="hover:bg-gray-100 group" key={item.id}>
                    <td className="border hidden lg:table-cell border-gray-300 px-4 py-2 whitespace-nowrap text-center">
                      {item?.name}
                    </td>
                    <td className="border hidden lg:table-cell border-gray-300 px-4 py-2 whitespace-nowrap text-center">
                      {item?.price}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-center">
                      {item?.desc}
                    </td>
                    <td className="border border-gray-300 px-4 whitespace-nowrap text-center py-2 relative">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            className="bg-transparent "
                            variant={"outline"}
                          >
                            <MoreHorizontal className="w-5 h-5" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Link href={`/admin/${item.id} `}>view product</Link>
                        </PopoverContent>
                      </Popover>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
