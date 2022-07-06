import { Breadcrumb, Col, PageHeader, Row } from "antd";
import React, { useState, useEffect } from "react";
import "./PTDetail.scss";
import { useNavigate } from "react-router-dom";
import { Question, List, ThumbsUp, Chats } from "phosphor-react";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import ava from "../../../assets/images/imgStaff/staff.png";
import PTShedule from "../GymCenterDetail/PtSchedule/PtSchedule";
import PTSchedulePayment from "./PTSchedulePayment";
import OverviewDetail from "./OverviewPTInfo/overviewDetailInfo";
import { getPtDetail } from "./PtDetailAPI";
import { useParams } from "react-router-dom";




const PTDetail = () => {
  const navigate = useNavigate();
  const [ptDetail, setptDetail] = useState();
  const [noptDetail, setNoptDetail] = useState(false);
  const [, setptDetailLoading] = useState(true);
  const id = useParams();

  useEffect(() => {
    getPtDetail(id.id).then((response) => {
      if (response.staffDetail) {
        setptDetail(response.staffDetail);
        setNoptDetail(false);
      } else {
        setNoptDetail(true);
      }
    })
      .catch(() => {
        setNoptDetail(true);
      })
      .finally(() => {
        setptDetailLoading(false);
      });
  }, []);

  return (
    <div className="PTDetailBgContainer">
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
            <span>Danh sách huấn luyện viên cá nhân</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Huấn luyện viên {ptDetail?.StaffName} </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="PTDetailContent">
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
              <Col className="avatarPTDetail" span={4}>
                <img src={ava} className="imgPT" />
              </Col>
              <Col span={20} className="infoDetailPT">
                <div className="namePTAndPosition">
                  Body building professor {ptDetail?.StaffName}
                </div>
                <div className="descriptionPTDetail">
                  <div>Email :  {ptDetail?.StaffEmail}</div>
                  <div>Phone Number :  {ptDetail?.StaffPhoneNumber}</div>


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
            <Row className="timeInfo" >
              <Col span={12}>
                <PTShedule ptId={id.id} />
              </Col>
              <Col span={12} >
                <PTSchedulePayment />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <OverviewDetail />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default PTDetail;
