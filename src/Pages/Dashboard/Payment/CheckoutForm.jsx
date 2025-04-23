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
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const { cart, isLoading, refetch } = useCart();

  const { user } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const totalPrice = cart.reduce((total, item) => total + item.itemPrice, 0);
  // console.log("totalPrice===>", totalPrice);

  useEffect(() => {
    if (totalPrice > 0) {
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

    // console.log("stripe || clientSecret==>", stripe, clientSecret);

    if (confirmError) {
      console.log("Confirm error=>", confirmError);
    } 
    else {
      // console.log("PaymentIntent=>", paymentIntent);
      if (paymentIntent?.status === "succeeded") {
        // e.target.reset();

        // console.log("Transaction id=>", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // now save payment in DB
        const payment = {
          transactionId: paymentIntent.id,
          email: user.email,
          price: totalPrice.toFixed(2),
          date: new Date(), //use moment js for convenient time zone issue resolve
          cartIds: cart.map((item) => item._id),
          menuItemIds: cart.map((item) => item.itemId),
          status: "Pending",
        };

        const res = await axiosSecure.post("/payments", payment);
        // console.log("Db response : Payment post in DB-> API=>", res.data);
        if (res?.data.paymentResult?.insertedId) {
          // queryClient.invalidateQueries(["cart"]);

          refetch();
          toast(`Payment done with transaction id: ${paymentIntent.id}`);
          navigate("/dashboard/paymentHistory");
        }
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit} className="w-1/2 mx-auto mt-5">
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
            className="btn bg-[#D1A054] mt-10 border-2 w-1/4 mx-auto flex items-center "
          >
            Pay <span>${totalPrice.toFixed(2)}</span>
          </button>
        </form>
      </div>
      {errors && <p className="text-red-500 text-center">{errors}</p>}
      {transactionId && (
        <p className="text-green-500 text-center">
          Transaction id: {transactionId}
        </p>
      )}
    </>
  );
};

export default CheckoutForm;
