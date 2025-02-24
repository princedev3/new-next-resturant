"use client";
import { useGetProductsQuery } from "@/apis/_product_index.api";
import MenuCard from "@/components/menu-card";
import React from "react";

const Menu = () => {
  const { data, isError, isLoading } = useGetProductsQuery();
  if (isLoading) {
    return <span className="">Loading...</span>;
  }
  return (
    <div className="py-8">
      {data &&
        data?.length &&
        data.map((item) => <MenuCard key={item.id} item={item} />)}
    </div>
  );
};

export default Menu;
