import { Breadcrumb, Col, PageHeader, Row } from "antd";
import { Question, List } from "phosphor-react";
import React, { useState, useEffect } from "react";
import "./serviceGymDetail.scss";
import { useNavigate } from "react-router-dom";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import ListPTService from "./ListPTService/listPTService";
import { useParams } from "react-router-dom";
import { getServiceGymDetail } from "./serviceGymDetailAPI";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import HomeFooter from "../../../pages/HomePage/HomeFooter";

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
      <div className="backToHome">
        <NavLink to="/" className="backtoHome">
          <ArrowLeft size={24} color="#ffffff" weight="duotone" />
          <div className="textBackToHome">Back to home</div>
        </NavLink>

      </div>

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
                    <Breadcrumb.Item>Dich vụ {servicesDetail?.ServiceName} </Breadcrumb.Item>
                  </Breadcrumb>
                </div>
                <div className="serviceDetailAbout">
                  <div className="serviceDetailTitle">{servicesDetail?.ServiceName}</div>
                  <div className="serviceDetailDefine">
                    <p>WorkDuration : {servicesDetail?.WorkDuration} month</p>
                    <p>Price : {servicesDetail?.Price} VND</p>
                  </div>

                  <div className="serviceDetailDefineSeemore">
                    Lorem ipsum dolor sit amet consectetur, adipisicing
                    elit. Dolorem voluptatum hic id sint voluptatibus
                    sapiente similique dolore veritatis perspiciatis tempora
                    magni, dignissimos impedit error beatae veniam quaerat
                    fuga minima quam.
                  </div>




                </div>
              </Col>
            </Row>
          </Col>
          <Col span={18} offset={3} className="listPTService">
            <ListPTService />
          </Col>
        </Row>
      </div>
      <HomeFooter />
    </div>
  );
};
export default ServiceGymDetail;
