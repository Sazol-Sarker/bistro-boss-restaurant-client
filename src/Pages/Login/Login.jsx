import loginBannerImg from "../../assets/others/authentication1.png";
import loginBg from "../../assets/others/authentication.png";
import { FaFacebookF } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";

import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import { useContext, useEffect } from "react";
import AuthContext from "../../providers/AuthProvider/AuthContext";
import { Link } from 'react-router-dom';


const Login = () => {

  const {name}=useContext(AuthContext)
  console.log(name);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLoginForm = (e) => {
    // stop reloading
    e.preventDefault();

    // collect form data
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const captcha = form.captcha.value;
    // console.log({ email, password, captcha });

    // captcha validation
    if (validateCaptcha(captcha)) {
      console.log("Captcha Matched");

      // log in process initiate


      // clear the form
      form.reset()
    } else {
      console.log("Captcha Does Not Match");
    }

    
  };
  return (
    <>
      <title>Bistro Boss | Login</title>

      <div
        className="min-h-screen flex items-center justify-center px-4 md:px-10"
        style={{
          backgroundImage: `url(${loginBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 items-center bg-white/70 p-10 rounded-xl shadow-lg max-w-6xl w-full">
          {/* Left side: Image */}
          <div className="hidden md:flex items-center justify-center">
            <img
              src={loginBannerImg}
              alt="Login Banner"
              className="max-w-sm md:max-w-md "
            />
          </div>

          {/* Right side: Login Form */}
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

            <form onSubmit={handleLoginForm} className="space-y-4">
              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Password */}
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text font-bold">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Captcha */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Captcha</span>
                </label>
                <LoadCanvasTemplate />
                <div className="flex items-center justify-between mb-6">
                  {/* <span className="text-lg font-semibold italic">U A g l u o</span> */}
                  {/* <button className="text-blue-500 underline">Reload Captcha</button> */}
                </div>
                <input
                  type="text"
                  name="captcha"
                  placeholder="Type captcha here"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Login Button */}
              <button className="btn bg-[#C2996D] text-white w-full mt-4">
                Sign In
              </button>

              {/* Signup Link */}
              <p className="text-center text-[#D1A054] text-sm mt-4">
                New here? &nbsp;
                <Link to="/register" className=" font-semibold">
                  Create a New Account
                </Link>
              </p>

              {/* Social Login */}
              <div className="text-center mt-4">
                <p>Or sign in with</p>
                <div className="flex justify-center space-x-6 mt-2">
                  <button className="btn btn-circle btn-outline"><FaFacebookF />
                  </button>
                  <button className="btn btn-circle btn-outline"><FaGoogle />
                  </button>
                  <button className="btn btn-circle btn-outline"><FaGithub />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
