import React, { useState, useEffect } from "react";
import { Breadcrumb, Col, PageHeader, Row, Button } from "antd";
import ava from "../../../assets/images/imgStaff/staff.png"
import { useParams } from "react-router-dom";
import { getPTDetail } from "./PersonalInfoAPI";
import { Form, Input, Select } from "antd";
import Modal from 'react-modal';
import { useSelector } from "react-redux";
import { updateStaffDetail } from "./PersonalInfoAPI";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import './PersonalInfo.scss';
const { Option } = Select;
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '74%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',

    },
};
const PersonalInfoStaff = () => {
    const options = {

        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };
    const navigate = useNavigate();
    const staffInfo = useSelector((state) => state.staff.staffInfo);
    const [infoDetail, setInfoDetail] = useState();
    const [noInfoDetail, setNoInfoDetail] = useState(false);
    const [, setInfoDetailLoading] = useState(true);
    const id = useParams();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [form] = Form.useForm();

    const onFinish = (values) => {

        updateStaffDetail(staffInfo["id"], values.fullName, values.email, values.phoneNumber, values.Gender, values.DayOfBirth, values.address, staffInfo["roleId"], staffInfo["AccountStaff.StaffImage"], staffInfo["AccountStaff.CenterId"], staffInfo["AccountStaff.SalaryId"]).then((response) => {
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
        getPTDetail(id.id).then((response) => {
            if (response.staffDetail) {
                setInfoDetail(response.staffDetail);
                setNoInfoDetail(false);
            } else {
                setNoInfoDetail(true);
            }
        })
            .catch(() => {
                setNoInfoDetail(true);
            })
            .finally(() => {
                setInfoDetailLoading(false);
            });
    }, []);
    return (
        <div className="StaffDetailContainer">
            <div className="StaffProfile">



                <div className="StaffDetailContent">
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
                                    <img src={ava} className="imgStaff" />
                                </Col>
                                <Col span={20} className="infoDetailStaff">
                                    <div className="nameStaffAndPosition">
                                        Hello, {infoDetail?.StaffName} !
                                    </div>
                                    <div className="descriptionCusDetail">
                                        <div>Email : {infoDetail?.StaffEmail}  </div>
                                        <div>Số điện thoại : {infoDetail?.StaffPhoneNumber} </div>
                                        <div>Ngày sinh : {infoDetail?.DayOfBirth} </div>
                                        <div>Giới tính : {(infoDetail?.Gender === true ? "Nam" : "Nữ")} </div>
                                        <div>Địa chỉ : {infoDetail?.Address} </div>



                                    </div>
                                    <div className="likeAndChat">
                                        <span >
                                            <button className={"btn-sua"} onClick={openModal}>Sửa thông tin</button>

                                        </span>

                                    </div>
                                    <Modal
                                        isOpen={modalIsOpen}
                                        onAfterOpen={afterOpenModal}
                                        onRequestClose={closeModal}
                                        style={customStyles}
                                        contentLabel="Example Modal"
                                    ><h1>Form sửa thông tin</h1>
                                        <div ref={(_subtitle) => (subtitle = _subtitle)}>
                                            <Form form={form} name="control-hooks" onFinish={onFinish}>
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

                                </Col>
                            </Row>

                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};
export default PersonalInfoStaff;