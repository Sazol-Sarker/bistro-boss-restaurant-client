import {
  CardElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import useCart from "./../../../hooks/useCart";
import Payment from "./Payment";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "./../../../hooks/useAxiosPublic";

const CheckoutForm = () => {
  const [errors, setErrors] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { cart, isLoading } = useCart();
  const { user } = useAuth();

  const totalPrice = cart.reduce((total, item) => total + item.itemPrice, 0);
  // console.log("totalPrice===>", totalPrice);

  useEffect(() => {
    if(totalPrice>0)
    {

    
    axiosSecure
      .post("/create-payment-intent", { price: totalPrice })
      .then((res) => {
        // console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        setErrors("Failed to initiate payment.");
      });

    }
  }, [axiosSecure, totalPrice]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setErrors(error.message);
      // console.log("[error]", error);
    } else {
      setErrors("");
      e.target.reset();
      // console.log("[PaymentMethod]", paymentMethod);
    }

    // /Payment confirm
    const { paymentIntent, confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "Anonymous",
            name: user?.displayName || "Anonymous",
          },
        },
      }
    );

    console.log("stripe || clientSecret==>", stripe, clientSecret);

    if (confirmError) {
      console.log("Confirm error=>", confirmError);
    } else {
      // console.log("PaymentIntent=>", paymentIntent);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit} className="w-1/2 mx-auto">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            type="submit"
            disabled={!stripe || !clientSecret}
            className="btn bg-[#D1A054] mt-5 border-2 w-1/4 mx-auto"
          >
            Pay <span>${totalPrice}</span>
          </button>
        </form>
      </div>
      <p className="text-red-500 text-center">{errors}</p>
    </>
  );
};

export default CheckoutForm;
