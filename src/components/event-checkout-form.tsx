"use client";
import React from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";

export default function EventCheckoutForm({
  clientSecret,
}: {
  clientSecret: string;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const { orderId } = useParams();

  const [message, setMessage] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/eventsuccess`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message as string);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <div className="relative ">
      <form id="payment-form" onSubmit={handleSubmit} className="w-full">
        <PaymentElement
          id="payment-element"
          options={{ layout: "tabs" }}
          className="w-full "
        />
        <Button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="bg-[#EA6D27] mt-3 hover:bg-[#EA6D27] "
        >
          <span id="button-text">
            {isLoading ? (
              <LoaderCircle className="animate-spin text-center" size={20} />
            ) : (
              "Pay now"
            )}
          </span>
        </Button>
      </form>
    </div>
  );
}
