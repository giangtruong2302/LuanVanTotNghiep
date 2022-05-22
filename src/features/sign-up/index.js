import { Form as FormAnt, Input } from "antd";
import { Field, Form, Formik } from "formik";
import { React, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { signupSchema } from "./validation";
import "./signUp.scss";

const SignUp = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const handleSignUp = (values) => {
    console.log("check values: ", values);
  };
  return (
    <div className={"wrapper"}>
      <div className={"loginPage"}>
        <div className={"logoLogin"}></div>
        <div className={"titlePage"}>
          <div className={"textLoginPage"}></div>
          {isSignUp.isAuthenticated ? (
            ""
          ) : (
            <div className={"textRecovery"} style={{ color: "red" }}>
              Invalid username or password
            </div>
          )}
          <Formik
            validationSchema={signupSchema}
            initialValues={{
              email: "",
              password: "",
              firstName: "",
              lastName: "",
              phoneNumber: "",
              address: "",
            }}
            onSubmit={async (values) => {
              handleSignUp(values);
            }}
          >
            {({ errors, touched }) => {
              return (
                <Form>
                  <FormAnt.Item
                    validateStatus={
                      Boolean(touched?.firstName && errors?.firstName)
                        ? "error"
                        : "success"
                    }
                    help={
                      Boolean(touched?.firstName && errors?.firstName) &&
                      errors?.firstName
                    }
                  >
                    <Field name="firstName">
                      {({ field }) => (
                        <Input
                          {...field}
                          className={"inputLogin"}
                          placeholder="Fist Name"
                        />
                      )}
                    </Field>
                  </FormAnt.Item>
                  <FormAnt.Item
                    validateStatus={
                      Boolean(touched?.lastName && errors?.lastName)
                        ? "error"
                        : "success"
                    }
                    help={
                      Boolean(touched?.lastName && errors?.lastName) &&
                      errors?.lastName
                    }
                  >
                    <Field name="lastName">
                      {({ field }) => (
                        <Input.Password
                          {...field}
                          className={"inputLogin"}
                          placeholder="Last Name"
                        />
                      )}
                    </Field>
                  </FormAnt.Item>
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
                          placeholder="Email"
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
                  <FormAnt.Item
                    validateStatus={
                      Boolean(touched?.phoneNumber && errors?.phoneNumber)
                        ? "error"
                        : "success"
                    }
                    help={
                      Boolean(touched?.phoneNumber && errors?.phoneNumber) &&
                      errors?.phoneNumber
                    }
                  >
                    <Field name="phoneNumber">
                      {({ field }) => (
                        <Input
                          {...field}
                          className={"inputLogin"}
                          placeholder="Phone Number"
                        />
                      )}
                    </Field>
                  </FormAnt.Item>
                  <FormAnt.Item
                    validateStatus={
                      Boolean(touched?.address && errors?.address)
                        ? "error"
                        : "success"
                    }
                    help={
                      Boolean(touched?.address && errors?.address) &&
                      errors?.address
                    }
                  >
                    <Field name="address">
                      {({ field }) => (
                        <Input.Password
                          {...field}
                          className={"inputLogin"}
                          placeholder="Address"
                        />
                      )}
                    </Field>
                  </FormAnt.Item>
                  <div className={"btnContainer"}>
                    <button
                      className={"btnLogin"}
                      type="submit"
                      style={{ cursor: "pointer" }}
                    >
                      Sign Up
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
            <Link to={"/login"} className={"forgotPassword"}>
              Sign in
            </Link>
            <div className={"versionPage"}>v1.0.0</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
