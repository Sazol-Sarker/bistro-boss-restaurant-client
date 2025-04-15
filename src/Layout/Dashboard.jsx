import { NavLink, Outlet } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FaWallet } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { FcRating } from "react-icons/fc";
import { IoOptionsOutline } from "react-icons/io5";
import { FaBagShopping } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import useCart from "../hooks/useCart";
import AuthContext from "../providers/AuthProvider/AuthContext";
import { useEffect, useState } from "react";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  const { cart, isLoading } = useCart();
  const [isAdmin, isAdminLoading] = useAdmin();
  // if (isLoading || isAdminLoading) {
  //   return (
  //     <div className="flex items-center justify-center">
  //       <span className="loading loading-dots loading-xs"></span>
  //       <span className="loading loading-dots loading-sm"></span>
  //       <span className="loading loading-dots loading-md"></span>
  //       <span className="loading loading-dots loading-lg"></span>
  //     </div>
  //   );
  // }
  // const [dynamicNavLinks, setDynamicNavLinks] = useState(null);

  // console.log("cart.length in dashboard.jsx=>", cart.length);

  // admin decision
  // const isAdmin = false;
  // console.log("isAdmin in dashboard=>",isAdmin);

  // const adminNavLinks = (
  //   <>
  //     <ul>
  //       <li className="menu uppercase">
  //         <NavLink to="/dashboard/adminHome">
  //           <IoHome className="text-red-500 text-lg" />
  //           admin home
  //         </NavLink>
  //       </li>
  //       <li className="menu uppercase">
  //         <NavLink to="/dashboard/addItems">
  //           <SlCalender />
  //           add items
  //         </NavLink>
  //       </li>
  //       <li className="menu uppercase">
  //         <NavLink to="/dashboard/manageItems">
  //           <FaWallet />
  //           manage items
  //         </NavLink>
  //       </li>
  //       <li className="menu uppercase">
  //         <NavLink to="/dashboard/cart">
  //           <FaShoppingCart />
  //           manage bookings
  //         </NavLink>
  //       </li>
  //       <li className="menu uppercase">
  //         <NavLink to="/dashboard/allUsers">
  //           <MdReviews className="text-lg" />
  //           all users
  //         </NavLink>
  //       </li>
  //       {/* <li className="menu uppercase">
  //         <NavLink to="">
  //           <FcRating />
  //           my booking
  //         </NavLink>
  //       </li> */}
  //     </ul>
  //   </>
  // );

  // const userNavLinks = (
  //   <>
  //     <ul>
  //       <li className="menu uppercase">
  //         <NavLink to="/dashboard/userHome">
  //           <IoHome className="text-red-500 text-lg" />
  //           user home
  //         </NavLink>
  //       </li>
  //       <li className="menu uppercase">
  //         <NavLink to="/dashboard/payment">
  //           <SlCalender />
  //           reservation
  //         </NavLink>
  //       </li>
  //       <li className="menu uppercase">
  //         <NavLink to="/dashboard/paymentHistory">
  //           <FaWallet />
  //           payment history
  //         </NavLink>
  //       </li>
  //       <li className="menu uppercase">
  //         <NavLink to="/dashboard/cart">
  //           <FaShoppingCart />
  //           my cart <span className="font-bold">({cart?.length})</span>
  //         </NavLink>
  //       </li>
  //       <li className="menu uppercase">
  //         <NavLink to="">
  //           <MdReviews className="text-lg" />
  //           add review
  //         </NavLink>
  //       </li>
  //       <li className="menu uppercase">
  //         <NavLink to="">
  //           <FcRating />
  //           my booking
  //         </NavLink>
  //       </li>
  //     </ul>
  //   </>
  // );

  // useEffect(() => {
  //   if (!isAdminLoading)
  //     isAdmin
  //       ? setDynamicNavLinks(adminNavLinks)
  //       : setDynamicNavLinks(userNavLinks);
  // }, [isAdmin,isAdminLoading]);

  return (
    <>
      <title>Bistro Boss | Dashboard</title>
      {/*left sided drawer */}
      <div className="w-full flex items-start gap-x-5 border-2 border-blue-300">
        <div className="bg-[#D1A054] w-64 min-h-screen px-2">
          <div className="left-0">{
            
            isAdmin?<ul>
            <li className="menu uppercase">
              <NavLink to="/dashboard/adminHome">
                <IoHome className="text-red-500 text-lg" />
                admin home
              </NavLink>
            </li>
            <li className="menu uppercase">
              <NavLink to="/dashboard/addItems">
                <SlCalender />
                add items
              </NavLink>
            </li>
            <li className="menu uppercase">
              <NavLink to="/dashboard/manageItems">
                <FaWallet />
                manage items
              </NavLink>
            </li>
            <li className="menu uppercase">
              <NavLink to="/dashboard/bookings">
                <FaShoppingCart />
                manage bookings
              </NavLink>
            </li>
            <li className="menu uppercase">
              <NavLink to="/dashboard/allUsers">
                <MdReviews className="text-lg" />
                all users
              </NavLink>
            </li>
            {/* <li className="menu uppercase">
              <NavLink to="">
                <FcRating />
                my booking
              </NavLink>
            </li> */}
          </ul>
          
          :
          <ul>
        <li className="menu uppercase">
          <NavLink to="/dashboard/userHome">
            <IoHome className="text-red-500 text-lg" />
            user home
          </NavLink>
        </li>
        <li className="menu uppercase">
          {/* <NavLink to="/dashboard/payment"> */}
          <NavLink to="/dashboard/reservation">
            <SlCalender />
            reservation
          </NavLink>
        </li>
        <li className="menu uppercase">
          <NavLink to="/dashboard/paymentHistory">
            <FaWallet />
            payment history
          </NavLink>
        </li>
        <li className="menu uppercase">
          <NavLink to="/dashboard/cart">
            <FaShoppingCart />
            my cart <span className="font-bold">({cart?.length})</span>
          </NavLink>
        </li>
        <li className="menu uppercase">
          <NavLink to="/dashboard/addReview">
            <MdReviews className="text-lg" />
            add review
          </NavLink>
        </li>
        <li className="menu uppercase">
          <NavLink to="/dashboard/bookings">
            <FcRating />
            my booking
          </NavLink>
        </li>
      </ul>
          }</div>
          {/* <div className="left-0">{isAdmin ? adminNavLinks : userNavLinks}</div> */}
          <div className="divider"></div>
          {/* shared navbar */}
          <div>
            <ul>
              <li className="menu uppercase">
                <NavLink to="/">
                  <IoHome className="text-red-500 text-lg" />
                  home
                </NavLink>
              </li>
              <li className="menu uppercase">
                <NavLink to="/menu">
                  <IoOptionsOutline />
                  menu
                </NavLink>
              </li>
              <li className="menu uppercase">
                <NavLink to="/order/offered">
                  <FaBagShopping />
                  order food
                </NavLink>
              </li>
              <li className="menu uppercase">
                <NavLink to="/contact">
                  <IoMail />
                  contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        {/* right div */}
        <div className="w-full border-2 border-white">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
