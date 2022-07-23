import { Checkbox, Form as FormAnt, Input, message } from "antd";
import { Field, FieldProps, Form, Formik } from "formik";
import "./Login.scss";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loginSchema } from "./validation";
import { handleLoginStaffAPI } from "./loginStaffAPI";
import * as actions from "../../store/actions";

const { Password } = Input;
const LoginPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const handleLogin = async (values) => {
    console.log("check info ", values);
    const email = values ? values.email : "";
    const password = values ? values.password : "";
    try {
      await handleLoginStaffAPI(email, password).then((res) => {
        if (res.errorCode === 0) {
          const dataStaff = res.data;
          dispatch(dispatch(actions.staffLoginSuccess(dataStaff)));
          localStorage.setItem("Staff ExternalId", res.data.ExternalId);
          navigate("/staff-personal-page");
        } else {
          message.error("login fail");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wrapper">
      <div className="loginPage">
        <div className="logoLogin">GH GYM</div>
        <div className="titlePage">
          <div className="textLoginPage"></div>
          {isLogin.isAuthenticated ? (
            ""
          ) : (
            <div className="textRecovery" style={{ color: "red" }}>
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
              // console.log(values);
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
                          className="inputLogin"
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
                          className="inputLogin"
                          placeholder="Password"
                        />
                      )}
                    </Field>
                  </FormAnt.Item>
                  <FormAnt.Item>
                    <Field>
                      {({}) => (
                        <Checkbox className="checkboxLogin">
                          Remember me
                        </Checkbox>
                      )}
                    </Field>
                  </FormAnt.Item>
                  <div className="btnContainer">
                    <button
                      className="btnLogin"
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
