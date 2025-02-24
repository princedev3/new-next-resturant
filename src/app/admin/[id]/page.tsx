"use client";
import {
  useGetSingleProductsQuery,
  useUpdateProductMutation,
} from "@/apis/_product_index.api";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type ProductType = {
  id: string;
  name: string;
  price: number;
  available: boolean;
  desc: string;
  image: string[];
  createdAt: Date;
};

const SingleProduct = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data } = useGetSingleProductsQuery(id as string);
  const [newImages, setNewImages] = useState<globalThis.File[]>([]);
  const [updateProduct, { isSuccess, isLoading }] = useUpdateProductMutation();

  const [product, setProduct] = useState<ProductType>({
    id: "",
    price: 0,
    available: false,
    name: "",
    desc: "",
    image: [] as string[],
    createdAt: new Date(),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;

    setProduct((prev) => ({
      ...prev,
      [target.name]: target.type === "checkbox" ? target.checked : target.value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArrays: globalThis.File[] = Array.from(files);
      setNewImages(fileArrays);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", product.id);
    formData.append("name", product.name);
    formData.append("price", String(product.price));
    formData.append("available", String(product.available));
    formData.append("desc", product.desc);
    formData.append("existingImages", JSON.stringify(product.image));

    newImages.forEach((file) => {
      if (Object.prototype.toString.call(file) === "[object File]") {
        formData.append("newImages", file);
      }
    });

    const res = await updateProduct(formData);
  };

  const handleDeleteImage = (indexToRemove: number) => {
    setProduct((prev) => ({
      ...prev,
      image: prev.image.filter((_, index) => index !== indexToRemove),
    }));
  };

  useEffect(() => {
    if (!data) return;

    const productData = Array.isArray(data) ? data[0] : data;
    setProduct({
      id: productData?.id || "",
      price: productData?.price || 0,
      available: productData?.available || false,
      name: productData?.name || "",
      desc: productData?.desc || "",
      image: productData?.image || [],
      createdAt: productData?.createdAt || new Date(),
    });
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      router.push("/admin");
    }
  }, [isSuccess]);
  return (
    <div>
      <div className="p-3">
        <form onSubmit={handleSubmit} className="grid gap-y-4">
          <div className="grid gap-y-2">
            <label className="capitalize text-xl text-gray-700">desc</label>
            <textarea
              id="desc"
              name="desc"
              defaultValue={product.desc}
              onChange={handleChange}
              className="w-full p-2 rounded-md border text-gray-700 resize-none"
            />
          </div>
          <div className="grid gap-y-2">
            <label className="capitalize text-xl text-gray-700">name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={handleChange}
              defaultValue={product.name}
              className="w-full p-2 rounded-md border text-gray-700 "
            />
          </div>
          <div className="grid gap-y-2">
            <label className="capitalize text-xl text-gray-700">avaible</label>
            <input
              id="available"
              name="available"
              type="checkbox"
              checked={product.available}
              onChange={handleChange}
              className="text-center p-2 rounded-md border text-gray-700 w-full h-8"
            />
          </div>
          <div className="grid gap-y-2">
            <label className="capitalize text-xl text-gray-700">avaible</label>
            <input
              name="price"
              id="price"
              type="number"
              value={product.price}
              onChange={handleChange}
              defaultValue={product.price}
              className="  p-2 rounded-md border text-gray-70 w-full  "
            />
          </div>
          <div className="grid gap-y-4">
            <label className="capitalize text-xl text-gray-700">Images</label>
            <input
              multiple
              name="image"
              id="image"
              type="file"
              onChange={handleFileChange}
              className="p-2 rounded-md border text-gray-700 w-full"
            />
            <div className="grid gap-5 w-full auto-cols-max grid-cols-[repeat(auto-fit,minmax(100px,1fr))]">
              {product.image.map((img, index) => (
                <Image
                  onClick={() => handleDeleteImage(index)}
                  key={index}
                  src={img}
                  width={50}
                  height={50}
                  alt={`Product-${index}`}
                  className="w-32 h-32 object-cover rounded-md border"
                />
              ))}
            </div>
            <Button
              disabled={isLoading}
              className="bg-[#066458] !py-7 cursor-pointer capitalize text-xl hover:bg-[#066458]/80"
            >
              {isLoading ? (
                <LoaderCircle className="animate-spin text-center" size={25} />
              ) : (
                "save changes"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SingleProduct;
