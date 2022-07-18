import { Checkbox, Form as FormAnt, Input, message } from "antd";
import { Field, FieldProps, Form, Formik } from "formik";
import classes from "./styles.module.scss";
import * as actions from "../../../store/actions";
import ReactDOM from "react-dom";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loginSchema } from "./validation";
import { handleLoginAPI } from "./loginAPI";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const { Password } = Input;
const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const handleLogin = async (values) => {
    // console.log("check info ", values);
    const email = values ? values.email : "";
    const password = values ? values.password : "";
    try {
      await handleLoginAPI(email, password)
        .then((res) => {
          const data = res.data;
          dispatch(dispatch(actions.userLoginSuccess(data)));
          navigate("/admin");
        })
        .catch(() => {
          message.error("login fail");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.loginPage}>
        <div className={classes.logoLogin}>GH GYM</div>
        <div className={classes.titlePage}>
          <div className={classes.textLoginPage}></div>

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
                          className={classes.inputLogin}
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
                          className={classes.inputLogin}
                          placeholder="Password"
                        />
                      )}
                    </Field>
                  </FormAnt.Item>
                  <FormAnt.Item>
                    <Field>
                      {({}) => (
                        <Checkbox className={classes.checkboxLogin}>
                          Remember me
                        </Checkbox>
                      )}
                    </Field>
                  </FormAnt.Item>
                  <div className={classes.btnContainer}>
                    <button
                      className={classes.btnLogin}
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

export default AdminLoginPage;
