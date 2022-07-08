import React, { useState, useEffect } from "react";
import { Breadcrumb, Col, PageHeader, Row, Button } from "antd";
import "./perInfo.scss";
import { Form, Input, Select } from "antd";
import ava from "../../../assets/images/imgStaff/staff.png"
import { Link } from "react-router-dom";
import { getCusDetail } from "./perInfoAPI";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateCusDetail } from "./perInfoAPI";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';
import BgProfile from "../../../assets/images/banner/bgCus.jpg"
const customStyles = {
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        right: '74%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const PerInfo = () => {

    const navigate = useNavigate();
    const { Option } = Select;
    const cusInfo = useSelector((state) => state.cus.cusInfo);
    const [cusDetail, setCusDetail] = useState();
    const [noCusDetail, setNoCusDetail] = useState(false);
    const [, setCusDetailLoading] = useState(true);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [form] = Form.useForm();
    const [messRes, setMessRes] = useState("");
    const options = {

        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };
    const onFinish = (values) => {
        console.log("check", values)
        updateCusDetail(cusInfo["id"], values.fullName, values.Gender, values.DayOfBirth, values.phoneNumber, values.address, values.email, cusInfo["roleId"], cusInfo["AccountCustomer.CustomerImage"], cusInfo["AccountCustomer.CenterId"]).then((response) => {
            if (response.message.errorCode === 0) {
                toast.success("Success", options)

            } else {

                toast.error("Fail", options);
            }
        })
    };

    const onReset = () => {
        form.resetFields();
    };
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#000';

    }

    function closeModal() {
        setIsOpen(false);
    }
    let subtitle;
    useEffect(() => {
        getCusDetail(cusInfo["AccountCustomer.id"]).then((response) => {
            if (response.cusDetail) {
                setCusDetail(response.cusDetail);
                setNoCusDetail(false);
            } else {
                setNoCusDetail(true);
            }
        })
            .catch(() => {
                setNoCusDetail(true);
            })
            .finally(() => {
                setCusDetailLoading(false);
            });
    }, []);
    return (
        <div className="CusDetailBgContainer">
            <div className="backToHome">
                <NavLink to="/" className="backtoHome">
                    <ArrowLeft size={24} color=" #ffffff" weight="duotone" />
                    <div className="textBackToHome">Back to home</div>
                </NavLink>

            </div>


            <div className="screenProfile">
                <div className="modalForm">
                    <Modal

                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    ><h1>Form sửa thông tin</h1>
                        <div ref={(_subtitle) => (subtitle = _subtitle)}>
                            <Form form={form} name="control-hooks" className="formCus" onFinish={onFinish}>
                                Full Name :
                                <Form.Item
                                    name="fullName"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                Email :
                                <Form.Item
                                    name="email"

                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                Gender :
                                <Form.Item
                                    name="Gender"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Select your gender"
                                    >
                                        <Option value={true}>Nam</Option>
                                        <Option value={false}>Nữ</Option>
                                    </Select>
                                </Form.Item>
                                SĐT
                                <Form.Item
                                    name="phoneNumber"

                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                Address
                                <Form.Item
                                    name="address"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                Day of Birth :
                                <Form.Item
                                    name="DayOfBirth"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <ToastContainer />

                                <Button type="primary" htmlType="submit" >
                                    Submit
                                </Button>
                                <Button htmlType="button" onClick={onReset}>
                                    Reset
                                </Button>
                            </Form>
                        </div>



                    </Modal>
                </div>
                <img className="imgBg" src={BgProfile}></img>
                <div className="CusDetailContent">

                    <Row className="contentInfo">
                        <Col
                            span={24}
                            offset={0}
                            style={{
                                display: "flex",
                                gap: "15px",
                                flexDirection: "column",
                            }}
                        >

                            <Row>
                                <Col className="avatarCusDetail" span={4}>
                                    <img src={ava} className="imgCus" />
                                </Col>
                                <Col span={20} className="infoDetailCus">
                                    <div className="nameCusAndPosition">
                                        Hello, {cusDetail?.CustomerName} !
                                    </div>
                                    <div className="descriptionCusDetail">
                                        <div className="detailCus">
                                            <div className="titleInfo" >Email : </div><div className="infoCus"> {cusDetail?.CustomerEmail}  </div>
                                        </div>
                                        <div className="detailCus">
                                            <div className="titleInfo" >Số điện thoại : </div><div className="infoCus"> {cusDetail?.PhoneNumber} </div>
                                        </div>
                                        <div className="detailCus">
                                            <div className="titleInfo" >Ngày sinh : </div><div className="infoCus"> {cusDetail?.DayOfBirth} </div>
                                        </div>
                                        <div className="detailCus">
                                            <div className="titleInfo" >Giới tính : </div><div className="infoCus"> {(cusDetail?.Gender === true ? "Nam" : "Nữ")} </div>
                                        </div>
                                        <div className="detailCus">
                                            <div className="titleInfo" >Địa chỉ : </div><div className="infoCus"> {cusDetail?.Address} </div>
                                        </div>


                                    </div>
                                    <div className="likeAndChat">
                                        <span >
                                            <button className={"btn-sua"} onClick={openModal}>Sửa thông tin</button>

                                        </span>
                                        <span >
                                            <Link to={"/booking-of-cus"} className={"btn-check-book"}>Xem booking</Link>
                                        </span>
                                        <span >
                                            <Link to={"/customer-review"} className={"btn-check-book"}>Đánh giá</Link>
                                        </span>
                                    </div>



                                </Col>
                            </Row>

                        </Col>
                    </Row>

                </div>
            </div>
        </div>
    );
};
export default PerInfo;