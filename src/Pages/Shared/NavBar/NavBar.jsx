import { Link } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import userLogo from "../../../assets/home/user.png";
const NavBar = () => {
  const links = (
    <>
      <li>
        <Link to="/">HOME</Link>
      </li>
      <li>
        <Link to="/contact">CONTACT US</Link>
      </li>
      <li>
        <Link to="/dashboard">DASHBOARD</Link>
      </li>
      <li>
        <Link to="/menu" className="flex items-center">
          <p>OUR MENU</p>
          <img
            className="w-5"
            src="https://img.icons8.com/?size=80&id=23072&format=png"
            alt=""
          />
        </Link>
      </li>
      <li>
        <Link to="/shop" className="flex items-center">
          <p>OUR SHOP</p>
        </Link>
      </li>
      <Link to="" className="flex items-center">
        <p>SIGNOUT</p>

        <img
          className=" ml-2 w-8 border-2 rounded-full"
          src={userLogo}
          alt=""
        />
      </Link>
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
        <Link to="" className="btn btn-ghost text-lg md:text-3xl">
          Bistro Boss
        </Link>
      </div>

      <div className="navbar-end text-sm md:text-lg hidden lg:block mr-1">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
    </div>
  );
};

export default NavBar;
