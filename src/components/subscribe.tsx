"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";

const Subscribe = () => {
  const [loading, setLoading] = useState(false);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = event?.target as HTMLFormElement;
    const formData = new FormData(target);
    setLoading(true);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEBFORM as string);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    });
    const result = await response.json();
    if (result.success) {
      target.reset();
      setLoading(false);
    }
    setLoading(false);
  }
  return (
    <div className="relative   ">
      <div className="mx-auto w-full grid gap-y-3 max-h-[40vh]  bg-[url('/bg1.png')] bg-cover bg-center bg-no-repeat rounded-lg max-w-2xl relative !z-50 p-5 ">
        <div className="text-white">
          <h1 className="text-xl font-semibold text-center">
            Get Or Promo Code by
          </h1>
          <h1 className="text-xl font-semibold text-center">
            Subscribing To our Newsletter
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-flow-col grid-cols-[3fr_1fr] gap-5 "
        >
          <Input
            placeholder="enter your email"
            name="email"
            className="bg-white"
          />

          <Button type="submit" className="bg-[#EA6D27] hover:bg-[#EA6D27]">
            {loading ? (
              <LoaderCircle className="animate-spin text-center" size={20} />
            ) : (
              "subscribe"
            )}
          </Button>
        </form>
      </div>
      <div className="bg-white mt-2 h-[100px] top-1/2 z-[0] left-0 absolute w-full " />
    </div>
  );
};

export default Subscribe;
