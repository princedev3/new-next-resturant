import AdminSidePanel from "@/components/admin/admin-side-panel";
import CreateProduct from "@/components/admin/create-product";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <div className="bg-[#066458] h-[100px] w-full grid gap-3  grid-flow-col auto-cols-max justify-between items-center px-2 md:px-5">
        <span className="text-white capitalize font-medium text-xl">
          Marvin-Resturant
        </span>
        <CreateProduct />
      </div>
      <div className="grid grid-cols-[120px_1fr] md:grid-cols-[200px_1fr]">
        <div className="bg-[#066458]  p-2">
          {" "}
          <AdminSidePanel />
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default layout;
