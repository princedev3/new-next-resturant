"use client";
import React from "react";
import { MoreHorizontal } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetProductsQuery } from "@/apis/_product_index.api";
import { PaginationWithLinks } from "../pagination-with-link";
import { useSearchParams } from "next/navigation";
import Loading from "../loading";

const ProductsList = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const pageNumber = page ? page : "1";
  const { data, isLoading } = useGetProductsQuery(pageNumber);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="">
      <div className=" gap-y-4 w-full">
        <div className="">
          <table className="w-full border-collapse border border-gray-300 table-fixed">
            <thead>
              <tr className="bg-gray-200">
                <th className="border  border-gray-300 px-4 py-2  text-center capitalize">
                  Name
                </th>
                <th className="border hidden lg:table-cell border-gray-300 px-4 py-2  text-center capitalize">
                  Price
                </th>
                <th className="border  hidden lg:table-cell  border-gray-300 px-4 py-2  text-center capitalize">
                  Desc
                </th>
                <th className="border border-gray-300 px-4 py-2  text-center capitalize">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data?.allProducts.length > 0 &&
                data?.allProducts.map((item) => (
                  <tr className="hover:bg-gray-100 group" key={item.id}>
                    <td className="border  border-gray-300 px-4 py-2 whitespace-nowrap text-center">
                      {item?.name}
                    </td>
                    <td className="border hidden lg:table-cell border-gray-300 px-4 py-2 whitespace-nowrap text-center">
                      {item?.price}
                    </td>
                    <td className="border hidden lg:table-cell border-gray-300 px-4 py-2 whitespace-nowrap text-center">
                      {item?.desc.slice(0, 15)}
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
                        <PopoverContent className="grid gap-y-1">
                          <Link href={`/admin/${item.id} `}>view product</Link>
                        </PopoverContent>
                      </Popover>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <PaginationWithLinks
            pageSize={10}
            page={parseInt((pageNumber as string) || "1")}
            totalCount={data?.count as number}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
