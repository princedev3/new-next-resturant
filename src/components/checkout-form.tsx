"use client";
import React, { useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useConfirmPaymentMutation } from "@/apis/_order_index.api";

export default function CheckoutForm({
  clientSecret,
}: {
  clientSecret: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { orderId } = useParams();
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent");
  const [confirmPayment, { isSuccess }] = useConfirmPaymentMutation();
  console.log(payment_intent, isSuccess);
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
        return_url: `http://localhost:3000/pay/${orderId}`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message as string);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const updateData = async () => {
      if (payment_intent) {
        await confirmPayment(payment_intent);
      }
    };
    updateData();
  }, [payment_intent]);

  useEffect(() => {
    if (isSuccess) {
      router.push("/menu");
    }
  }, [isSuccess]);

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
        {payment_intent && (
          <div
            className={`bg-black bg-opacity-50 z-20 fixed top-0 left-0 w-full h-full grid place-items-center transition-all overflow-hidden 
       opacity-100 visible
      `}
          >
            <div
              className={`bg-white w-full grid max-w-xl max-h-[80vh] rounded-lg shadow-lg relative overflow-hidden`}
            >
              <div className="text-center justify-center items-center flex flex-col my-10 p-6 ">
                <h1 className="text-red-600 uppercase mb-5 font-semibold">
                  thank you for shopping with us
                </h1>
                <span className="text-red-600">
                  Please <b className="text-xl ">do not</b> close page while we
                  process your order
                </span>
              </div>
            </div>
          </div>
        )}
        {/* {message && <div id="payment-message">{message}</div>} */}
      </form>
    </div>
  );
}

// payment_intent=pi_3QxOFiJvEcBpkSVx0rwlcGYZ&payment_intent_client_secret=pi_3QxOFiJvEcBpkSVx0rwlcGYZ_secret_xDcjR5T0tDQOxCWKLafV4ttF2&redirect_status=succeeded
