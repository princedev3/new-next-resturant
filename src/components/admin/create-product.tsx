"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { LoaderCircle, Plus, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { productSchema } from "@/static/schema";
import { useCreateProductMutation } from "@/apis/_product_index.api";

const CreateProduct = () => {
  const [createProduct, { isLoading, isSuccess }] = useCreateProductMutation();
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      desc: "",
      price: 0,
      image: [],
      available: false,
    },
  });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    form.setValue("image", Array.from(files));
  };
  async function onSubmit(values: z.infer<typeof productSchema>) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("desc", values.desc);
    formData.append("price", values.price.toString());
    formData.append("available", values.available.toString());

    if (values.image && values.image.length > 0) {
      const filesArray = Array.from(values.image);
      filesArray.forEach((file: File) => {
        formData.append("image", file);
      });
    }
    const res = await createProduct(formData);
  }
  useEffect(() => {
    if (isSuccess) {
      form.reset();
      setOpen(false);
    }
  }, [isSuccess]);
  return (
    <div className="">
      <Button
        onClick={() => setOpen(true)}
        className="w-full flex items-center font-medium bg-white hover:bg-slate-50 text-[#066458] "
      >
        <Plus className="stroke-[2] font-semibold " />
        <span className="font-semibold capitalize">create product</span>
      </Button>
      <div
        className={`${
          open ? "absolute top-0 left-0  w-full bg-black/45 p-10  " : " hidden"
        } min-h-full z-50`}
      >
        <div className="grid max-w-5xl bg-white min-h-full z-50 w-full mx-auto rounded-lg p-10">
          <div className="flex items-end  justify-end self-end">
            <span className="border  rounded-full p-1 cursor-pointer ">
              <X onClick={() => setOpen(false)} />
            </span>
          </div>
          <div className="">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-y-6"
              >
                <div className="grid md:grid-cols-2 gap-10">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>product name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="enter product name"
                            className="!py-5"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="desc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="enter product details"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="enter price"
                            className="!py-5"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="available"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>available</FormLabel>
                        <FormControl>
                          <Input
                            type="checkbox"
                            checked={field.value}
                            className="outline-none "
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={handleFileChange}
                            multiple
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button disabled={isLoading} type="submit" className="w-full">
                  {isLoading ? (
                    <LoaderCircle
                      className="animate-spin text-center"
                      size={20}
                    />
                  ) : (
                    "create product"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
