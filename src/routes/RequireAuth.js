import Cookies from "js-cookie";
import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import classes from "./styles.module.scss";
import { Menu } from "../routes/index";
import { Fab } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import { SquaresFour } from "phosphor-react";

const RequireAuth = () => {
  let location = useLocation();
  const [isLoggedIn, setIsLogin] = useState(true);

  if (isLoggedIn === true) {
    return <Navigate to="/login" state={{ form: location }} replace />;
  }
  return (
    <>
      <Menu></Menu>
      <div className={classes.BackgroundLayout}> {children}</div>
      {/* <Fab>
        <SquaresFour size={24} color="#242423" weight="fill" />
      </Fab> */}
    </>
  );
};
export default RequireAuth;
