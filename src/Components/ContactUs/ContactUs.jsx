import { useForm } from "react-hook-form";
import Location from "../../Pages/Dashboard/Location/Location";
import Footer from "../../Pages/Shared/Footer/Footer";
import NavBar from "../../Pages/Shared/NavBar/NavBar";
import SectionTitle from "./../SectionTitle/SectionTitle";
import useAuth from "../../hooks/useAuth";
import { FaTelegram } from "react-icons/fa6";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import CoverImg from "../../Pages/Shared/CoverImg/CoverImg";
import contactCoverImg from "../../assets/contact/banner.jpg";

const recaptchaKey = import.meta.env.VITE_RECAPTCHA_CLIENT_KEY;
import useAxiosPublic from './../../hooks/useAxiosPublic';
import { toast } from "react-toastify";

const ContactUs = () => {
  const { register, handleSubmit, setValue,reset } = useForm();
  const { user } = useAuth();
  const axiosPublic=useAxiosPublic()
  const [recaptchaToken, setRecaptchaToken] = useState("");

  const onChange = (token) => {
    // console.log("Captcha value:", token);
    setRecaptchaToken(token);
  };

  //   handle form data
  const onSubmit = (data) => {
    // console.log(data);
    setValue("contactorEmail", user?.email);
    setValue("contactorName", user?.displayName);

    // send mail with data
    data.token = recaptchaToken;

    // Client POST API TO Express server for captcha verification
    // TOCHECK: check captcha, send mail
    axiosPublic.post('/contactUs',data)
    .then(res=>{
      // console.log("Contact with captcha response=>>",res.data);
      if(res.data.insertedId){
        toast('Message sent. Thanks for reaching out!')
        reset()
      }
    })


    // console.log("data=>", data);
  };

  // console.log("contact page - user==>", user);

  return (
    <div>
      <title>Bistro Boss | Contact Us</title>

      <NavBar></NavBar>
      <CoverImg
        heading={"contact us"}
        subHeading={"would you like to try a dish or have any complain?"}
        coverImg={contactCoverImg}
      ></CoverImg>

      <Location></Location>
      <SectionTitle
        heading={"CONTACT FORM"}
        subHeading={"Send Us a Message"}
      ></SectionTitle>

      {/* reservation form */}
      <div className="w-full max-w-lg mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-slate-100 p-10 flex flex-col items-center"
        >
          {/* 1st row */}
          <div className="w-full flex justify-between gap-x-4">
            {/* name */}
            <div className="w-full mb-5">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Name*</span>
                </div>
              </label>

              <input
                type="text"
                defaultValue={user?.displayName}
                // defaultValue={user?.displayName || "Anonymous"}
                // placeholder="Your Name"
                {...register("contactorName")}
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
                  defaultValue={user?.email}
                  readOnly
                  //   placeholder="Email"
                  {...register("contactorEmail")}
                  className="input input-bordered w-full  bg-white"
                  required
                />
              </div>
            </div>
          </div>
          {/* 2nd row */}
          <div className="w-full mb-5 ">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Phone*</span>
              </div>
            </label>
            <div className="flex ">
              <input
                type="text"
                minLength={11}
                maxLength={14}
                placeholder="Enter your phone"
                {...register("contactorPhoneNo")}
                className="input input-bordered w-full  bg-white"
                required
              />
            </div>
          </div>

          {/* 3rd row */}
          {/* review */}
          <div className="flex flex-col mb-5 w-full">
            <label className="form-control">
              <div className="label">
                <span className="label-text">
                  Kindly express your care <span className="hidden md:inline">in a short way</span> <span className="inline md:hidden">shortly</span>.
                </span>
              </div>
            </label>
            <textarea
              className="textarea textarea-bordered h-24 w-full"
              placeholder="Write your message here"
              {...register("review")}
              required
            ></textarea>
          </div>

          {/* recaptcha */}
          <div>
            <ReCAPTCHA sitekey={recaptchaKey} onChange={onChange} />
          </div>
          {/* <input type="submit" /> */}

          <button className="btn bg-[#835D23] text-white text-lg mt-5 flex items-center justify-center">
            Send Message <FaTelegram className="text-xl"></FaTelegram>
          </button>
        </form>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default ContactUs;
