import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./../Pages/Shared/Footer/Footer";
import NavBar from "./../Pages/Shared/NavBar/NavBar";

const Main = () => {
  const location=useLocation()
  // console.log("Location=>",location);
  const isLoginPage=location.pathname.includes("/login")
  return (
    <div>
      <title>Bistro Boss | Home Page</title>
      {/* <h2>Main layout</h2> */}
      {isLoginPage||<NavBar></NavBar>}
      
      <Outlet></Outlet>
      
      {isLoginPage||<Footer></Footer>}
      
    </div>
  );
};

export default Main;
