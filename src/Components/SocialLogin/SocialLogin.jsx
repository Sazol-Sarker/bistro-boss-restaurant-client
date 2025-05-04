import { FaGoogle } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { useContext } from "react";
import AuthContext from "./../../providers/AuthProvider/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SocialLogin = () => {
  const { googleSignIn, githubLogin } = useContext(AuthContext);
  const { user, setLoading } = useContext(AuthContext);
  // console.log("user in social=>",user);
  const navigate = useNavigate();

  const handleGoogleLogIn = () => {
    googleSignIn()
      .then((result) => {
        if (result.user.emailVerified) {
          if (user) {
            toast("Login successful via google!");
            // console.log("Google Sign In=>", result.user);
            setLoading(false);
            navigate("/dashboard");
          }
        }
      })
      .catch((error) => {
        // console.log("Google sign in error=>", error);
      });
  };

  const handleGithubLogin = () => {
    githubLogin()
      .then((result) => {
        
          toast("Login successful via github!");
          // console.log("Google Sign In=>", result.user);
          setLoading(false);
          navigate("/dashboard");
        
      })
      .catch((error) => {
        // console.log("Google sign in error=>", error);
      });
  };

  return (
    <div className="text-center my-4">
      <p>Or sign up with</p>
      <div className="flex justify-center space-x-6 my-2">
        <button className="btn btn-circle btn-outline">
          <FaFacebookF />
        </button>
        <button
          onClick={handleGoogleLogIn}
          className="btn btn-circle btn-outline"
        >
          <FaGoogle />
        </button>
        <button
          onClick={handleGithubLogin}
          className="btn btn-circle btn-outline"
        >
          <FaGithub />
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
