import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import staff from "../../../../../../assets/images/imgStaff/staff.png";
import { handleGetDetailCustomer } from "../../../Customers/CustomerDetail/CusDetailAPI";
import { handleGetDetailStaff } from "../../../Staffs/StaffDetail/StaffDetailAPI";
import classes from "./styles.module.scss";

const ReservationItemMerchant = (props) => {
  const [customerDetail, setCustomerDetail] = useState();
  const [staffDetail, setStaffDetail] = useState();
  useEffect(() => {
    if (props.data.CustomerId) {
      handleGetDetailCustomer(props.data.CustomerId).then((res) => {
        if (res.cusDetail) {
          setCustomerDetail(res.cusDetail);
        }
      });
    }
    if (props.data.StaffId) {
      handleGetDetailStaff(props.data.StaffId).then((res) => {
        if (res.staffDetail) {
          setStaffDetail(res.staffDetail);
        }
      });
    }
  }, [props]);

  const statusCondition = () => {
    switch (props.data.Status) {
      case "PENDING":
        return classes.pending;
      case "SCHEDULED":
        return classes.schedule;
      case "STARTING":
        return classes.starting;
      case "CANCELLED":
        return classes.cancel;
      case "REJECTED":
        return classes.cancel;
      case "COMPLETED":
        return classes.complete;
      default:
        return classes.pending;
    }
  };

  const handleColor = (index) => {
    switch (index) {
      case 0:
      case 5:
      case 10:
        return "color1";
      case 1:
      case 6:
        return "color2";
      case 2:
      case 7:
        return "color3";
      case 3:
      case 8:
        return "color4";
      case 4:
      case 9:
        return "color5";
      default:
        return "color1";
    }
  };
  // console.log("check props: ", props);
  return (
    <NavLink
      to={`/admin/merchant/reservation-detail/${props.data.id}`}
      className={classes.itemContainer}
    >
      <div className={classes.confirmation}>
        <div className={`${classes.status} ${statusCondition()}`}>
          <div className={`${statusCondition()}`}> </div>
          {props.data.Status ? props.data.Status : "N/A"}
        </div>
        <div className={classes.date}>
          {moment(new Date(props.data.StartTime), "DD-MM-YYYY")
            .format("dddd, DD MMMM, HH:mm A")
            .toUpperCase()}
        </div>
        <div className={classes.id}>
          {"# "}
          {props.data.id ? props.data.id : "N/A"}
        </div>
      </div>
      <div className={classes.information}>
        <div className={classes.cusDetail}>
          <img
            src={
              customerDetail?.CustomerImage
                ? customerDetail?.CustomerImage
                : staff
            }
            alt=""
          />
          <div className={classes.cusName}>
            {props.data.CustomerName ? props.data.CustomerName : "N/A"}
          </div>
        </div>

        <div className={classes.infoDetail}>
          <div className={classes.infoDetailItem}>
            <PhoneOutlined />
            <span className={"text"}>
              {props.data?.CustomerBooking["PhoneNumber"]}
            </span>
          </div>
          <div className={classes.infoDetailItem}>
            <MailOutlined />
            <span className={classes.text}>
              {" "}
              {props.data?.CustomerBooking["CustomerEmail"]}
            </span>
          </div>
          <div className={classes.infoDetailItem}>
            <EnvironmentOutlined />
            <span className={classes.text}>
              {" "}
              {props.data.CustomerBooking["Address"]}
            </span>
          </div>
        </div>
      </div>
      <div className={classes.serviceDetail}>
        <div className={`${classes.serviceItem} ${handleColor(1)}`}>
          <div className={classes.serviceName}>{props.data.ServiceId}</div>
          <div className={classes.staffDetail}>
            Staff :
            <img
              src={staffDetail?.StaffImage ? staffDetail?.StaffImage : staff}
              alt=""
              style={{ height: "35px", width: "35px" }}
            />
            {props.data.PTName ? props.data.PTName : "N/A"}
          </div>
        </div>
      </div>
    </NavLink>
  );
};
export default ReservationItemMerchant;
