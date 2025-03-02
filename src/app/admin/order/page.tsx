"use client";
import {
  useArchiveOrdersMutation,
  useGetActiveOrdersQuery,
} from "@/apis/_order_index.api";
import Loading from "@/components/loading";
import { PaginationWithLinks } from "@/components/pagination-with-link";
import { Order } from "@prisma/client";
import { ArchiveRestore } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";

const OrderPage = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const pageNumber = page ? page : "1";
  const [archiveOrders] = useArchiveOrdersMutation();
  const { data, isLoading } = useGetActiveOrdersQuery(pageNumber);
  if (isLoading) {
    return <Loading />;
  }
  const handleArchive = async (id: string) => {
    await archiveOrders(id);
  };
  return (
    <div>
      <table className="w-full border-collapse border border-gray-300 table-fixed">
        <thead>
          <tr className="bg-gray-200">
            <th className="border  hidden lg:table-cell  border-gray-300 px-4 py-2  text-center capitalize">
              ID
            </th>
            <th className="border hidden lg:table-cell border-gray-300 px-4 py-2  text-center capitalize">
              Price
            </th>
            <th className="border  border-gray-300 px-4 py-2  text-center capitalize">
              email
            </th>
            <th className="border border-gray-300 px-4 py-2  text-center capitalize">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data?.orders?.length > 0 &&
            data?.orders.map((item) => (
              <tr className="hover:bg-gray-100 group" key={item.id}>
                <td className="border hidden lg:table-cell border-gray-300 px-4 py-2 whitespace-nowrap text-center">
                  {item?.id}
                </td>
                <td className="border hidden lg:table-cell border-gray-300 px-4 py-2 whitespace-nowrap text-center">
                  {item?.price}
                </td>
                <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-center">
                  {item?.userEmail}
                </td>
                <td className="border cursor-pointer border-gray-300 px-4 whitespace-nowrap text-center py-2 relative">
                  <span className="inline-flex justify-center items-center w-full">
                    <ArchiveRestore
                      onClick={() => handleArchive(item.id)}
                      className="text-green-700 "
                    />
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <PaginationWithLinks
        pageSize={5}
        page={parseInt((pageNumber as string) || "1")}
        totalCount={data?.count as number}
      />
    </div>
  );
};

export default OrderPage;
