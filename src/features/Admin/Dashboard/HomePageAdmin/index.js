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
import {
  getAllCenter,
  getBookingCancel,
  getBookingPending,
  handleGetAllStaff,
} from "../../AdminAPI";
import { getAllService } from "../../ManageService/serviceAPI";
import { getAllStaffOfCenter } from "../../GymCenter/Staffs/StaffAPI";
import AreaChart from "./ReservationCenter1/areaChart";
import AreaChart1 from "./ReservationCenter2/areaChart";

const HomePageAdmin = () => {
  const CenterId = localStorage.getItem("CenterId");
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [totalCenter, setTotalCenter] = useState(0);
  const [totalService, setTotalService] = useState(0);
  const [totalStaffs, setTotalStaffs] = useState(0);

  const [totalBookingPending, setTotalBookingPending] = useState(0);
  const [totalBookingScheduled, setTotalBookingScheduled] = useState(0);
  const [totalBookingCancel, setTotalBookingCancel] = useState(0);
  useEffect(() => {
    try {
      getAllCustomerOfSystem(1)
        .then((res) => {
          // console.log(res.customers.count);
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
      getAllService("", 1).then((res) => {
        if (res) {
          setTotalService(res.services.count);
        }
      });
      handleGetAllStaff(1).then((res) => {
        if (res) {
          setTotalStaffs(res.staffs.count);
        }
      });
      getBookingPending("PENDING").then((res) => {
        setTotalBookingPending(res.bookingPending.count);
      });
      getBookingCancel("CANCELLED").then((res) => {
        setTotalBookingCancel(res.bookingPending.count);
      });
      getBookingCancel("SCHEDULED").then((res) => {
        setTotalBookingScheduled(res.bookingPending.count);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <div className="HomepageAdminBg">
        <div className="titleHomeAdmin">System GHGYM</div>
        <Row className="overviewCalc">
          <Col span={5} className="gymCenterTotal">
            <div className="bgCenterTotal"></div>
            <p>Gym center Total</p>
            <p>{totalCenter}</p>
          </Col>
          <Col span={5} className="serviceOfGHGym">
            <div className="bgServiceTotal"></div>
            <p>Servive</p>
            <p>{totalService}</p>
          </Col>
          <Col span={5} className="accountCusTotal">
            <div className="bgCustomerTotal"></div>
            <p>Account customer total</p>
            <p>{totalCustomer}</p>
          </Col>
          <Col span={5} className="serviceHours">
            <div className="bgStaffTotal"></div>
            <p>Staffs of System</p>
            <p>{totalStaffs}</p>
          </Col>
        </Row>
        <div className="titleHomeAdmin">Chart Booking of Month in GHGYM</div>
        <div className="chartReservation">
          <Row className="chartReservationContent">
            <Col span={17} className="leftChart">
              <ChartReservation />
            </Col>
            <Col span={6} className="rightChart">
              <Row className="rightChartContent">
                <Col span={6} style={{ height: "20%", display: "flex" }}>
                  <p> Pending status: </p>
                  <p style={{ color: "#3EC70B", fontWeight: "600" }}>
                    {totalBookingPending}
                  </p>
                </Col>
                <Col span={6} style={{ height: "20%", display: "flex" }}>
                  <p>Scheduled status: </p>
                  <p style={{ color: "#4B7BE5", fontWeight: "600" }}>
                    {totalBookingScheduled}
                  </p>
                </Col>
                <Col span={6} style={{ height: "20%", display: "flex" }}>
                  <p>Cancel status: </p>
                  <p style={{ color: "#F32424", fontWeight: "600" }}>
                    {totalBookingCancel}
                  </p>
                </Col>
                <Col span={6} style={{ height: "20%" }}>
                  <p> Total Booking in month:</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <Row className="unresolved">
          <Col span={11} className="unresolvedOnTop">
            <div className="unresolvedOnTopHeader">
              <span className="unresolvedOnTopTitle">
                <p className="textUnresolvedTitle">Chi nhánh Phạm Ngũ Lão</p>
              </span>
              <span className="viewDetailUnresolved">
                <NavLink to="">View Detail</NavLink>
              </span>
            </div>
            <div className="contentUnresolve">
              <AreaChart />
            </div>
          </Col>
          <Col span={11} className="ageCusPopular">
            <div className="unresolvedOnTopHeader">
              <span className="unresolvedOnTopTitle">
                <p className="textUnresolvedTitle">Chi nhánh Lý Thường Kiệt</p>
              </span>
              <span className="viewDetailUnresolved">
                <NavLink to="">View Detail</NavLink>
              </span>
            </div>
            <div className="contentUnresolve">
              <AreaChart1 />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default HomePageAdmin;
