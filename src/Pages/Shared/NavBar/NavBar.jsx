import { Link, useNavigate } from "react-router-dom";
import userLogo from "../../../assets/home/user.png";
import navbarLogo from "../../../assets/navbarLogo.png";
import { useContext } from "react";
import AuthContext from "../../../providers/AuthProvider/AuthContext";
import { toast } from "react-toastify";
import { BsCart4 } from "react-icons/bs";
import './NavBar.css'
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";
import { FaDoorOpen } from "react-icons/fa6";

const NavBar = () => {
  const { user, setUser, logoutUser } = useContext(AuthContext);
   const [isAdmin] = useAdmin(); 
  const {cart}=useCart()
  const navigate = useNavigate();
  console.log("user -- userName in NavBar==>",user,user?.displayName);

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        toast("Logout successfull !");
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/");
  };

  const links = (
    <>
      <li>
        <Link to="/">HOME</Link>
      </li>
      {
        isAdmin?"":<li>
        <Link to="/contact">CONTACT US</Link>
      </li>
      }

      {!user && (
        <li>
          <Link to="/register">REGISTER</Link>
        </li>
      )}

      {user?isAdmin? <li>
          <Link to="/dashboard/adminHome">DASHBOARD</Link>
        </li>:<li>
          <Link to="/dashboard/userHome">DASHBOARD</Link>
        </li>:<li>
          <Link to="/dashboard/userHome">DASHBOARD</Link>
        </li>
      }
      <li>

        <Link to="/menu" className="flex items-center uppercase">
          Our menu
          <div className=" text-lg">
            <BsCart4 className="badge rounded-full text-lg"/> 
            <sub className="absolute right-0 bottom-1 badge rounded-full bg-red-500 p-2">{cart.length}</sub>
          </div>
          
        </Link>
      </li>
      <li>
        {/* <Link to={`/order/${category} `} className="flex items-center uppercase"> */}
        <Link to={`/order/offered`} className="flex items-center uppercase">
          <p>Order food</p>
        </Link>
      </li>
      {user ? (
        <Link
          to="/"
          onClick={handleLogout}
          className="flex  ml-10 items-center gap-x-2 hover:text-blue-500"
        >
          <div className="flex flex-col items-center">
            <img
              className=" ml-2 w-5 border-2 rounded-full"
              src={userLogo}
              alt="logout"
            />
            <p>{user?.displayName}</p>
          </div>
          <div>
            <p className="flex items-center gap-x-1">SIGNOUT <FaDoorOpen className="text-xl text-blue-400"></FaDoorOpen></p>
            
          </div>
        </Link>
      ) : (
        <li>
          <Link to="/login">LOG IN</Link>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar max-w-7xl fixed z-10 bg-opacity-40 bg-black text-white font-bold shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-blue-200 text-teal-400 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-lg md:text-3xl">
          {/* Bistro Boss */}
          <img src={navbarLogo} alt="navbarLogo" className="w-40 md:w-52" />
        </Link>
      </div>

      <div className="navbar-center text-sm md:text-lg hidden lg:block mr-1">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
    </div>
  );
};

export default NavBar;
