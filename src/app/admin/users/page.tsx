"use client";
import {
  useArchiveAUserMutation,
  useGetAllusersQuery,
} from "@/apis/_user.index.api";
import React from "react";
import { ArchiveRestore } from "lucide-react";
import Loading from "@/components/loading";

const UserList = () => {
  const { data, isLoading } = useGetAllusersQuery();
  const [archiveAUser] = useArchiveAUserMutation();
  if (isLoading) {
    return <Loading />;
  }

  const handleArchive = async (id: string) => {
    await archiveAUser(id);
  };

  return (
    <div>
      <div className="">
        <table className="w-full border-collapse border border-gray-300 table-fixed">
          <thead>
            <tr className="bg-gray-200">
              <th className="border  hidden lg:table-cell  border-gray-300 px-4 py-2  text-center capitalize">
                ID
              </th>
              <th className="border  border-gray-300 px-4 py-2  text-center capitalize">
                Name
              </th>
              <th className="border hidden lg:table-cell   border-gray-300 px-4 py-2  text-center capitalize">
                email
              </th>
              <th className="border border-gray-300 px-4 py-2  text-center capitalize">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data?.users?.length > 0 &&
              data?.users.map((item) => (
                <tr className="hover:bg-gray-100 group" key={item.id}>
                  <td className="border hidden lg:table-cell border-gray-300 px-4 py-2 whitespace-nowrap text-center">
                    {item?.id}
                  </td>
                  <td className="border  border-gray-300 px-4 py-2 whitespace-nowrap text-center">
                    {item?.name}
                  </td>
                  <td className="border hidden lg:table-cell border-gray-300 px-4 py-2 whitespace-nowrap text-center">
                    {item?.email}
                  </td>
                  <td className="border cursor-pointer border-gray-300 px-4 whitespace-nowrap text-center py-2 relative">
                    <span className="inline-flex justify-center items-center w-full">
                      <ArchiveRestore
                        onClick={() => handleArchive(item.id)}
                        className="text-green-700 "
                      />
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
