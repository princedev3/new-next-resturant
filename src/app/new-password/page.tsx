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
import { LoaderCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { passwordVerification } from "@/static/schema";
import { useEnterNewPasswordMutation } from "@/apis/_user.index.api";
import { useEffect } from "react";
import { useSessionStore } from "@/sessions/auth-session";

const NewPassword = () => {
  const session = useSessionStore((state) => state.session);

  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [enterNewPassword, { isLoading, isSuccess }] =
    useEnterNewPasswordMutation();
  const form = useForm<z.infer<typeof passwordVerification>>({
    resolver: zodResolver(passwordVerification),
    defaultValues: {
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof passwordVerification>) {
    if (!token) return;
    const res = await enterNewPassword({ ...values, token });
  }
  useEffect(() => {
    if (isSuccess) {
      router.push("/login");
    }
  }, [isSuccess]);

  return (
    <div className="grid max-w-4xl mx-auto w-full my-4 px-4 mb-10 ">
      <div className="w-full flex items-center justify-center flex-col gap-6">
        <h1 className="capitalize text-center text-2xl font-semibold text-gray-600">
          reset password action
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" capitalize text-lg">
                    enter your new password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="enter your new password"
                      className="p-6"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                  "change password"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewPassword;
