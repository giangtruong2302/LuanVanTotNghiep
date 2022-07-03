import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCenterDetail } from "./centerDetailAPI";
import { Breadcrumb, Col, PageHeader, Row } from "antd";
import { Question, List, ThumbsUp, Chats } from "phosphor-react";
import chinhanh from "../../../assets/images/gym-place/chiNhanh1.jpg";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import './CenterDetail.scss'
import ListPTCenter from "./ListPtOfCenter/listPtOfCenter";
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
            <PageHeader
                className="site-page-header"
                onBack={() => navigate("/")}
                subTitle="Back to home"
                style={{
                    top: 0,
                    position: "sticky",
                    zIndex: "9",
                    background:
                        "linear-gradient(305.38deg, #171717 -50.47%, #f2edf0 94.82%)",
                    color: "#fff",
                    fontWeight: "600",
                }}
                extra={[
                    <Question size={20} color="#eeeee7" weight="fill" />,
                    <List size={20} color="#eeeee7" weight="fill" />,
                ]}
            />

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
                                    <div>Center Address: {centerDetail?.CenterAddress}  </div>
                                    <div>Center Phone Number : {centerDetail?.CenterPhoneNumber} </div>


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
                    <ListPTCenter />
                </Row>
            </div>
        </div>
    )
}
export default GymDetailPage;