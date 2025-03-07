"use client";
import { useCreateIntentMutation } from "@/apis/_order_index.api";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useCreateEventIntentMutation } from "@/apis/_event_index.api";
import EventCheckoutForm from "@/components/event-checkout-form";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const EventPage = () => {
  const { eventId } = useParams();
  const [createEventIntent] = useCreateEventIntentMutation();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const createIntentFuc = async () => {
      const res = await createEventIntent(eventId);
      setClientSecret(res.data.client_secret);
    };
    createIntentFuc();
  }, [eventId]);

  const option: StripeElementsOptions = {
    appearance: {
      theme: "stripe",
    },
    clientSecret,
  };
  return (
    clientSecret && (
      <Elements stripe={stripePromise} options={option}>
        <div className=" w-full max-w-6xl grid mx-auto">
          <EventCheckoutForm clientSecret={clientSecret} />
        </div>
      </Elements>
    )
  );
};

export default EventPage;
