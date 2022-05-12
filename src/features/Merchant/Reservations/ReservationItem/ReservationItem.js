import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import moment from "moment";
import React from "react";
import { NavLink } from "react-router-dom";
import staff from "../../../../assets/images/imgStaff/staff.png";
import "./ReservationItem.scss";

const ReservationItem = () => {
  const statusCondition = () => {
    switch ("pending") {
      case "PENDING":
        return "pending";
      case "SCHEDULED":
        return "schedule";
      case "STARTING":
        return "starting";
      case "CANCELLED":
        return "cancel";
      case "REJECTED":
        return "cancel";
      case "COMPLETED":
        return "complete";
      default:
        return "pending";
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
  return (
    <NavLink to={`/reservation/detail`} className="itemContainer">
      <div className="confirmation">
        <div className={`${"status"} ${statusCondition()}`}>
          <div className={`${statusCondition()}`}> </div>
          NEW
        </div>
        <div className="date">
          {moment(new Date(`23 0002 12:12 A}`))
            .format("dddd, DD MMMM, HH:mm A")
            .toUpperCase()}
        </div>
        <div className="id">{"props.booking.code"}</div>
      </div>
      <div className="information">
        <div className="cusDetail">
          <img src={staff} alt="" />
          <div className="cusName">
            {"props.customer.firstName"} {"props.customer.lastName"}
          </div>
        </div>

        <div className="infoDetail">
          <div className={"infoDetailItem"}>
            <PhoneOutlined />
            <span className={"text"}>{"props.customer.phoneNumber"}</span>
          </div>
          <div className="infoDetailItem">
            <MailOutlined />
            <span className="text">{"props.customer.email"}</span>
          </div>
          <div className="infoDetailItem">
            <EnvironmentOutlined />
            <span className="text">{"props.customer.address"}</span>
          </div>
        </div>
      </div>
      <div className="serviceDetail">
        <div className={`${"serviceItem"} ${handleColor(1)}`}>
          <div className="serviceName">{"item.service"}</div>
          <div className="staffDetail">
            Staff :
            <img src={staff} alt="" style={{ height: "35px", width: "35px" }} />
            {" Anyone"}
          </div>
        </div>
      </div>
    </NavLink>
  );
};
export default ReservationItem;
