"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginSchema } from "@/static/schema";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { useResetPasswordMutation } from "@/apis/_user.index.api";
import { useSessionStore } from "@/sessions/auth-session";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { FormSuccess } from "@/components/form-success";
import { loginAction } from "@/action/login-action";
import toast from "react-hot-toast";

const Loginpage = () => {
  const router = useRouter();
  const [passwordString, setPasswordString] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resetPassword, { isLoading: isChangingPassword }] =
    useResetPasswordMutation();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    setIsLoading(true);
    const res = await loginAction(values);
    if (res.status === 500) {
      toast.error("invalid");
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  }

  const session = useSessionStore((state) => state.session);
  const email = session?.user?.email;
  const handleForgotPassword = async () => {
    try {
      const res = await resetPassword({ email });
      setPasswordString(res?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full max-w-4xl grid mx-auto mb-10 p-4">
        <h1 className="capitalize text-center text-2xl font-semibold text-gray-600">
          login to your account
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            <div className="">
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
              <span
                onClick={handleForgotPassword}
                className="text-sm text-gray-700 cursor-pointer"
              >
                <div className="grid gap-y-2">
                  {isChangingPassword ? (
                    <LoaderCircle
                      className="animate-spin text-center"
                      size={20}
                    />
                  ) : (
                    "Forgot password?"
                  )}
                  {passwordString && <FormSuccess message={passwordString} />}
                </div>
              </span>
            </div>
            <div className="">
              <Button
                disabled={isLoading}
                type="submit"
                className="w-full p-6 text-xl "
              >
                {isLoading ? (
                  <LoaderCircle
                    className="animate-spin text-center"
                    size={20}
                  />
                ) : (
                  "login"
                )}
              </Button>
              <Link
                href={"/register"}
                className="text-center flex items-center justify-center mt-1 text-gray-700 text-sm cursor-pointer mx-auto w-full"
              >
                dont have an account?{" "}
                <span className="underline">Register</span>
              </Link>
            </div>
          </form>
        </Form>
        <div className="w-full grid items-center  mt-4 ">
          <Separator className="my-4" />
          <div className="grid gap-y-4 mt-2">
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
    </>
  );
};

export default Loginpage;
