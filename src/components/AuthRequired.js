import React from "react";
import { Navigate, useLocation, Outlet} from "react-router-dom";
import useAuth from "../store/auth-context";

const AuthRequired = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (isLoggedIn === false) {
    return <Navigate to="/signin" state={{ returnURL: location.pathname + location.search }} replace />;
  }

  return <Outlet/>;
};

export default AuthRequired;
