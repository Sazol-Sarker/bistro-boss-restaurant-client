import { Link } from "react-router-dom";
import errorImg from "../../assets/404.gif";
import { FaHome } from "react-icons/fa";
const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center">
       
        <img src={errorImg} className="w-3/4" alt="error 404 not found" />
      </div>
      <Link to="/" className="border-2 text-white bg-indigo-700 p-2 rounded-md">
        <button  className="flex items-center justify-center"><FaHome className="mr-2"></FaHome> Back to home</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
