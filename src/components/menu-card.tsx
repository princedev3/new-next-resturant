"use client";
import { Product } from "@prisma/client";
import React from "react";

const MenuCard = ({ item }: { item: Product }) => {
  return <div>{item.name}</div>;
};

export default MenuCard;
