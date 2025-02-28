"use client";
import { useCreateIntentMutation } from "@/apis/_order_index.api";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import CheckoutForm from "@/components/checkout-form";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);
const PayPage = () => {
  const { orderId } = useParams();
  const [createIntent] = useCreateIntentMutation();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const createIntentFuc = async () => {
      const res = await createIntent(orderId);
      setClientSecret(res.data.client_secret);
    };
    createIntentFuc();
  }, [orderId]);

  const option: StripeElementsOptions = {
    appearance: {
      theme: "stripe",
    },
    clientSecret,
  };
  console.log(clientSecret);
  return (
    clientSecret && (
      <Elements stripe={stripePromise} options={option}>
        <div className=" w-full max-w-6xl grid mx-auto">
          <CheckoutForm clientSecret={clientSecret} />
        </div>
      </Elements>
    )
  );
};

export default PayPage;
