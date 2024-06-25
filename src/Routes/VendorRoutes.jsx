import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const VendorRoutes = () => {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("encryptedToken"));
  } catch (error) {
    console.error("Failed to parse user data from localStorage", error);
  }
  return user?.role === "vendor" ? <Outlet /> : <Navigate to="/login" />;
};

export default VendorRoutes;
