import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useState } from "react";
import SslCommerzPayment from "./SslCommerzPayment";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_SECRET_KEY);
const Payment = () => {
  const [paymentGateway, setPaymentGateway] = useState("stripe");
  console.log("paymentGateway=>", paymentGateway);
  return (
    <div>
      <SectionTitle
        subHeading="Please pay to eat"
        heading="payment"
      ></SectionTitle>

      {/* payment options: stripe/sslcommerz */}

      <div className="relative max-w-32">
      {/* <div className="relative w-1/5"> */}
        <select
          name="paymentOptions"
          onClick={(e) => setPaymentGateway(e.target.value)}
          className="appearance-none w-full max-w-lg input input-bordered pr-10"
        >
          <option value="stripe">Stripe</option>
          <option value="SSLCommerz">SSL Commerz</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0l-4.25-4.65a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {paymentGateway === "stripe" ? (
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ) : 
       <SslCommerzPayment></SslCommerzPayment>
      }
    </div>
  );
};

export default Payment;
