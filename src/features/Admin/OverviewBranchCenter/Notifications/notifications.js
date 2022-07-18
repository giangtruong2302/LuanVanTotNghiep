import React, { useState } from "react";
import { useEffect } from "react";
import { handleGetDetailCustomer } from "../../GymCenter/Customers/CustomerDetail/CusDetailAPI";
import classes from "./styles.module.scss";

const Notifications = (props) => {
  const [customerDetail, setCustomerDetail] = useState();
  useEffect(() => {
    try {
      handleGetDetailCustomer(props.data.CustomerId)
        .then((res) => {
          if (res.cusDetail) {
            setCustomerDetail(res.cusDetail);
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }, [props]);
  return (
    <div className={classes.cardNotifications}>
      <div className={classes.dateNotifications}>{props.date}</div>
      <div
        className={classes.titleNotifications}
        style={{ display: "flex", gap: "5px" }}
      >
        <img
          src={
            customerDetail?.CustomerImage
              ? customerDetail?.CustomerImage
              : "N/A"
          }
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "6px",
            marginBottom: "5px",
          }}
        />
        <p> : {props.text}</p>
      </div>
      <div className={classes.textNotifications}></div>
    </div>
  );
};

export default Notifications;
