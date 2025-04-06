import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_SECRET_KEY);
const Payment = () => {
  return (
    <div>
        <SectionTitle subHeading="Please pay to eat" heading="payment"></SectionTitle>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Payment;
