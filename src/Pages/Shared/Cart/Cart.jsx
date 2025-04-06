import { FaRegTrashCan } from "react-icons/fa6";
import useCart from "./../../../hooks/useCart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, refetch } = useCart();
  // console.log("cart in cart.jsx=>", cart);
  console.log("cart.length in cart.jsx=>", cart.length);
  const axiosSecure = useAxiosSecure();

  const totalOrders = cart.length;
  const totalPrice = cart.reduce((sum, item) => sum + item.itemPrice, 0).toFixed(2);
  //   console.log("totalOrders totalPrice=>", totalOrders, totalPrice);
  const handleCartItemDelete = (id) => {
    
    // delete api: cart
    axiosSecure.delete(`carts/${id}`).then((res) => {
      console.log("Deleting cart item=>", res.data);
      refetch();
    }).catch(error=>{
      console.log("Error during cart item delete=>",error);
    });
  };

  return (
    <>
      <div className="uppercase w-full flex justify-evenly gap-x-5">
        <h2 className="text-2xl font-bold">Total orders: {totalOrders}</h2>
        <h2 className="text-2xl font-bold">Total price: ${totalPrice}</h2>
        
        <Link to={"/dashboard/payment"}><button className="text-xl text-white bg-[#D1A054] uppercase py-2 px-4 rounded-lg">
          pay
        </button></Link>
      </div>
      {/* cart items table */}
      {cart.length > 0 ? (
        <div className="my-5">
          <div className="overflow-x-auto w-full">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="uppercase bg-[#D1A054] text-white ">
                  <th className="rounded-tl-md">#</th>
                  <th>Item Image</th>
                  <th>Item name</th>
                  <th>Price</th>
                  <th className="rounded-tr-md">action</th>
                </tr>
              </thead>
              <tbody>
                {/* cart items */}
                {cart.map((item, idx) => (
                  <tr key={idx}>
                    <th>{idx + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar mask mask-squircle h-12 w-12">
                          <img src={item.itemImage} alt={item.itemName} />
                        </div>
                      </div>
                    </td>
                    <td>{item.itemName}</td>
                    <td>${item.itemPrice}</td>
                    <th>
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
