import { Col, PageHeader, Row, Input } from "antd";
import React, { useEffect } from "react";
import classes from "./styles.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { getDetailBookingOfCenter } from "../ReservationMerchant/ReservationAPI";
import { useState } from "react";
import { handleGetDetailService } from "../../ManageOrder/orderAPI";
import moment from "moment";
import { handleGetDetailCustomer } from "../Customers/CustomerDetail/CusDetailAPI";
const { Search } = Input;
const ReservationDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const reservationId = location.pathname.split("/")[4];
  const CenterId = localStorage.getItem("CenterId");
  const [bookingDetail, setBookingDetail] = useState();
  const [serviceDetail, setServiceDetail] = useState();
  const [detailCustomer, setDetailCustomer] = useState();
  // console.log("check reservationid: ", reservationId);
  useEffect(() => {
    try {
      getDetailBookingOfCenter(CenterId, reservationId).then((res) => {
        if (res.bookingDetail) {
          setBookingDetail(res.bookingDetail);
          if (res.bookingDetail.ServiceId && res.bookingDetail.CustomerId) {
            handleGetDetailService(res.bookingDetail.ServiceId)
              .then((res) => {
                if (res) {
                  setServiceDetail(res.serviceDetail);
                }
              })
              .catch((error) => console.log(error));
            handleGetDetailCustomer(res.bookingDetail.CustomerId)
              .then((res) => {
                setDetailCustomer(res.cusDetail);
              })
              .catch((error) => console.log(error));
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [reservationId, CenterId]);
  // console.log("check bookig detail: ", bookingDetail);
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
            <div className={classes.titleReser}>{bookingDetail?.id}</div>
            <div className={classes.textReser}>{bookingDetail?.CenterId}</div>
            <div className={classes.titleReser}>180 Cao lo p5 Q8 TP.HCM</div>
            <div
              className={classes.textReser}
              style={{ display: "flex", gap: "10px" }}
            >
              <img
                src={
                  detailCustomer?.CustomerImage
                    ? detailCustomer?.CustomerImage
                    : "N/A"
                }
                style={{ width: "30px", height: "30px", borderRadius: "6px" }}
              />{" "}
              {bookingDetail?.CustomerName}
            </div>
            <div className={classes.titleReser}>
              {detailCustomer?.PhoneNumber}
            </div>
            <div className={classes.textReser}>{detailCustomer?.Address}</div>
          </div>
        </Col>
        <Col span={11} className={classes.rightContainer}>
          <div className={classes.textContentReserLeft}>
            <div className={classes.titleReser}>Service Id</div>
            <div className={classes.textReser}>Service Name</div>
            <div className={classes.titleReser}>Service Image</div>
            <div className={classes.textReser}>Thời gian bắt đầu</div>
            <div className={classes.titleReser}>Thời gian kết thúc</div>
            <div className={classes.textReser}>Giá</div>
          </div>
          <div className={classes.textContentReserRight}>
            <div className={classes.titleReser}>{bookingDetail?.ServiceId}</div>
            <div className={classes.textReser}>
              {serviceDetail?.ServiceName}
            </div>
            <div className={classes.titleReser}>
              <img
                style={{ width: "35px", height: "35px", borderRadius: "6px" }}
                src={
                  serviceDetail?.ServiceImage
                    ? serviceDetail?.ServiceImage
                    : "N/A"
                }
              />
            </div>
            <div className={classes.textReser}>
              {moment(bookingDetail?.StartTime).format(
                "dddd, DD-MM-YYYY H:mm A"
              )}
            </div>
            <div className={classes.titleReser}>
              {moment(bookingDetail?.EndTime).format("dddd, DD-MM-YYYY H:mm A")}
            </div>
            <div className={classes.textReser}>{bookingDetail?.price}</div>
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
