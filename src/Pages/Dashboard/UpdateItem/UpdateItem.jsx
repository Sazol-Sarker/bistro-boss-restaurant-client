import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import useMenu from "../../../hooks/useMenu";

const UpdateItem = () => {
  const navigate = useNavigate();
  const foodItem = useLoaderData();
  // console.log(foodItem);
  const {refetch}=useMenu()
  const { _id, name, recipe, category, price } = foodItem;
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  // react-hook-form
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    // console.log(data);
    const updatedFoodItem = {
      name: data.name,
      recipe: data.recipe,
      category: data.category,
      price: parseFloat(data.price),
    };

    // hit the patch api: DB-> menuColllection
    const res = await axiosPublic.patch(`/menu/${_id}`, updatedFoodItem);
    // const res=await axiosSecure.patch(`/menu/${_id}`,updatedFoodItem)
    // console.log("Menu item patch update response==>", res.data);

    if (res.data.modifiedCount > 0) {
      // reset form
      reset();
      // refetch menu data items
      refetch()

      toast(`Food item: ${data.name} info updated!`);
      navigate(-1);
    } else {
      toast("Food item update failed");
    }
  };

  return (
    <div>
      <h2 className="text-xl">UPDATE ITEM</h2>
      
      <div className="w-full border-2">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full ">
          {/* form */}
          <div className="w-full p-4">
            <label className="form-control  ">
              <div className="label">
                <span className="label-text">Recipe Name*</span>
              </div>
            </label>

            <div className="w-full ">
              <input
                type="text"
                defaultValue={foodItem.name}
                {...register("name")}
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          {/* category+price */}
          <div className="flex flex-col md:flex-row gap-4 w-full p-4">
            <div className="w-full">
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">Category*</span>
                </div>
              </label>

              <div>
                <select
                  {...register("category")}
                  defaultValue={foodItem.category}
                  className="input input-bordered w-full "
                >
                  <option value="offered">Offered</option>
                  <option value="pizza">Pizza</option>
                  <option value="dessert">Dessert</option>
                  <option value="soup">Soup</option>
                  <option value="salad">Salad</option>
                  <option value="drinks">Drinks</option>
                </select>
              </div>
            </div>
            {/* price */}
            <div className="w-full">
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">Price*</span>
                </div>
              </label>

              <div>
                <input
                  type="text"
                  {...register("price")}
                  defaultValue={foodItem?.price}
                  placeholder="Type here"
                  className="input input-bordered w-full "
                />
              </div>
            </div>
          </div>
          {/* recipe details */}
          <div className="w-full p-4">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Recipe details*</span>
              </div>
            </label>

            <div>
              <textarea
                className="textarea textarea-bordered h-24 w-full"
                placeholder="Recipe details"
                {...register("recipe")}
                defaultValue={foodItem.recipe}
              ></textarea>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button className="btn bg-[#D1A054] text-white my-5 p-2 w-3/9 ">
              Update Recipe Details
            </button>
            {/* <button onClick={()=>navigate(-1)} className="btn bg-[#D1A054] text-white my-5 p-2 w-3/9 ">
              Cancel
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
