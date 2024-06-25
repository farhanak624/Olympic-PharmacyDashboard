import { Navigate, Outlet } from "react-router-dom";

const LoginCheck = () => {
  const user = JSON.parse(localStorage.getItem("encryptedToken"));
  console.log("logb");
  return user?.role == "admin" ? (
    <Navigate to="/admin" />
  ) : user?.role == "vendor" ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
};

export default LoginCheck;
