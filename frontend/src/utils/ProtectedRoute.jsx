import React from "react";
import { Navigate, Outlet} from "react-router-dom";

const ProtectedRoute = ({ user }) => {

  const isLoggedIn = window.localStorage.getItem("isLoggedIn")
  const userType = window.localStorage.getItem("userType")


  return isLoggedIn === "true"?<Outlet /> : <Navigate to="/" />
};

export default ProtectedRoute;
