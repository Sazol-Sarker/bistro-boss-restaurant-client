import React, { useContext } from "react";
import AuthContext from "../providers/AuthProvider/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  // console.log("Private route location=>>", location);

  if (loading) {
    <>
      <span className="loading loading-dots loading-xs"></span>
      <span className="loading loading-dots loading-sm"></span>
      <span className="loading loading-dots loading-md"></span>
      <span className="loading loading-dots loading-lg"></span>
    </>;
  }

  if (user) return children;

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};
export default PrivateRoutes;

//Navigate Redirects the user to /target-path immediately.

// 🔍 Key Props of <Navigate />
// Prop	Description
// to	The path to navigate to (e.g., "/dashboard")
// replace	If true, replaces the current history entry (prevents "back" navigation)
// state	Sends additional data (like { from: "/previous-page" })
