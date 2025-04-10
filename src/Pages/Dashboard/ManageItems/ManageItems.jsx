import { FaEdit } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import { FaTrash } from "react-icons/fa6";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ManageItems = () => {
  const { menu, loading, refetch } = useMenu();
  //   console.log("menu==>", menu);
  const axiosSecure = useAxiosSecure();

  if (loading) return <div>Loading...</div>;

  // handleFoodItemDelete
  const handleFoodItemDelete = async (food) => {
    // swal alert: delete confirmation
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      // trigger delete api: food item
      const res = await axiosSecure.delete(`/menu/${food._id}`);

      if (res.data.deletedCount > 0) {
        refetch();

        toast(`${food.name} is deleted successfully!`);
      } else {
        console.log("Delete food item failed");
      }
    }

    console.log("Food item delete response=>", res.data);
  };

  return (
    <>
      <title>Bistro Boss | Manage Items</title>
      <div>
        <SectionTitle
          heading={"MANAGE ALL ITEMS"}
          subHeading={"Hurry Up!"}
        ></SectionTitle>

        {/* table */}
        <div>
          <div className="flex items-center justify-center text-3xl font-bold mb-5">
            Total items: {menu.length}
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="uppercase">
                  <th>#</th>
                  <th>item image</th>
                  <th>item name</th>
                  <th>price</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {menu.map((food, idx) => (
                  <tr key={idx}>
                    <th>{idx + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={food.image} alt={food.name} />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{food.name}</td>
                    <td>${food.price}</td>
                    <th>
                      <Link to={`/dashboard/updateItem/${food._id}`}>
                        {/* <Link to={`/menu/${food._id}`}> */}
                        <button className="btn btn-ghost btn-xs bg-[#D1A054]">
                          <FaEdit className="text-white text-md"></FaEdit>
                        </button>
                      </Link>
                    </th>
                    <th>
                      <button
                        onClick={() => handleFoodItemDelete(food)}
                        className="btn btn-ghost btn-xs bg-[#B91C1C]"
                      >
                        <FaTrash className="text-white text-md"></FaTrash>
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageItems;
