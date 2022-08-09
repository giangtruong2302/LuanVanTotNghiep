import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCenterDetail } from "./centerDetailAPI";
import { Breadcrumb, Col, PageHeader, Row, Button, Rate } from "antd";
import { Question, List, ThumbsUp, Chats } from "phosphor-react";
import chinhanh from "../../../assets/images/gym-place/chiNhanh1.jpg";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import './CenterDetail.scss'
import { NavLink, Link } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import ListPTCenter from "./ListPtOfCenter/listPtOfCenter";
import HomeFooter from "../../../pages/HomePage/HomeFooter";
import ListReview from "./ListReview/ListReview";
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import { createReview } from "../PersonalInfomation/perInfoAPI";
import { Form, Input, Select } from "antd";
import { handleGetDetailCustomerByExternalId } from "../PayPage/PaymentPage/paymentAPI";
import { useSelector } from "react-redux";
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
const GymDetailPage = () => {
    const [statusReview, setStatusReview] = useState(1);
    const [statusPage, setStatusPage] = useState("")
    const cusInfo = useSelector((state) => state.cus.cusInfo);
    const { Option } = Select;
    const navigate = useNavigate();
    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
    const [centerDetail, setCenterDetail] = useState();
    const [nocenterDetail, setNoCenterDetail] = useState(false);
    const [, setCenterDetailLoading] = useState(true);
    const id = useParams();
    const [modalReviewIsOpen, setReviewIsOpen] = React.useState(false);
    const [form] = Form.useForm();
    const [valueRate, setValueRate] = useState(3);
    const [cusDetail, setCusDetail] = useState();
    const [noCusDetail, setNoCusDetail] = useState(false);
    const [, setCusDetailLoading] = useState(true);

    const options = {

        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };
    useEffect(() => {
        getCenterDetail(id.id).then((response) => {
            if (response.centerDetail) {
                setCenterDetail(response.centerDetail);
                setNoCenterDetail(false);
            } else {
                setNoCenterDetail(true);
            }
        })
            .catch(() => {
                setNoCenterDetail(true);
            })
            .finally(() => {
                setCenterDetailLoading(false);
            });
    }, []);
    function openModalReview() {
        if (!cusInfo) {
            toast.error("Chức năng cần đăng nhập", options);
        } else {
            setReviewIsOpen(true);
        }
    }
    function afterOpenModalReview() {
        subtitle.style.color = '#000';

    }

    function closeModalReview() {
        setReviewIsOpen(false);
        setStatusPage(Date.now())
    }
    let subtitle;
    const onFinishReview = (values) => {

        console.log('check', values)
        createReview(valueRate, values.ReviewContent, cusDetail?.id, centerDetail?.id, statusReview).then((response) => {
            if (response.message.errCode === 0) {
                toast.success("Success", options)

            } else {

                toast.error("Fail", options);
            }
        })

    };
    useEffect(() => {
        if (cusInfo) {
            try {
                handleGetDetailCustomerByExternalId(cusInfo["ExternalId"]).then((response) => {
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
                    })
                    .catch((error) => console.log(error));
            } catch (error) {
                console.log(error);
            }
        }

    }, []);
    // console.log('check', getCenterDetail)
    return (
        <div className="CenterDetailBgContainer">
            <div className="backToHome">
                <NavLink to="/gym-center" className="backtoHome">
                    <ArrowLeft size={24} color="#ffffff" weight="duotone" />
                    <div className="textBackToHome"><FormattedMessage id="header.back" /></div>
                </NavLink>

            </div>

            <div className="breadcumDetail" >
                <Breadcrumb>
                    <Breadcrumb.Item href="">
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Link to={'/gym-center'}><FormattedMessage id="gymDetail.gym-list" /></Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item><FormattedMessage id="gymDetail.center" /> {centerDetail?.CenterName}</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <div className="CenterDetailContent">
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
                            <Col className="avatarCenterDetail" span={4}>
                                <img src={chinhanh} className="imgCenter" />
                            </Col>
                            <Col span={20} className="infoDetailCenter">
                                <div className="nameCenterAndPosition">
                                    <FormattedMessage id="gymDetail.center-name" />: {centerDetail?.CenterName}
                                </div>
                                <div className="descriptionCenterDetail">
                                    <div><FormattedMessage id="gymDetail.address" />: {centerDetail?.CenterAddress}  </div>
                                    <div><FormattedMessage id="gymDetail.phoneNumber" /> : {centerDetail?.CenterPhoneNumber} </div>


                                </div>
                                <div className="likeAndChat">

                                    <span className="btnChat">
                                        <Chats onClick={openModalReview} size={20} color="#fff" weight="fill" /> <FormattedMessage id="gymDetail.review" />
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <div className="contentCenterDetail">
                        <ListPTCenter />
                        <ListReview status={statusPage} />
                    </div>
                </Row>
                <Modal

                    isOpen={modalReviewIsOpen}
                    onAfterOpen={afterOpenModalReview}
                    onRequestClose={closeModalReview}
                    style={customStyles}
                    contentLabel="Example Modal"
                ><h1><FormattedMessage id="gymDetail.review" /></h1>
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
                            <div className="titleInput"><FormattedMessage id="form-review.center" /> :{centerDetail?.CenterName}</div>




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



                </Modal>
            </div>
            <HomeFooter />
        </div>
    )
}
export default GymDetailPage;