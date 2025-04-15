import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { BsRocketTakeoff } from "react-icons/bs";
import { Rating } from "@smastrom/react-rating";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import useMenu from "../../../hooks/useMenu";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const AddReview = () => {
  const { register, handleSubmit } = useForm();
  const { user } = useAuth();
  console.log("user==>", user?.email);
  const { menu } = useMenu();
  const axiosPublic=useAxiosPublic()
  const [userRating, setUserRating] = useState(1);
  // Watch the selected value of likedRecipe
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [showSelectMenu, setShowSelectMenu] = useState(false);

//   console.log("showSelectMenu==>", showSelectMenu);
//   form data handler
  const onSubmit = (data) => {
    console.log(data);
    const msg=`(${data.likedRecipe}, Suggestion: ${data.suggestion} ) - ${data.review}`
    const newReview={
        name:user?.displayName||user?.email,
        rating:userRating,
        details:msg
    }

    axiosPublic.post('/reviews',newReview)
    .then(res=>{
        console.log("POST a movie==>",res.data);
    })


  };

  const handleRating = (rating) => {
    console.log(rating);
    setUserRating(rating);
  };

  // axios.get(`/payments/${user?.email}?purchasedItems=true`)
  //   useEffect(() => {
  //     //   fetch previous purchased items
  //     axios.get('/museenu')
  //     .then((res) => {
  //       console.log("res data=>", res.data);
  //     });
  //   }, []);

  return (
    <div>
      <SectionTitle
        heading={"GIVE A Review..."}
        subHeading={"Sharing is Caring!!!"}
      ></SectionTitle>

      {/* review form */}
      <div className="w-2/3 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-100 p-10">
          <div className="flex flex-col justify-center items-center w-full mb-5">
            <label className="form-control w-1/3 text-center">
              <div className="label">
                <span className="label-text text-2xl">Rate Us!</span>
              </div>
            </label>
            <div className="w-1/3">
              <Rating
                value={userRating}
                onChange={(rating) => handleRating(rating)}
              />
            </div>
          </div>

          {/* dynamic purchased food items' unique list:likedRecipe */}
          <div className="w-full mb-5">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Which recipe you liked most?</span>
              </div>
            </label>
            <input
              type="text"
              value={selectedRecipe || ""}
              className="input input-bordered w-full bg-white"
              onClick={() => setShowSelectMenu(true)}
              readOnly
            />

            <select
              size={5}
              {...register("likedRecipe")}
              className={`input input-bordered w-full ${
                showSelectMenu ? "block" : "hidden"
              } hover:cursor-pointer `}
              style={{ height: "100px", overflowY: "auto" }}
            >
              {menu.map((item, idx) => (
                <>
                  <option
                    key={idx}
                    value={item.name}
                    onClick={(e) => {
                      setSelectedRecipe(e.target.value);
                      setShowSelectMenu(false);
                    }}
                    className="my-1 py-1 hover:bg-slate-100"
                  >
                    {item.name}
                  </option>
                  <hr />
                </>
              ))}
            </select>
          </div>

          {/* likedRecipe */}
          {/* <div className="flex flex-col w-full mb-5">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Which recipe you liked most?</span>
              </div>
            </label>
            <input
              type="text"
              placeholder="Recipe you liked most"
              className="input input-bordered w-full bg-white"
              {...register("likedRecipe")}
            />
          </div> */}

          {/* Suggestion */}
          <div className="flex flex-col w-full mb-5">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">
                  Do you have any suggestion for us?
                </span>
              </div>
            </label>
            <input
              type="text"
              placeholder="Suggestion"
              className="input input-bordered w-full bg-white"
              {...register("suggestion")}
            />
          </div>

          {/* review */}
          <div className="flex flex-col mb-5 w-full">
            <label className="form-control">
              <div className="label">
                <span className="label-text">
                  Kindly express your care in a short way.
                </span>
              </div>
            </label>
            <textarea
              className="textarea textarea-bordered h-24 w-full"
              placeholder="Review in detail"
              {...register("review")}
            ></textarea>
          </div>

          {/* <input type="submit" /> */}

          <button className="btn bg-[#835D23] text-white text-lg mt-5">
            Send Review <BsRocketTakeoff></BsRocketTakeoff>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
