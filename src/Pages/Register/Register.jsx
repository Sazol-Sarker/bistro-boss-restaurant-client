import registerBannerImg from "../../assets/others/authentication1.png";
import registerBg from "../../assets/others/authentication.png";
import { Link, useNavigate } from "react-router-dom";

import { useContext, useState } from "react";
import AuthContext from "../../providers/AuthProvider/AuthContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { registerUser, updateUserProfile, verifyEmailLink } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // TODO: update later how to assign role
//  const isAdmin=true
const role="user"
  // const handleRegisterForm = (e) => {
  //   // stop reload
  //   e.preventDefault();
  //   // collect form data
  //   const form = e.target;
  //   const name = form.name.value;
  //   const email = form.email.value;
  //   const password = form.password.value;

  //   // Password validation by regex

  //   // create user
  //   registerUser(email, password)
  //     .then((result) => {
  //       console.log("User created=>", result.user);
  //       // clear the form
  //       form.reset();
  //     })
  //     .catch((err) => {
  //       console.log("ERR=>", err.code);
  //     });
  // };

  // USING REACT-HOOK-FORM : data collect, validation, reset form
  const handleRegister = (formData) => {
    // console.log("formData=>", formData);
    const { name, email, password } = formData;

    // register firebase user
    registerUser(email, password)
      .then((result) => {
        // console.log("Register=>", result.user);
        toast("User created!");

        // POST API
        const newUser = { name, email,role };
        axios.post("http://localhost:5000/users", newUser).then((res) => {
          // console.log("DB response, user create=>", res.data);
          if (res.data.insertedId)
            toast(`New user ${email} created in DB, welcome!`);
        });

        // update user profile
        updateUserProfile(
          name
          // photoURL: "https://example.com/jane-q-user/profile.jpg",
        )
          .then(() => {
            toast("Profile updated");
            // console.log("Profile updated");
          })
          .catch((error) => {
            console.log("error=>", error);
          });

        // verify user email
        verifyEmailLink()
          .then(() => {
            toast(`Verification link sent to ${email} `);
          })
          .catch((error) => {
            console.log(error);
          });

        // reset form
        reset();
        // redirect to login
        navigate("/login");
      })
      .catch((error) => {
        toast(`Registration error: ${error}`);
        // console.log("Register error=>", error);
      });

    //
  };

  return (
    <>
      <title>Bistro Boss | Register</title>

      <div
        className="min-h-screen flex items-center justify-center px-4 md:px-10"
        style={{
          backgroundImage: `url(${registerBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 items-center bg-white/70 p-10 rounded-xl shadow-lg max-w-6xl w-full">
          {/* Right side: Login Form */}
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

            {/* <form onSubmit={handleRegisterForm} className="space-y-4"> */}
            <form
              // onSubmit={handleSubmit((data) => console.log(data))}
              onSubmit={handleSubmit(handleRegister)}
              className="space-y-4"
            >
              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is required.",
                    },
                  })}
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  // required
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required.",
                    },
                  })}
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  // required
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text font-bold">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={!showPassword ?"password":"text"}
                    name="password"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required.",
                      },
                      minLength: {
                        value: 6,
                        message: "Password length must be greater equal 6.",
                      },
                      maxLength: {
                        value: 30,
                        message: "Password length must be less equal 20.",
                      },
                      pattern: {
                        value:
                          /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                        message:
                          "Password must contain at least a lowercase, an uppercase, a digit and a special character!",
                      },
                    })}
                    placeholder="Enter your password"
                    className="input input-bordered w-full"
                    // required
                  />
                  {!showPassword ? (
                    <FaRegEye
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 cursor-pointer -translate-y-1/2 text-xl"
                    />
                  ) : (
                    <FaRegEyeSlash
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3  top-1/2 cursor-pointer -translate-y-1/2 text-xl"
                    />
                  )}
                </div>

                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              {/* Sign Up Button */}
              <button className="btn bg-[#C2996D] text-white w-full mt-4">
                Sign Up
              </button>

              {/* login Link */}
              <p className="text-center text-[#D1A054] text-sm mt-4">
                Already registered? &nbsp;
                <Link to="/login" className=" font-semibold">
                  Go to log in
                </Link>
              </p>

              {/* Social Login */}
              <div className="divider"></div>

              <SocialLogin></SocialLogin>
            </form>
          </div>
          {/* Left side: Image */}
          <div className="hidden md:flex items-center justify-center">
            <img
              src={registerBannerImg}
              alt="Register Banner"
              className="max-w-sm md:max-w-md "
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
