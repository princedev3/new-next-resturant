"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { couponSchema } from "@/static/schema";
import { useCreateCouponsMutation } from "@/apis/_coupon_index.api";
import { LoaderCircle } from "lucide-react";

const CouponDetails = () => {
  const [createCoupons, { isLoading, isSuccess }] = useCreateCouponsMutation();
  const form = useForm<z.infer<typeof couponSchema>>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      desc: "",
      discount: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof couponSchema>) {
    await createCoupons(values);
  }
  useEffect(() => {
    form.reset();
  }, [isSuccess]);
  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid  grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] mx-auto gap-5 items-center"
        >
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Coupon description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Coupon discount"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isLoading}
            type="submit"
            className="md:mt-7 bg-[#066458] hover:bg-[#066458] "
          >
            {isLoading ? (
              <LoaderCircle className="animate-spin text-center" size={20} />
            ) : (
              "create token"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CouponDetails;
