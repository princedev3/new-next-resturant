"use client";
import {
  useDeleteGalleryMutation,
  useGetGalleryQuery,
} from "@/apis/_gallery_index.api";
import React, { useState } from "react";
import { Trash2, X } from "lucide-react";
import Image from "next/image";

const GetAdminGallery = () => {
  const { data, isLoading } = useGetGalleryQuery();
  const [deleteGallery, { isSuccess: isDeleteSuccess }] =
    useDeleteGalleryMutation();
  const [imageOverlay, setImageOverLay] = useState("");
  const [toggleimageOverlay, setToggleImageOverLay] = useState(false);
  if (isLoading) {
    return <span className="">Loading...</span>;
  }
  const handleMouseMovement = (img: string) => {
    setImageOverLay(img);
    setToggleImageOverLay(true);
  };
  const handleDelete = async (id: string) => {
    await deleteGallery(id);
  };
  return (
    <div className="">
      <table className="w-full border-collapse border border-gray-300 table-fixed">
        <thead>
          <tr className="bg-gray-200">
            <th className="border hidden lg:table-cell  border-gray-300 px-4 py-2  text-center capitalize">
              Name
            </th>
            <th className="border  lg:table-cell border-gray-300 px-4 py-2  text-center capitalize">
              image
            </th>
            <th className="border  lg:table-cell border-gray-300 px-4 py-2  text-center capitalize">
              action
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data?.length > 0 &&
            data?.map((item) => (
              <tr className="hover:bg-gray-100 group" key={item.id}>
                <td className="border hidden lg:table-cell border-gray-300 px-4 py-2 whitespace-nowrap text-center">
                  {item?.name}
                </td>
                <td
                  onClick={() => handleMouseMovement(item.image)}
                  className="border lg:table-cell flex justify-center items-center border-gray-300 px-4 py-2 whitespace-nowrap text-center"
                >
                  <span className="inline-flex justify-center items-center w-full">
                    <Image
                      src={item.image}
                      alt=""
                      width={40}
                      height={40}
                      className="w-10 h-10 object-cover rounded-full "
                    />
                  </span>
                </td>
                <td className="border  border-gray-300 px-4 py-2  text-center ">
                  <span className="inline-flex justify-center items-center w-full">
                    <Trash2
                      onClick={() => handleDelete(item.id)}
                      className="cursor-pointer text-red-700"
                    />
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {toggleimageOverlay && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative">
            <Image
              src={imageOverlay}
              alt="Hovered Image"
              width={400}
              height={400}
              className="object-cover w-[400px] h-[400px] rounded-lg shadow-lg"
            />
            <X
              onClick={() => setToggleImageOverLay(false)}
              className="cursor-pointer absolute top-3 right-3 bg-white text-red-600 rounded-full p-2 w-10 h-10"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GetAdminGallery;
