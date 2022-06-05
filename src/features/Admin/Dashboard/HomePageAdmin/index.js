import { Col, Row } from "antd";
import React from "react";
import ChartReservation from "../Chart/chartReservation";
import "./homepageAdmin.scss";
import { NavLink } from "react-router-dom";

const HomePageAdmin = () => {
  return (
    <>
      <div className="HomepageAdminBg">
        <div className="titleHomeAdmin">Overview</div>
        <Row className="overviewCalc">
          <Col span={5} className="gymCenterTotal">
            Gym center Total
          </Col>
          <Col span={5} className="serviceOfGHGym">
            Servive
          </Col>
          <Col span={5} className="accountCusTotal">
            Account customer total
          </Col>
          <Col span={5} className="serviceHours">
            Service Hours
          </Col>
        </Row>
        <div className="chartReservation">
          <Row className="chartReservationContent">
            <Col span={18} className="leftChart">
              <ChartReservation />
            </Col>
            <Col span={5} className="rightChart">
              <Row className="rightChartContent">
                <Col span={4} style={{ height: "20%" }}>
                  China
                </Col>
                <Col span={4} style={{ height: "20%" }}>
                  US
                </Col>
                <Col span={4} style={{ height: "20%" }}>
                  Rusia
                </Col>
                <Col span={4} style={{ height: "20%" }}>
                  UK
                </Col>
                <Col span={4} style={{ height: "20%" }}>
                  Japan
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <Row className="unresolved">
          <Col span={11} className="unresolvedOnTop">
            <div className="unresolvedOnTopHeader">
              <span className="unresolvedOnTopTitle">
                <p className="textUnresolvedTitle">Unresolved</p>
                <p className="textGroup">Group: Support</p>
              </span>
              <span className="viewDetailUnresolved">
                <NavLink to="/unresolved-detail">View Detail</NavLink>
              </span>
            </div>
          </Col>
          <Col span={11} className="ageCusPopular">
            right
          </Col>
        </Row>
      </div>
    </>
  );
};
export default HomePageAdmin;
