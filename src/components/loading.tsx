"use client";
import React from "react";
import { BeatLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className=" h-full w-full flex items-center justify-center">
      <BeatLoader size={40} color="#60a5fa" />
    </div>
  );
};

export default Loading;
