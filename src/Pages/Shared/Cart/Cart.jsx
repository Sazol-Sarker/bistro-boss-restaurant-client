import { FaRegTrashCan } from "react-icons/fa6";
import useCart from "./../../../hooks/useCart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Cart = () => {
  const { cart, refetch } = useCart();
  // console.log("cart in cart.jsx=>", cart);
  // console.log("cart.length in cart.jsx=>", cart.length);
  const axiosSecure = useAxiosSecure();

  const totalOrders = cart.length;
  const totalPrice = cart
    .reduce((sum, item) => sum + item.itemPrice, 0)
    .toFixed(2);
  //   console.log("totalOrders totalPrice=>", totalOrders, totalPrice);
  const handleCartItemDelete = (id) => {
    // delete action pop alert
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // delete api: cart
        axiosSecure
          .delete(`carts/${id}`)
          .then((res) => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            // console.log("Deleting cart item=>", res.data);
            refetch();
          })
          .catch((error) => {
            console.log("Error during cart item delete=>", error);
          });
      }
    });
  };

  return (
    <>
    <title>Bistro Boss | Cart</title>
      <div className="uppercase w-full flex items-center justify-evenly gap-x-5 mt-5 mx-1">
        <h2 className="text-sm lg:text-xl font-bold">Total Items In orders: {totalOrders}</h2>
        <h2 className="text-sm md:text-md lg:text-xl font-bold">Total price: ${totalPrice}</h2>

        {Number(totalPrice) > 0 ? (
          <Link to={"/dashboard/payment"}>
            <button className="text-sm md:text-md text-white bg-[#D1A054] uppercase py-2 px-4 rounded-lg mr-3">
              pay
            </button>
          </Link>
        ) : (
          <button
            disabled
            className="text-sm md:text-md opacity-30 text-white bg-[#D1A054] uppercase py-2 px-4 rounded-lg"
          >
            pay
          </button>
        )}
      </div>
      {/* cart items table */}
      {cart.length > 0 ? (
        <div className="my-5 ">
          <div className="overflow-x-auto w-full mx-2 ">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="uppercase bg-[#D1A054] text-white ">
                  <th className="rounded-tl-md">#</th>
                  <th className="hidden md:table-cell">Item Image</th>
                  <th>Item name</th>
                  <th>Price</th>
                  <th className="rounded-tr-md">action</th>
                </tr>
              </thead>
              <tbody>
                {/* cart items */}
                {cart.map((item, idx) => (
                  <tr key={idx} className="text-[10px] md:text-md lg:text-lg">
                    <th>{idx + 1}</th>
                    <td className="hidden md:table-cell">
                      <div className="flex items-center gap-3">
                        <div className="avatar mask mask-squircle h-12 w-12">
                          <img src={item.itemImage} alt={item.itemName} />
                        </div>
                      </div>
                    </td>
                    <td>{item.itemName}</td>
                    <td>${item.itemPrice}</td>
                    <th >
                      <button
                        onClick={() => handleCartItemDelete(item._id)}
                        className="btn btn-ghost btn-md bg-[#B91C1C] p-2"
                      >
                        <FaRegTrashCan className="text-lg  text-white" />
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-red-500 flex items-center justify-center mt-10">
          No items in cart
        </div>
      )}
    </>
  );
};

export default Cart;
