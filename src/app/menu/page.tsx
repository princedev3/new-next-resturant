"use client";
import { useGetProductsQuery } from "@/apis/_product_index.api";
import Loading from "@/components/loading";
import MenuCard from "@/components/menu-card";
import { PaginationWithLinks } from "@/components/pagination-with-link";
import { useSearchParams } from "next/navigation";
import React from "react";

const Menu = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const pageNumber = page ? page : "1";
  const { data, isError, isLoading } = useGetProductsQuery(pageNumber);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="">
      <div className="py-8 grid  grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] mx-auto gap-8">
        {data &&
          data?.allProducts.length &&
          data.allProducts.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
      </div>
      <PaginationWithLinks
        pageSize={10}
        page={parseInt((pageNumber as string) || "1")}
        totalCount={data?.count as number}
      />
    </div>
  );
};

export default Menu;
