import { Col, Row } from "antd";
import React, { useEffect } from "react";
import ChartReservation from "../Chart/chartReservation";
import "./homepageAdmin.scss";
import { NavLink } from "react-router-dom";
import {
  getAllCustomerOfCenter,
  getAllCustomerOfSystem,
} from "../../GymCenter/Customers/CusAPI";
import { useState } from "react";
import { getAllCenter } from "../../AdminAPI";

const HomePageAdmin = () => {
  const CenterId = localStorage.getItem("CenterId");
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [totalCenter, setTotalCenter] = useState(0);
  useEffect(() => {
    try {
      getAllCustomerOfSystem(1)
        .then((res) => {
          console.log(res.customers.count);
          setTotalCustomer(res.customers.count);
        })
        .catch((error) => {
          console.log(error.response);
        });
      getAllCenter(1)
        .then((res) => {
          setTotalCenter(res.centers.count);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <div className="HomepageAdminBg">
        <div className="titleHomeAdmin">Overview</div>
        <Row className="overviewCalc">
          <Col span={5} className="gymCenterTotal">
            <p>Gym center Total</p>
            <p>{totalCenter}</p>
          </Col>
          <Col span={5} className="serviceOfGHGym">
            Servive
          </Col>
          <Col span={5} className="accountCusTotal">
            <p>Account customer total</p>
            <p>{totalCustomer}</p>
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
