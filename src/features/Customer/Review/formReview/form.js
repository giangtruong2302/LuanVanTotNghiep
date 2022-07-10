
import React, { useState, useEffect } from "react";
import { Field } from "formik";
import { getAllGymCenter } from "./formAPI";
import { Form, Input, Rate, Select } from "antd";
import { createReview } from "./formAPI";
import './form.scss'
import { useSelector } from "react-redux";
import { Content } from "antd/lib/layout/layout";


const handleRate = (valueRate) => {

}
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
const FormReview = () => {
    const onFinish = (values) => {

        console.log('check', values)
        createReview(valueRate, values.ReviewContent, cusInfo["AccountCustomer.id"], values.center)

    };
    const cusInfo = useSelector((state) => state.cus.cusInfo);
    const { Option } = Select;
    const [allGymCenter, setAllGymCenter] = useState();
    const [noGymCenter, setNoGymCenter] = useState(false);
    const [, setGymCenterLoading] = useState(true);

    useEffect(() => {

        getAllGymCenter("1").then((response) => {

            if (response.centers.rows.length > 0) {
                setAllGymCenter(response.centers.rows);
                setNoGymCenter(false);
            } else {
                setNoGymCenter(true);
            }
        })
            .catch(() => {
                setNoGymCenter(true);
            })
            .finally(() => {
                setGymCenterLoading(false);
            });
    }, []);
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
                            name="PhoneNumber"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <div className="titleInput">Gym Center :</div>

                        <Form.Item
                            name="center"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}


                        >
                            <Select
                                placeholder="Select a center"

                            >
                                {allGymCenter?.map((item, index) => {
                                    return (
                                        <>
                                            <Option value={item.id} >{item.CenterName}</Option>

                                        </>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                        <div className="titleInput">Review :</div>
                        <Form.Item
                            name="ReviewContent"
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
