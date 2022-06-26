
import React from "react";
import { Field, Form, Formik } from "formik";

import { Form as FormAnt, Input } from "antd";
import './form.scss'
const FormReview = () => {
    return (
        <div className="wrapper">
            <div className="loginPage">
                <div className="logoLogin">
                    {/* <img src={logo} alt="BIZBOOKLY" />
             */}
                    Customer Review
                </div>
                <div className="titlePage">
                    <div className="textLoginPage"></div>

                    <Formik>


                        <Form>
                            <div className="titleInput">Customer name :</div>
                            <FormAnt.Item>
                                <Field name="nameUser">
                                    {({ field }) => (
                                        <Input

                                            className="inputLogin"
                                            placeholder=""
                                        />
                                    )}
                                </Field>
                            </FormAnt.Item>
                            <div className="titleInput">Email</div>
                            <FormAnt.Item>
                                <Field name="email">
                                    {({ field }) => (
                                        <Input

                                            className="inputLogin"
                                            placeholder=""
                                        />
                                    )}
                                </Field>
                            </FormAnt.Item>
                            <div className="titleInput">Phone number</div>
                            <FormAnt.Item>
                                <Field name="email">
                                    {({ field }) => (
                                        <Input

                                            className="inputLogin"
                                            placeholder=""
                                        />
                                    )}
                                </Field>
                            </FormAnt.Item>
                            <div className="titleInput">Message</div>
                            <FormAnt.Item>
                                <Field name="message">
                                    {({ field }) => (

                                        < Input.TextArea

                                            className="inputLogin"
                                            placeholder=""
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
                                    Submit
                                </button>
                            </div>

                        </Form>



                    </Formik>

                    <div className={"versionPage"}>v1.0.0</div>

                </div>
            </div>
        </div>
    );
}
export default FormReview;
