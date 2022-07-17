import React, { useState, useEffect } from "react";
import { PictureOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, PageHeader, Row, Button, Upload, message, Rate } from "antd";
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
import { getAllGymCenter } from "./perInfoAPI";
import { createReview } from "./perInfoAPI";
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
    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
    const [valueRate, setValueRate] = useState(3);

    const [statusPage, setStatusPage] = useState("")
    const navigate = useNavigate();
    const { Option } = Select;
    const cusInfo = useSelector((state) => state.cus.cusInfo);
    const [cusDetail, setCusDetail] = useState();
    const [noCusDetail, setNoCusDetail] = useState(false);
    const [, setCusDetailLoading] = useState(true);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalReviewIsOpen, setReviewIsOpen] = React.useState(false);
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
    const [fileType, setFileType] = useState();
    const [fileSize, setFileSize] = useState()
    const onFinishReview = (values) => {

        console.log('check', values)
        createReview(valueRate, values.ReviewContent, cusDetail?.id, values.center).then((response) => {
            if (response.message.errCode === 0) {
                toast.success("Success", options)

            } else {

                toast.error("Fail", options);
            }
        })

    };

    const [allGymCenter, setAllGymCenter] = useState();
    const [noGymCenter, setNoGymCenter] = useState(false);
    const [, setGymCenterLoading] = useState(true);
    const handleRate = (valueRate) => {

    }
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
    const beforeUpload = (file) => {
        const isJpgOrPng =
            file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "image/svg" ||
            file.type === "image/jpg";
        const fileType = file.type?.split("/")[1];
        fileType && setFileType(fileType);
        if (!isJpgOrPng) {
            message.error("you can only upload file JPG/PNG?SVG/JPEG !");
        }
        if (file.size) {
            const isLt5M = file.size / 1024 / 1024 < 5;
            setFileSize(file.size / 1024 / 1024 < 1 ? 1 : file.size / 1024 / 1024);
            if (!isLt5M) {
                message.error("Your image must smaller than 5MB");
            }
            return isJpgOrPng && isLt5M;
        }
        return isJpgOrPng;
    };
    const [loading, setLoading] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [fileName, setFileName] = useState();
    const getBase64 = (img, callback) => {
        setLoading(false);
        const reader = new FileReader();
        reader.addEventListener("load", () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    const handleChangeImage = async (info) => {

        setLoading(true);
        if (info.file) {
            getBase64(info.file.originFileObj, (imgUrl) => {
                setImageUrl(imgUrl);
                setFileName(info.file.name);
                setLoading(false);
            });
        }
    };
    const uploadButton = (
        <div className="btnUpload">
            {loading ? <PictureOutlined /> : <PictureOutlined />}
            <div className="text">Change Image</div>
        </div>
    );

    const [roleId, setRoleId] = useState("5")
    const onFinish = (values) => {
        console.log("check", values)
        updateCusDetail(cusInfo["id"], cusInfo["ExternalId"], values.fullName, values.Gender, values.dayOfBirth, values.phoneNumber, values.address, roleId, imageUrl, fileName, values.email, cusInfo["AccountCustomer.CenterId"]).then((response) => {
            if (response.errorCode === 0) {
                toast.success("Success", options)
                setStatusPage(Date.now())
            } else {

                toast.error("Fail", options);
            }
        })
    };


    console.log('url', imageUrl)
    console.log('fileName', fileName)

    const onReset = () => {
        form.resetFields();
    };
    function openModal() {
        setIsOpen(true);
    }
    function openModalReview() {
        setReviewIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#000';

    }

    function closeModal() {
        setIsOpen(false);
    }
    function afterOpenModalReview() {
        subtitle.style.color = '#000';

    }

    function closeModalReview() {
        setReviewIsOpen(false);
    }
    let subtitle;
    useEffect(() => {
        getCusDetail(cusInfo["ExternalId"]).then((response) => {
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
    }, [statusPage]);



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
                                    name="dayOfBirth"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                Avatar:
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={true}
                                    beforeUpload={beforeUpload}
                                    onChange={handleChangeImage}
                                >
                                    {uploadButton}
                                </Upload>

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
                                    <img src={(cusDetail?.CustomerImage) ? cusDetail?.CustomerImage : ava} className="imgCus" />
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
                                            <button onClick={openModalReview} className={"btn-sua"}>Đánh giá</button>
                                        </span>
                                    </div>
                                    <Modal

                                        isOpen={modalReviewIsOpen}
                                        onAfterOpen={afterOpenModalReview}
                                        onRequestClose={closeModalReview}
                                        style={customStyles}
                                        contentLabel="Example Modal"
                                    ><h1>Form Review</h1>
                                        <div ref={(_subtitle) => (subtitle = _subtitle)}>
                                            <Form form={form} name="control-hooks" onFinish={onFinishReview}>
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

                                                <div className={"btnReView"}>
                                                    <Button type="primary" htmlType="submit" onClick={() => handleRate(valueRate)}>
                                                        Submit
                                                    </Button>
                                                </div>

                                            </Form>
                                        </div>


                                        <ToastContainer />
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
export default PerInfo;