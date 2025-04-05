import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { GiForkKnifeSpoon } from "react-icons/gi";
import "./AddItems.css";

const imageApiKey = import.meta.env.VITE_imgbb_API_KEY;
const imageApi = `https://api.imgbb.com/1/upload?key=${imageApiKey}`;
// console.log("imgbb API=>", imageApi);
import useAxiosPublic from "./../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const AddItems = () => {
  const { register, handleSubmit,reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    // console.log("New food item==>", data);
    const imageData = { image: data.image[0] };
    // console.log("imageData", imageData);
    // host image in imgbb, get link, then fire the new food item to DB
    const res = await axiosPublic.post(imageApi, imageData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // console.log("Imagebb Image hosting response=>", res.data);

    if (res.data.success) {
      const img_url = res.data?.data?.display_url;
      // hit POST API: menu item
    //   console.log(img_url);
      const newFoodItem = {
        name: data.name,
        image: img_url,
        category: data.category,
        price: data.price,
        recipe: data.recipe,
      };
      const menuRes = await axiosSecure.post("/menu", newFoodItem);
    //   console.log("New food post reponse in DB=>", menuRes.data);
      if(menuRes.data.insertedId){
        // react hook form reset
        reset()
        toast(`New Food: ${data.name} added to the menu`)
      }
      else{
        toast('New food adding failed!')
      }
    }
  };

  return (
    <div>
      <SectionTitle
        subHeading={"What's new?"}
        heading={"ADD AN ITEM"}
      ></SectionTitle>

      <div className="border-2 border-teal-300">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="m-10 bg-slate-100 p-10"
        >
          {/* recipe name */}
          <div className="flex flex-col w-full mb-5">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Recipe Name*</span>
              </div>
            </label>
            <input
              type="text"
              placeholder="Recipe name"
              className="input input-bordered w-full bg-white"
              {...register("name")}
            />
          </div>
          {/* category + price */}
          <div className="flex flex-col md:flex-row gap-6 mb-5">
            {/* category */}
            <div className="w-full">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Category*</span>
                </div>
              </label>

              <select
                {...register("category")}
                className="input input-bordered w-full"
              >
                <option value="offered">Offered</option>
                <option value="pizza">Pizza</option>
                <option value="dessert">Dessert</option>
                <option value="soup">Soup</option>
                <option value="salad">Salad</option>
                <option value="drink">Drink</option>
              </select>
            </div>
            {/* price */}
            <div className="w-full">
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">Price*</span>
                </div>
              </label>

              <input
                type="number"
                placeholder="Price"
                className="input input-bordered w-full "
                {...register("price")}
              />
            </div>
          </div>

          {/* Recipe details */}
          <div className="flex flex-col mb-5 w-full">
            <label className="form-control">
              <div className="label">
                <span className="label-text">Recipe details*</span>
              </div>
            </label>
            <textarea
              className="textarea textarea-bordered h-24 w-full"
              placeholder="Recipe details"
              {...register("recipe")}
            ></textarea>
          </div>
          {/*image upload  */}
          <div>
            <input
              type="file"
              className="file-input w-full max-w-xs bg-slate-400"
              {...register("image")}
            />
          </div>

          <button className="btn bg-[#915e91aa] text-white text-lg mt-5">
            Add Item <GiForkKnifeSpoon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
