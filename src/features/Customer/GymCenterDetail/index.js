import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCenterDetail } from "./centerDetailAPI";
import { Breadcrumb, Col, PageHeader, Row } from "antd";
import { Question, List, ThumbsUp, Chats } from "phosphor-react";
import chinhanh from "../../../assets/images/gym-place/chiNhanh1.jpg";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import './CenterDetail.scss'
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import ListPTCenter from "./ListPtOfCenter/listPtOfCenter";
import HomeFooter from "../../../pages/HomePage/HomeFooter";
import ListReview from "./ListReview/ListReview";
const GymDetailPage = () => {
    const navigate = useNavigate();

    const [centerDetail, setCenterDetail] = useState();
    const [nocenterDetail, setNoCenterDetail] = useState(false);
    const [, setCenterDetailLoading] = useState(true);
    const id = useParams();

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
    // console.log('check', getCenterDetail)
    return (
        <div className="CenterDetailBgContainer">
            <div className="backToHome">
                <NavLink to="/" className="backtoHome">
                    <ArrowLeft size={24} color="#ffffff" weight="duotone" />
                    <div className="textBackToHome">Back to home</div>
                </NavLink>

            </div>

            <div className="breadcumDetail" >
                <Breadcrumb>
                    <Breadcrumb.Item href="">
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="">
                        <span>Danh sách cơ sở Gym</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Cơ sở {centerDetail?.CenterName}</Breadcrumb.Item>
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
                                    Center Name: {centerDetail?.CenterName}
                                </div>
                                <div className="descriptionCenterDetail">
                                    <div>Address: {centerDetail?.CenterAddress}  </div>
                                    <div>Phone Number : {centerDetail?.CenterPhoneNumber} </div>


                                </div>
                                <div className="likeAndChat">
                                    <span className="btnLike">
                                        <ThumbsUp size={20} color="#fff" weight="fill" /> Like
                                    </span>
                                    <span className="btnChat">
                                        <Chats size={20} color="#fff" weight="fill" />
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <div className="contentCenterDetail">
                        <ListPTCenter />
                        <ListReview />
                    </div>
                </Row>
            </div>
            <HomeFooter />
        </div>
    )
}
export default GymDetailPage;