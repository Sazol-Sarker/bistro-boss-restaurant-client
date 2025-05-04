// import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "./FoodCard.css";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
const FoodCard = ({ item }) => {
  const { user } = useAuth();
  // console.log("user=>",user);
  const { _id, name, recipe, image, price } = item;
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const {refetch}=useCart()
 

  const handleAddToCart = (item) => {
    // console.log(item);

    if (user && user.email) {
      // insert a carts item (itemId,userEmail,ItemName,ItemImage,price)
      const cartItem = {
        itemId: _id,
        userEmail: user.email,
        itemName: name,
        itemImage: image,
        itemPrice: price,
      };
      // axios.post("https://bistro-boss-restaurant-server-zjo1.onrender.com/carts", cartItem).then((res) => {
      axiosSecure.post("/carts", cartItem).then((res) => {
        if(res.data.insertedId){

          toast(`${name} added to cart!`);
          refetch()
          // console.log(res.data);
        }
      });
    } else {
      Swal.fire({
        title: "You need to login first!",
        text: "Do you want to log in?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "yes, Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div className="card card-compact bg-base-100 border-2 w-64 md:w-80 lg:w-96 shadow-xl">
      <figure className="w-full">
        <img src={image} alt={name} className="w-full" />
      </figure>
      <p className="bg-[#111827] text-white right-0 absolute mr-4 mt-4 px-4 py-2 rounded-sm">
        ${price}
      </p>
      <div className="card-body">
        <h2 className="card-title flex justify-center ">{name}</h2>

        <p>{recipe}</p>
        {/* <div className="card-actions justify-center">
          <button className="btn btn-primary uppercase">add to cart</button>
        </div> */}
        <button
          onClick={() => handleAddToCart(item)}
          className="btn w-3/4 md:w-3/5 mx-auto mt-5  text-xs md:text-[15px] text-[#BB8506] hover:bg-[#1F2937] border-b-2 border-0 border-[#BB8506]"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
