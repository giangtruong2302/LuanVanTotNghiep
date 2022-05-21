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

  return (
    <div className={"wrapper"}>
      <div className={"loginPage"}>
        <div className={"logoLogin"}>
          {/* <img src={logo} alt="BIZBOOKLY" />
           */}
          GH GYM
        </div>
        <div className={"titlePage"}>
          <div className={"textLoginPage"}></div>
          {isLogin.isAuthenticated ? (
            ""
          ) : (
            <div className={"textRecovery"} style={{ color: "red" }}>
              Invalid username or password
            </div>
          )}
          <Formik
            validationSchema={loginSchema}
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={async (values) => {
              handleLogin(values);
            }}
          >
            {({ errors, touched }) => {
              return (
                <Form>
                  <FormAnt.Item
                    validateStatus={
                      Boolean(touched?.email && errors?.email)
                        ? "error"
                        : "success"
                    }
                    help={
                      Boolean(touched?.email && errors?.email) && errors?.email
                    }
                  >
                    <Field name="email">
                      {({ field }) => (
                        <Input
                          {...field}
                          className={"inputLogin"}
                          placeholder="Username"
                        />
                      )}
                    </Field>
                  </FormAnt.Item>
                  <FormAnt.Item
                    validateStatus={
                      Boolean(touched?.password && errors?.password)
                        ? "error"
                        : "success"
                    }
                    help={
                      Boolean(touched?.password && errors?.password) &&
                      errors?.password
                    }
                  >
                    <Field name="password">
                      {({ field }) => (
                        <Input.Password
                          {...field}
                          className={"inputLogin"}
                          placeholder="Password"
                        />
                      )}
                    </Field>
                  </FormAnt.Item>
                  <FormAnt.Item>
                    <Field>
                      {({ field }) => (
                        <Checkbox className={"checkboxLogin"}>
                          Remember me
                        </Checkbox>
                      )}
                    </Field>
                  </FormAnt.Item>
                  <div className={"btnContainer"}>
                    <button
                      className={"btnLogin"}
                      type="submit"
                      style={{ cursor: "pointer" }}
                    >
                      Login
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
          <div className={"loginForm"}>
            <Link to={"/password-recovery"} className={"forgotPassword"}>
              Forgot password
            </Link>
            <span> / </span>
            <Link to={"/sign-up"} className={"forgotPassword"}>
              Sign up
            </Link>
            <div className={"versionPage"}>v1.0.0</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
