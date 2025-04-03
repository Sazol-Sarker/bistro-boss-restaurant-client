import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
// import Dashboard from "../Components/Dashboard/Dashboard";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from './../Layout/Dashboard';
import Cart from './../Pages/Shared/Cart/Cart';
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement:<ErrorPage></ErrorPage>,
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: <Menu></Menu>,
      },
      {
        path: "/order/:category",
        element: <Order></Order>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      // {
      //   path: "/dashboard",
      //   element: (
      //     <PrivateRoutes>
      //       <Dashboard></Dashboard>
      //     </PrivateRoutes>
      //   ),
      // },
    ],
  },
  {
    path:'/dashboard',
    errorElement:<ErrorPage></ErrorPage>,
    element:<PrivateRoutes>
    <Dashboard></Dashboard>
  </PrivateRoutes>,
  children:[
    
    {
      path:'cart',
      element:<Cart></Cart>
    }, 
    {
      path:'allUsers',
      element:<AllUsers></AllUsers>
    }
    // {
    //   path:'userHome',
    //   element:<userHome></userHome>
    // }, 
    // {
    //   path:'reservation',
    //   element:<Reservation></Reservation>
    // },
    // {
    //   path:'review',
    //   element:<Review></Review>
    // }, 
    // {
    //   path:'bookings',
    //   element:<Bookings></Bookings>
    // }

  ]
  }
]);

export default router;
