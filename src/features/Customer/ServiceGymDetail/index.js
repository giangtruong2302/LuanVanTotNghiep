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
import { Link } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import HomeFooter from "../../../pages/HomePage/HomeFooter";
import { FormattedMessage } from "react-intl";

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
        <NavLink to="/service-gym" className="backtoHome">
          <ArrowLeft size={24} color="#ffffff" weight="duotone" />
          <div className="textBackToHome"><FormattedMessage id="header.back" /></div>
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
                    <Breadcrumb.Item >
                      <Link to={'/service-gym'}><FormattedMessage id="serviceDetail.service-list" /></Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item><FormattedMessage id="serviceDetail.service" /> {servicesDetail?.ServiceName} </Breadcrumb.Item>
                  </Breadcrumb>
                </div>
                <div className="serviceDetailAbout">
                  <div className="serviceDetailTitle">{servicesDetail?.ServiceName}</div>
                  <div className="serviceDetailDefine">
                    <p><FormattedMessage id="serviceDetail.work-duration" /> : {servicesDetail?.WorkDuration} month</p>
                    <p><FormattedMessage id="serviceDetail.price" /> : {servicesDetail?.Price} VND</p>
                  </div>

                  <div className="serviceDetailDefineSeemore">
                    Khách hàng có thể chọn book 1 PT theo một khung giờ nhất định. Sau khi đăng ký thành công khách hàng chờ
                    PT xác nhận booking. Sau khi được PT xác nhận khách hàng sẽ nhận được thông báo ở trang chủ. Thông báo yêu cầu
                    khách hàng thanh toán, hoặc khách hàng có thể hủy booking đó.
                  </div>

                  <div>{servicesDetail?.CourseRoute.replace('-', '\n')} </div>


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
