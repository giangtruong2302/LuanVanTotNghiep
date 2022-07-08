
import React, { useState } from "react";
import { Field } from "formik";

import { Form, Input, Rate } from "antd";
import './form.scss'


const onFinish = (values) => {

    console.log('check', values)

};
const handleRate = (valueRate) => {
    console.log('rate', valueRate)
}
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
const FormReview = () => {
    const [valueRate, setValueRate] = useState(3);
    const [form] = Form.useForm();
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




                    <Form form={form} name="control-hooks" onFinish={onFinish}>
                        <div className="titleInput">Email :</div>
                        <Form.Item
                            name="Email"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <div className="titleInput">Phone number :</div>
                        <Form.Item
                            name="Phone Number"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <div className="titleInput">Review :</div>
                        <Form.Item
                            name="Review Content"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input className="inputReview" />
                        </Form.Item>
                        <div className="titleInput">Rating :</div>
                        <span>
                            <Rate tooltips={desc} onChange={setValueRate} value={valueRate} />
                            {valueRate ? <span className="ant-rate-text">{desc[valueRate - 1]}</span> : ''}
                        </span>

                        <div className={"btnContainer"}>
                            <button
                                className={"btnLogin"}
                                type="submit"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleRate(valueRate)}
                            >
                                Submit
                            </button>
                        </div>

                    </Form>







                </div>
            </div>
        </div>
    );
}
export default FormReview;
