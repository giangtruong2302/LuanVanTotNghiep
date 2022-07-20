import { Checkbox, Form as FormAnt, Input, message } from "antd";
import { Field, FieldProps, Form, Formik } from "formik";
import "./Login.scss";
import ReactDOM from 'react-dom';
import Facebook from './loginFacebook/faceBook';
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loginSchema } from "./validation";
import Google from "./loginGoogle/loginGoogle";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLoginUserAPI } from "./loginUserAPI";
import * as actions from "../../../store/actions";
import bgLogin from "../../../assets/images/banner/bgLogin.jpg"
const { Password } = Input;
const CustomerLoginPage = () => {

  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (values) => {
    console.log("check info ", values);
    const email = values ? values.email : "";
    const password = values ? values.password : "";
    try {
      await handleLoginUserAPI(email, password)
        .then((res) => {

          if (res.errorCode === 0) {
            const dataCus = res.data;
            dispatch(dispatch(actions.cusLoginSuccess(dataCus)));
            navigate(`/`);
          } else {
            message.error("login fail");
          }

        })

    } catch (error) {
      console.log(error);
    }
  };


  return (

    <div className="wrapperBg">

      <img className="bgLogin" src={bgLogin}></img>
      <div className="loginPage">
        <div className="logoLogin">
          {/* <img src={logo} alt="BIZBOOKLY" />
           */}
          GH GYM
        </div>
        <div className="titlePage">
          <div className="textLoginPage"></div>
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
                      {({ }) => (
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
                  <Google />
                  <Facebook />
                </Form>

              );
            }}
          </Formik>
          <div className={"loginForm"}>
            <Link to={"/reset-pass"} className={"forgotPassword"}>
              Forgot password
            </Link>
            <span className="centerForgotPass"> / </span>
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

export default CustomerLoginPage;
