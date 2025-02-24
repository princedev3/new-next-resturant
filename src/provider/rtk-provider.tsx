"use client";
import { store } from "@/static/rtk-store";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";

const RtkProvider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return <Provider store={store}>{children}</Provider>;
};

export default RtkProvider;
