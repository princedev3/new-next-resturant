"use client";
import { ClipLoader } from "react-spinners";
import { useVerifyEmailMutation } from "@/apis/_user.index.api";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormSuccess } from "@/components/form-success";

const EmailVerification = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [verifyEmail, { isSuccess }] = useVerifyEmailMutation();
  const router = useRouter();
  useEffect(() => {
    const verifyAccount = async () => {
      if (token) {
        const res = await verifyEmail({ token });
      }
    };
    verifyAccount();
  }, [token]);
  if (isSuccess) {
    router.push("/login");
  }

  return (
    <div className="grid max-w-4xl mx-auto w-full my-4 px-4 mb-10 ">
      <div className="w-full flex items-center justify-center flex-col gap-2">
        <h1 className="capitalize text-center text-2xl font-semibold text-gray-600">
          verify your account
        </h1>
        <ClipLoader color="#4b5563" size={30} />
      </div>
    </div>
  );
};

export default EmailVerification;
