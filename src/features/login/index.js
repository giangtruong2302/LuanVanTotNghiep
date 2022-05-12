import { Checkbox, Form as FormAnt, Input } from "antd";
//$RECYCLE.BINimport { useAppDispatch, useAppSelector } from "app/hooks";
import logo from "../../assets/images/logo/logoGHGym.png";
import { Field, FieldProps, Form, Formik } from "formik";
//import Cookies from "js-cookie";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import { push } from "redux-first-history";
//import { loginActions } from "./loginSlice";
import "./Login.scss";
import { loginSchema } from "./validation";
import reactRouterDom from "react-router-dom";
import { Eye, EyeClosed, XCircle } from "phosphor-react";

const LoginPage = () => {
  //const dispatch = useAppDispatch();
  // const isLoggedIn = Boolean(Cookies.get("token"));
  // const isLogin = useAppSelector((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     //dispatch(push("/salon-select"));
  //   }
  // }, [isLoggedIn, dispatch]);

  // const handleLogin = useCallback(
  //   (values) => {
  //     //dispatch(loginActions.doLogin(values));
  //   },
  //   [dispatch]
  // );
  const handleShowHidePass = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = (values) => {
    console.log("check info ", values);
  };
  const [active, setActive] = React.useState(false);

  const handleClickSU = () => {
    setActive(true);
  };

  const handleClickSI = () => {
    setActive(false);
  };

  return (
    <div className={"backgroundContainer"}>
      <div
        className={`${"container"} ${
          active === true ? "right_panel_active" : ""
        }`}
        id={"container"}
      >
        <div className={`${"form_container"} ${"sign_up_container"}`}>
          <form id="formRegister" method="post" enctype="multipart/form-data">
            <h1>Create Account</h1>
            <div className={"social_container"}>
              <a href="#" className={"social"}>
                <box-icon type="logo" name="facebook"></box-icon>
              </a>
              <a href="#" className={"social"}>
                <box-icon name="google" type="logo"></box-icon>
              </a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" name="myName" placeholder="Name" />
            <input type="email" name="myEmail" placeholder="Email" />
            <input type="password" name="myPassword" placeholder="Password" />

            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className={`${"form_container"} ${"sign_in_container"}`}>
          <form id="formLogin" action="#">
            <h1>Sign in</h1>
            <div className={"social_container"}>
              <a href="#" className={"social"}>
                <box-icon type="logo" name="facebook"></box-icon>
              </a>
              <a href="#" className={"social"}>
                <box-icon name="google" type="logo"></box-icon>
              </a>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" id="emailLogin" />
            <input type="password" placeholder="Password" id="passwordLogin" />
            <a href="#">Forgot your password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className={"overlay_container"}>
          <div className={"overlay"}>
            <div className={`${"overlay_panel"} ${"overlay_left"}`}>
              <h1>Welcome Back</h1>
              <p>KIBI welcomes you back anytime, anywhere</p>
              <button className={"ghost"} id="signIn" onClick={handleClickSI}>
                Sign In
              </button>
            </div>
            <div className={`${"overlay_panel"} ${"overlay_right"}`}>
              <h1>Welcome to KIBI</h1>
              <p>Let us revamp your beauty</p>
              <button className={"ghost"} id="signUp" onClick={handleClickSU}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
