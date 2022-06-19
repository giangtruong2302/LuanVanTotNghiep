import { Col, PageHeader, Row, Input } from "antd";
import React from "react";
import classes from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
const { Search } = Input;
const ReservationDetail = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.ReservationDetailBg}>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate("/admin/manage-center")}
        subTitle="Back to dashboard center"
        style={{
          top: 0,
          position: "sticky",
          zIndex: "9",
          background:
            "linear-gradient(305.38deg, #fff -50.47%, #f2edf0 94.82%)",
          color: "#fff",
          fontWeight: "600",
        }}
        extra={
          <Search
            style={{ borderRadius: "8px !important" }}
            placeholder="search reservation of center"
            loading
            enterButton
          />
        }
      />
      <Row className={classes.ReservationDetailContainer}>
        <Col span={12} className={classes.leftContainer}>
          <div className={classes.textContentReserLeft}>
            <div className={classes.titleReser}>Reservation Id</div>
            <div className={classes.textReser}>Center Name</div>
            <div className={classes.titleReser}>Center Address</div>
            <div className={classes.textReser}>Customer Name</div>
            <div className={classes.titleReser}>Customer Mobile</div>
            <div className={classes.textReser}>Customer Address</div>
          </div>
          <div className={classes.textContentReserRight}>
            <div className={classes.titleReser}>#BB1655376277</div>
            <div className={classes.textReser}>Center Quan 8</div>
            <div className={classes.titleReser}>180 Cao lo p5 Q8 TP.HCM</div>
            <div className={classes.textReser}>Duong Truong Giang</div>
            <div className={classes.titleReser}>0337657262</div>
            <div className={classes.textReser}>TP HCM</div>
          </div>
        </Col>
        <Col span={11} className={classes.rightContainer}>
          <div className={classes.textContentReserLeft}>
            <div className={classes.titleReser}>Reservation Id</div>
            <div className={classes.textReser}>Center Name</div>
            <div className={classes.titleReser}>Center Address</div>
            <div className={classes.textReser}>Customer Name</div>
            <div className={classes.titleReser}>Customer Mobile</div>
            <div className={classes.textReser}>Customer Address</div>
          </div>
          <div className={classes.textContentReserRight}>
            <div className={classes.titleReser}>#BB1655376277</div>
            <div className={classes.textReser}>Center Quan 8</div>
            <div className={classes.titleReser}>180 Cao lo p5 Q8 TP.HCM</div>
            <div className={classes.textReser}>Duong Truong Giang</div>
            <div className={classes.titleReser}>0337657262</div>
            <div className={classes.textReser}>TP HCM</div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={19}></Col>
        <Col span={5} className={classes.control}>
          <button className={classes.btnCancelService}>Cancel</button>
          <button className={classes.btnControlService}>
            Start in Service
          </button>
        </Col>
      </Row>
    </div>
  );
};
export default ReservationDetail;
