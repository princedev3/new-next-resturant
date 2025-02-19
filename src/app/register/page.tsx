"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Button } from "@/components/ui/button";
import { RegisterSchema } from "@/static/schema";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

const RegisterPage = () => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    console.log(values);
  }
  return (
    <div className="grid max-w- w-full lg:grid-cols-[1fr_1fr] my-4 px-4 mb-10 ">
      <div className="w-full hidden lg:grid place-content-center  gap-5 ">
        <h1 className="text-center text-xl font-medium capitalize">
          {" "}
          continue with google
        </h1>
        <Button className=" w-[400px] capitalize p-5">
          <span className="text-lg ">Sign in with google</span>
          <Image
            src={"/google-logo.svg"}
            alt=""
            className="object-cover "
            width={30}
            height={30}
          />
        </Button>
      </div>
      <div className="w-full ">
        <h1 className="capitalize text-center text-2xl font-semibold text-gray-600">
          create an account
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" capitalize text-lg">name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="enter your name"
                      className="p-6"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" capitalize text-lg">email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="enter your email"
                      className="p-6"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" capitalize text-lg">
                    password
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="p-6"
                      placeholder="enter your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="">
              <Button type="submit" className="w-full p-6 text-xl ">
                Submit
              </Button>
              <Link
                href={"/login"}
                className="text-center flex items-center justify-center mt-1 text-gray-700 text-sm cursor-pointer mx-auto w-full"
              >
                already have an account?{" "}
                <span className="underline">login</span>
              </Link>
            </div>
          </form>
        </Form>
        <div className="w-full grid items-center  mt-4 ">
          <Separator className="my-4" />
          <div className="grid gap-y-4">
            <h1 className="text-center text-xl font-medium">
              {" "}
              continue with google
            </h1>
            <Button className=" w-full capitalize p-5">
              <span className="text-lg ">Sign in with google</span>
              <Image
                src={"/google-logo.svg"}
                alt=""
                className="object-cover "
                width={30}
                height={30}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
