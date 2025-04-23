import axios from "axios";
import { useContext } from "react";
import AuthContext from "../providers/AuthProvider/AuthContext";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000/",
});

const useAxiosSecure = () => {
  // start the chaos: axios interceptor
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  // Add a AXIOS request interceptor
  axiosSecure.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      const token = localStorage.getItem("access-token");
      // console.log("Request stopped by interceptor=>", token);

      // interceptor assigning token in headers for server hitting apis
      config.headers.authorization = `Bearer ${token} `;
      // console.log("token sent by interceptor=>",  config.headers.authorization );


      return config;
    },
    function (error) {
      // Do something with request error

      return Promise.reject(error);
    }
  );

  // Add  a axios response interceptor
  axiosSecure.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      // console.log("response caught in interceptor=>",response);

      return response;
    },
    async function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      // console.log("Error in interceptor=>>", error);
      const status = error.response.status;
      // console.log("status error=>>", status);
      //gola dhakka dibo
      // invalid jwt token response
      if (status == 401 || status == 403) {
        // import logout from useAuth
        //**call logout() here
        await logoutUser();

        navigate("/login");
        //+++ add dependency in onAuthStateChange==> useffect[axiosPublic]
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
