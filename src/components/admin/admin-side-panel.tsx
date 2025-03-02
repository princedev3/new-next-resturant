import Link from "next/link";
import React from "react";

const AdminSidePanel = () => {
  return (
    <div>
      <div className="grid gap-4">
        <Link
          href={"/admin"}
          className="text-white border-b-2  h-full text-center font-medium hover:bg-[#30a595] py-3 capitalize cursor-pointer  w-full  "
        >
          Manage Product
        </Link>
        <Link
          href={"/admin/users"}
          className="text-white h-full hover:bg-[#30a595] border-b-2 text-center py-3 font-medium capitalize cursor-pointer w-full  "
        >
          Manage Users
        </Link>
        <Link
          className="text-white h-full hover:bg-[#30a595] border-b-2 font-medium text-center py-3 capitalize cursor-pointer w-full  "
          href={"/admin/sales"}
        >
          Manage Sales
        </Link>
        <Link
          className="text-white h-full hover:bg-[#30a595] border-b-2 font-medium text-center py-3 capitalize cursor-pointer w-full  "
          href={"/admin/coupon"}
        >
          Manage Coupon
        </Link>
        <Link
          className="text-white h-full hover:bg-[#30a595] border-b-2 font-medium text-center py-3 capitalize cursor-pointer w-full  "
          href={"/admin/gallery"}
        >
          Manage Gallery
        </Link>
        <Link
          className="text-white h-full hover:bg-[#30a595] border-b-2 font-medium text-center py-3 capitalize cursor-pointer w-full  "
          href={"/admin/order"}
        >
          Manage Orders
        </Link>
      </div>
    </div>
  );
};

export default AdminSidePanel;
