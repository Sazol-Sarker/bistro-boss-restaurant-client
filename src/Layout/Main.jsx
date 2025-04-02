import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./../Pages/Shared/Footer/Footer";
import NavBar from "./../Pages/Shared/NavBar/NavBar";

const Main = () => {
  const location=useLocation()
  // console.log("Location=>",location);
  const noHeaderFooter=location.pathname.includes("/login") || location.pathname.includes('/register')
  return (
    <div>
      <title>Bistro Boss | Home Page</title>
      {/* <h2>Main layout</h2> */}
      {noHeaderFooter||<NavBar></NavBar>}
      
      <Outlet></Outlet>
      
      {noHeaderFooter||<Footer></Footer>}
      
    </div>
  );
};

export default Main;
