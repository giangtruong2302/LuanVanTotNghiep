import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = Boolean(localStorage.getItem("user"));
  const isLogin = useSelector((state) => state.user.isLoggedIn);
  const roleId = useSelector((state) => state.user?.userInfo?.roleId);
  console.log("check is login: ", isLogin);
  if (!isLogin || isLogin === false || (roleId !== 1 && roleId !== 2)) {
    return <Navigate to="/admin-login" state={{ form: location }} replace />;
  }
  // if (deCodeToken.exp < Date.now() / 1000) {
  //   return <Navigate to="/login" state={{ form: location }} replace />
  // }
  return (
    <>
      <div> {children}</div>
    </>
  );
};
export default RequireAuth;
