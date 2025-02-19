"use client";
import React from "react";
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

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

const Subscribe = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-flow-col grid-cols-[3fr_1fr] gap-5 "
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="enter your email"
                      className="bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-[#EA6D27] hover:bg-[#EA6D27]">
              subscribe
            </Button>
          </form>
        </Form>
      </div>
      <div className="bg-white mt-2 h-[100px] top-1/2 z-[0] left-0 absolute w-full " />
    </div>
  );
};

export default Subscribe;
