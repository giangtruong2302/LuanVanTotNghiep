// import timezone from "moment-timezone";

import React from "react";
import classes from "./styles.module.scss";
import unknow from "../../../../../../assets/images/person-placeholder.jpg";
import { useSelector } from "react-redux";
import moment from "moment";

const UpcomingBooking = (props) => {
  // const currentTimezone = useAppSelector(
  //   (state) => state.currentSalon.data.timezone
  // );

  return (
    <div className={classes.cardUpcomingBooking}>
      <div className={classes.date}>
        {/* {moment(props.date).format('dddd, DD MMMM, HH:mm A')} */}
        {props.date
          ? // ? timezone
            //     .utc(props.date || "")
            //     // .tz(currentTimezone || "")
            moment(props.date || "").format("dddd, DD MMMM, HH:mm A")
          : "N/A"}
      </div>
      <div className={classes.col}>
        <div className={classes.itemCol}>
          <div className={classes.imgBooking}>
            <img src={props.image ? props.image : unknow} alt="" />
          </div>
        </div>
        <div className={classes.contentBooking}>
          <div className={classes.title}>{props.title}</div>
          <div className={classes.value}>{props.address}</div>
        </div>
      </div>
    </div>
  );
};
export default UpcomingBooking;
