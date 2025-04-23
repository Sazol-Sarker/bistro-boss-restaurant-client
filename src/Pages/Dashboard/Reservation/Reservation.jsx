import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { BsRocketTakeoff } from "react-icons/bs";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinus, FaPlug, FaPlus, FaRegAddressBook } from "react-icons/fa6";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { BiSolidFoodMenu } from "react-icons/bi";
import Location from "../Location/Location";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { toast } from "react-toastify";

const Reservation = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, setValue, reset } = useForm();
  const [guestNumber, setGuestNumber] = useState(1);
  const [time, setTime] = useState(new Date());

  //   form data handler
  const onSubmit = (data) => {
    // console.log("reservation data==>", data);
    // by default : pending, admin will confirm
    data.status="pending"

    // validation
    const today = new Date().toISOString().split("T")[0];
    if (today > data.reservationDate) {
      toast("Please enter a valid date!");
      return;
    }

    // POST reservation data into DB
    axiosPublic.post("/reservations", data).then((res) => {
      // console.log("reservation post response=>", res.data);
      if (res.data.insertedId) {
        toast("Reservation confirm!");
        setGuestNumber(1);
        // clear the form
        reset();
      }
    });
  };
  return (
    <div>
      <title>Bistro Boss | Reservation</title>
      <SectionTitle
        heading={"BOOK A TABLE"}
        subHeading={"Reservation"}
      ></SectionTitle>

      {/* reservation form */}
      <div className="w-2/3 mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-slate-100 p-10 flex flex-col items-center"
        >
          <div className=" flex justify-between gap-x-1 w-full">
            {/* date */}
            <div className="w-full mb-5">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Date*</span>
                </div>
              </label>

              <input
                type="date"
                {...register("reservationDate")}
                className="input input-bordered w-full bg-white"
                required
              />
            </div>
            {/* time */}
            <div className="w-full mb-5">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Time*</span>
                </div>
              </label>
              <input
                type="time"
                {...register("reservationTime")}
                onChange={(e) => e.target.blur()}
                className="input input-bordered w-full bg-white"
                required
              />
            </div>
            {/* Guest */}
            <div className="w-full mb-5 ">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Guest*</span>
                </div>
              </label>
              <div className="flex ">
                <input
                  type="text"
                  // defaultValue={1}
                  value={guestNumber}
                  {...register("reservationGuest")}
                  className="input input-bordered w-3/5  bg-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => {
                    const newGuest = guestNumber + 1;
                    setGuestNumber(newGuest);
                    setValue("reservationGuest", newGuest);
                  }}
                  className=" w-1/5 bg-slate-200  hover:text-pink-500"
                >
                  <FaPlus className="w-full border-none text-xl border-l-2 border-gray-200 "></FaPlus>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    guestNumber > 1 ? setGuestNumber(guestNumber - 1) : ""
                  }
                  className=" w-1/5 bg-slate-400  hover:text-pink-500"
                >
                  <FaMinus className="w-full border-none text-xl border-l-2 border-gray-200 "></FaMinus>
                </button>
              </div>
            </div>
          </div>
          {/* 2nd row */}
          <div className=" flex justify-between gap-x-1">
            {/* name */}
            <div className="w-full mb-5">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Name*</span>
                </div>
              </label>

              <input
                type="text"
                defaultValue={user?.displayName || "Anonymous"}
                // placeholder="Your Name"
                {...register("reservationByName")}
                className="input input-bordered w-full bg-white"
                required
              />
            </div>
            {/* phone */}
            <div className="w-full mb-5">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Phone*</span>
                </div>
              </label>
              <input
                type="text"
                minLength={11}
                maxLength={14}
                placeholder="Phone Number"
                {...register("reservationPhnNo")}
                className="input input-bordered w-full bg-white"
                required
              />
            </div>
            {/* email */}
            <div className="w-full mb-5 ">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Email*</span>
                </div>
              </label>
              <div className="flex ">
                <input
                  type="email"
                  defaultValue={user?.email || "Anonymous@gmail.com"}
                  readOnly
                  //   placeholder="Email"
                  {...register("reservationEmail")}
                  className="input input-bordered w-full  bg-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* <input type="submit" /> */}

          <button className="btn bg-[#835D23] text-white text-lg mt-5 flex items-center justify-center">
            Book A Table <BiSolidFoodMenu />
          </button>
        </form>
      </div>

      <Location></Location>
    </div>
  );
};

export default Reservation;
