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
import NoneAvatar from "../../../assets/images/logo/noneAvatar.jpg";
import { FormattedMessage } from "react-intl";
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
    const [statusReivew, setStatusReview] = useState(1);
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
        createReview(valueRate, values.ReviewContent, cusDetail?.id, values.center, statusReivew, "").then((response) => {
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
            <div className="text"> <FormattedMessage id="formInfoCus.changeImg" /></div>
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


    function afterOpenModal() {
        subtitle.style.color = '#000';

    }

    function closeModal() {
        setIsOpen(false);
    }
    function openModalReview() {
        setReviewIsOpen(true);
    }
    function afterOpenModalReview() {
        subtitle.style.color = '#000';

    }

    function closeModalReview() {
        setReviewIsOpen(false);
    }
    let subtitle;
    useEffect(() => {
        if (cusInfo) {


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
        }
        else {
            navigate(`/`);
        }
    }, [statusPage]);



    return (
        <div className="CusDetailBgContainer">
            <div className="backToHome">
                <NavLink to="/" className="backtoHome">
                    <ArrowLeft size={24} color=" #ffffff" weight="duotone" />
                    <div className="textBackToHome"><FormattedMessage id="header.back-to-home" /></div>
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
                    ><h1><FormattedMessage id="formInfoCus.form-title" /></h1>
                        <div ref={(_subtitle) => (subtitle = _subtitle)}>
                            <Form form={form} name="control-hooks" className="formCus" onFinish={onFinish}>
                                <FormattedMessage id="formInfoCus.fullName" /> :
                                <Form.Item
                                    name="fullName"

                                >
                                    <Input defaultValue={cusDetail?.CustomerName} />
                                </Form.Item>
                                <FormattedMessage id="formInfoCus.email" /> :
                                <Form.Item
                                    name="email"


                                >
                                    <Input defaultValue={cusDetail?.CustomerEmail} />
                                </Form.Item>
                                <FormattedMessage id="formInfoCus.gender" /> :
                                <Form.Item
                                    name="Gender"

                                >
                                    <Select
                                        defaultValue={cusDetail?.Gender}
                                    >
                                        <Option value={true} ><FormattedMessage id="formInfoCus.male" /></Option>
                                        <Option value={false}><FormattedMessage id="formInfoCus.female" /></Option>
                                    </Select>
                                </Form.Item>
                                <FormattedMessage id="formInfoCus.phoneNumber" /> :
                                <Form.Item
                                    name="phoneNumber"


                                >
                                    <Input defaultValue={cusDetail?.PhoneNumber} />
                                </Form.Item>
                                <FormattedMessage id="formInfoCus.address" /> :
                                <Form.Item
                                    name="address"

                                >
                                    <Input defaultValue={cusDetail?.Address} />
                                </Form.Item>
                                <FormattedMessage id="formInfoCus.dayOfBirth" />
                                <Form.Item
                                    name="dayOfBirth"

                                >
                                    <Input defaultValue={cusDetail?.DayOfBirth} />
                                </Form.Item>
                                <FormattedMessage id="formInfoCus.avatar" />
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
                                    <FormattedMessage id="formInfoCus.submit" />
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
                                    <img src={(cusDetail?.CustomerImage) ? cusDetail?.CustomerImage : NoneAvatar} className="imgCus" />
                                </Col>
                                <Col span={20} className="infoDetailCus">
                                    <div className="nameCusAndPosition">
                                        <FormattedMessage id="cusInfo.hello" />, {cusDetail?.CustomerName} !
                                    </div>
                                    <div className="descriptionCusDetail">
                                        <div className="detailCus">
                                            <div className="titleInfo" ><FormattedMessage id="cusInfo.email" /> : </div><div className="infoCus"> {cusDetail?.CustomerEmail}  </div>
                                        </div>
                                        <div className="detailCus">
                                            <div className="titleInfo" ><FormattedMessage id="cusInfo.phoneNumber" /> : </div><div className="infoCus"> {cusDetail?.PhoneNumber} </div>
                                        </div>
                                        <div className="detailCus">
                                            <div className="titleInfo" ><FormattedMessage id="cusInfo.dayOfBirth" /> : </div><div className="infoCus"> {cusDetail?.DayOfBirth} </div>
                                        </div>
                                        <div className="detailCus">
                                            <div className="titleInfo" ><FormattedMessage id="cusInfo.gender" /> : </div><div className="infoCus"> {(cusDetail?.Gender === true ? "Nam" : "Nữ")} </div>
                                        </div>
                                        <div className="detailCus">
                                            <div className="titleInfo" ><FormattedMessage id="cusInfo.address" /> : </div><div className="infoCus"> {cusDetail?.Address} </div>
                                        </div>


                                    </div>
                                    <div className="likeAndChat">
                                        <span >
                                            <button className={"btn-sua"} onClick={openModal}><FormattedMessage id="cusInfo.change" /></button>

                                        </span>

                                        <span >
                                            <Link to={"/booking-of-cus"} className={"btn-check-book"}><FormattedMessage id="cusInfo.booking" /></Link>
                                        </span>
                                        <span >
                                            <button onClick={openModalReview} className={"btn-sua"}><FormattedMessage id="cusInfo.review" /></button>
                                        </span>
                                    </div>
                                    <Modal

                                        isOpen={modalReviewIsOpen}
                                        onAfterOpen={afterOpenModalReview}
                                        onRequestClose={closeModalReview}
                                        style={customStyles}
                                        contentLabel="Example Modal"
                                    ><h1><FormattedMessage id="form-review.title-form" /></h1>
                                        <div ref={(_subtitle) => (subtitle = _subtitle)}>
                                            <Form form={form} name="control-hooks" onFinish={onFinishReview}>
                                                <div className="titleInput"><FormattedMessage id="form-review.email" /> :</div>
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
                                                <div className="titleInput"><FormattedMessage id="form-review.phoneNumber" /> :</div>
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
                                                <div className="titleInput"><FormattedMessage id="form-review.center" /> :</div>

                                                <Form.Item
                                                    name="center"
                                                    rules={[
                                                        {
                                                            required: true,
                                                        },
                                                    ]}


                                                >
                                                    <Select


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
                                                <div className="titleInput"><FormattedMessage id="form-review.review-content" /> :</div>
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
                                                <div className="titleInput"><FormattedMessage id="form-review.rating" /> :</div>
                                                <span>
                                                    <Rate tooltips={desc} onChange={setValueRate} value={valueRate} />
                                                    {valueRate ? <span className="ant-rate-text">{desc[valueRate - 1]}</span> : ''}
                                                </span>

                                                <div className={"btnReView"}>
                                                    <Button type="primary" htmlType="submit" >
                                                        <FormattedMessage id="form-review.send-review" />
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