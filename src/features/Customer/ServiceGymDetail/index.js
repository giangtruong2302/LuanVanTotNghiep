import { Breadcrumb, Col, PageHeader, Row } from "antd";
import { Question, List } from "phosphor-react";
import React, { useState, useEffect } from "react";
import "./serviceGymDetail.scss";
import { useNavigate } from "react-router-dom";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import ListPTService from "./ListPTService/listPTService";
import { useParams } from "react-router-dom";
import { getServiceGymDetail } from "./serviceGymDetailAPI";

const ServiceGymDetail = () => {
  const navigate = useNavigate();
  const [isSeeMoreServiceDetail, setIsSeeMoreServiceDetail] = useState(false);
  const [servicesDetail, setServiceDetail] = useState();
  const [noserviceDetail, setNoServiceDetail] = useState(false);
  const [, setServiceDetailLoading] = useState(true);
  const id = useParams();

  useEffect(() => {
    getServiceGymDetail(id.id).then((response) => {
      if (response.serviceDetail) {
        setServiceDetail(response.serviceDetail);
        setNoServiceDetail(false);
      } else {
        setNoServiceDetail(true);
      }
    })
      .catch(() => {
        setNoServiceDetail(true);
      })
      .finally(() => {
        setServiceDetailLoading(false);
      });
  }, []);

  return (

    <div className="ServiceGymDetailBg">
      <PageHeader
        className="site-page-header"
        onBack={() => navigate("/")}
        subTitle="Back to home"
        style={{
          zIndex: "99",
          top: 0,
          position: "sticky",
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

      <div className="ServiceDetailContent">
        <Row>
          <Col
            className="bgServiceDetailContent"
            span={24}
            offset={0}
            style={{
              display: "flex",
              gap: "15px",
              flexDirection: "column",
            }}
          >
            <Row>
              <Col span={18} offset={3}>
                <div className="breadcumDetail">
                  <Breadcrumb>
                    <Breadcrumb.Item href="">
                      <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="">
                      <span>Danh sách các dịch vụ</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Dich vu {servicesDetail?.ServiceName} </Breadcrumb.Item>
                  </Breadcrumb>
                </div>
                <div className="serviceDetailAbout">
                  <div className="serviceDetailTitle">{servicesDetail?.ServiceName}</div>
                  <div className="serviceDetailDefine">
                    <p>WorkDuration : {servicesDetail?.WorkDuration}</p>
                    <p>Price : {servicesDetail?.Price}</p>
                  </div>
                  {!isSeeMoreServiceDetail && (
                    <span
                      onClick={() => setIsSeeMoreServiceDetail(true)}
                      className="linkSeemore"
                    >
                      See more
                    </span>
                  )}
                  {isSeeMoreServiceDetail ? (
                    <>
                      <div className="serviceDetailDefineSeemore">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Dolorem voluptatum hic id sint voluptatibus
                        sapiente similique dolore veritatis perspiciatis tempora
                        magni, dignissimos impedit error beatae veniam quaerat
                        fuga minima quam.
                      </div>
                      <span
                        onClick={() => setIsSeeMoreServiceDetail(false)}
                        className="linkCollapse"
                      >
                        Collapse
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={18} offset={3} className="listPTService">
            <ListPTService />
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default ServiceGymDetail;
