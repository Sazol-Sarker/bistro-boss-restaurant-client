import { Link, useNavigate } from "react-router-dom";
import userLogo from "../../../assets/home/user.png";
import navbarLogo from "../../../assets/navbarLogo.png";
import { useContext } from "react";
import AuthContext from "../../../providers/AuthProvider/AuthContext";
import { toast } from "react-toastify";
import { BsCart4 } from "react-icons/bs";
import { FaDoorOpen } from "react-icons/fa6";
import './NavBar.css';
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";

const NavBar = () => {
  const { user, setUser, logoutUser } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        toast("Logout successful!");
        setUser(null);
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const links = (
    <>
      <li><Link to="/">Home</Link></li>
      {!isAdmin && <li><Link to="/contact">Contact</Link></li>}
      {!user && <li><Link to="/register">Register</Link></li>}
      <li>
        <Link to={user ? (isAdmin ? "/dashboard/adminHome" : "/dashboard/userHome") : "/dashboard/userHome"}>
          Dashboard
        </Link>
      </li>
      <li>
        <Link to="/menu" className="flex items-center gap-1">
          Menu
          <div className="relative">
            <BsCart4 className="text-xl" />
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1 rounded-full">
              {cart.length}
            </span>
          </div>
        </Link>
      </li>
      <li><Link to="/order/offered">Order</Link></li>
    </>
  );

  return (
    <div className="navbar max-w-7xl mx-auto px-4 fixed z-20 bg-black bg-opacity-70 text-white shadow-md">
      <div className="navbar-start">
        {/* Mobile menu button */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost p-0">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white text-black rounded-box w-28"
          >
            {links}
            {user && (
              <li>
                <button onClick={handleLogout} className="flex items-center gap-2">
                  <FaDoorOpen className="text-blue-500" />
                  Sign Out
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="btn btn-ghost text-xl p-0">
          <img src={navbarLogo} alt="Navbar Logo" className="w-36 md:w-48" />
        </Link>
      </div>

      {/* Desktop links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-4">{links}</ul>
      </div>

      {/* User avatar and logout (desktop only) */}
      <div className="navbar-end">
        {user ? (
          <div className="hidden md:flex items-center gap-3">
            <div className="flex flex-col items-center">
              <img
                className="w-8 h-8 border-2 rounded-full"
                src={userLogo}
                alt="user"
              />
              <p className="text-xs">{user?.displayName}</p>
            </div>
            <button
              onClick={handleLogout}
              className=" lg:block flex items-center gap-1 text-blue-300 hover:text-white"
            >
              <FaDoorOpen className="text-lg" />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn btn-sm btn-outline text-white border-white hover:bg-white hover:text-black">
            Log In
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
