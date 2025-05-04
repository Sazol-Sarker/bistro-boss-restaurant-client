import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAxiosPublic from "./../../../hooks/useAxiosPublic";

const SslCommerzPayment = () => {
  const { user } = useAuth();
  const { cart, refetch, isLoading } = useCart();
  const axiosSecure = useAxiosSecure();

  const totalPrice = cart.reduce((total, item) => total + item.itemPrice, 0);

  const handleSslPayment = async () => {
    // now save payment in DB
    const payment = {
      // transactionId: paymentIntent.id,
      email: user.email,
      price: totalPrice.toFixed(2),
      date: new Date(), //use moment js for convenient time zone issue resolve
      cartIds: cart.map((item) => item._id),
      menuItemIds: cart.map((item) => item.itemId),
      status: "Pending",
    };

    const res = await axiosSecure.post("/create-ssl-payment", payment);

    console.log("ssl payment response=>", res.data);
    // window.location.href=res.data.url
    if (res.data?.url) window.location.replace(res.data.url);
  };
  return (
    <div className="w-4/5 max-w-md mx-auto mt-5 ">
      <div className="w-full max-w-md">
        <input defaultValue={user?.email} className="input w-full"></input>
      </div>
      <div className="flex justify-center">
        <button onClick={handleSslPayment} className="btn mt-5 text-green-600 ">
          Proceed
        </button>
      </div>
    </div>
  );
};

export default SslCommerzPayment;
