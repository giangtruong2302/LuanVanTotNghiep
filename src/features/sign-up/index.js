import { Form, Input, Select } from "antd";

import { React, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { signupSchema } from "./validation";
import "./signUp.scss";
import { values } from "lodash";
const { Option } = Select;
const SignUp = () => {
  const [form] = Form.useForm();
  const [genderValue, setGenderValue] = useState()
  const [isSignUp, setIsSignUp] = useState(false);
  const onFinish = (values) => {
    console.log("check values: ", values);
  };
  const onHandleGenderValue = (value) => {
    console.log("value", value)
  }

  return (
    <div className={"wrapperSignUp"}>
      <div className={"signUpPage"}>

        <div className={"titlePageSignUp"}>



          <Form form={form} name="control-hooks" onFinish={onFinish}>
            <div className="titleInputSignUp">Email :</div>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input className="inputField" />
            </Form.Item>
            <div className="titleInputSignUp">Password :</div>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input className="inputField" />
            </Form.Item>
            <div className="titleInputSignUp"> Full Name :</div>
            <Form.Item
              name="fullName"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input className="inputField" />
            </Form.Item>
            <div className="titleInputSignUp"> Username :</div>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input className="inputField" />
            </Form.Item>
            <div className="titleInputSignUp"> Phone Number :</div>
            <Form.Item
              name="phonenumber"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input className="inputField" />
            </Form.Item>
            <div className="titleInputSignUp"> Address : </div>
            <Form.Item
              name="address"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input className="inputField" />
            </Form.Item>
            <div className="titleInputSignUp"> Gender : </div>
            <Form.Item
              name="gender"
              rules={[
                {
                  required: true,
                },
              ]}


            >
              <Select
                className="selectgender"
                placeholder="Select your gender"
                onChange={onHandleGenderValue}

              >


                <Option value="true"  >Nam</Option>
                <Option value="false" >Nữ</Option>




              </Select>
            </Form.Item>
            <div className={"btnContainer"}>
              <button
                className={"btnLogin"}
                htmlType="submit"
                style={{ cursor: "pointer" }}
              >
                Sign Up
              </button>
            </div>
          </Form>





        </div>
      </div>
    </div>
  );
};
export default SignUp;
