import moment from "moment";
import { Phone, EnvelopeSimple, MapPinLine, Coin, Clock } from "phosphor-react";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDetailTime } from "../../serviceAPI";
import timezone from "moment-timezone";

import "./customizeListPT.scss";
import { Popover, Steps } from "antd";

const SaturdayRenderer = (props) => {
  const [detailTime, setDetailTime] = useState();
  const [dateTime, setDateTime] = useState();
  const [arrTime, setArrTime] = useState();
  const formatDate = (date) => {
    return moment(
      new Intl.DateTimeFormat("en-Us", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date)
    ).format("dddd");
  };
  useEffect(() => {
    const stamp = new Intl.DateTimeFormat("en-Us", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(props.data?.DayWork);
    setDateTime(stamp);
    let tempArr = [];
    for (let i = 0; i < props?.data?.Shiff?.length; i++) {
      // console.log("check arr 1: ", props?.data?.Shiff[i]?.DayWork);

      if (
        formatDate(props?.data?.Shiff[i]?.DayWork) ===
        moment("2022-07-16 18:08:54.353+07").format("dddd")
      ) {
        tempArr.push(props?.data?.Shiff[i]);
      }

      // let newStamp = props?.data?.Shiff.find(
      //   (shiff) =>
      //     formatDate(shiff?.DayWork) ===
      //     moment("2022-07-16 18:08:54.353+07").format("dddd")
      // );
      // // newStamp.push()
      // setArrTime(newStamp);
    }
    // console.log("temArr: ", tempArr);
    setArrTime(tempArr);
  }, []);
  // console.log("check arr time: ", arrTime);
  // useEffect(() => {
  //   try {
  //     getDetailTime(parseInt(props.data?.TimeId))
  //       .then((res) => {
  //         if (res.time) {
  //           console.log("check res time: ", res.time);
  //           setDetailTime(res.time);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);
  // let time111 = moment(props.data.DayWork).format("dddd, DD-MM-YYYY H:mm A");
  // console.log("time :", time111, props.data.TimeId);

  // function isMatchDay(value) {
  //   return (
  //     formatDate(value) === moment("2022-07-16 18:08:54.353+07").format("dddd")
  //   );
  // }
  // var filterd = props?.data?.Shiff.filter(isMatchDay);
  // console.log("filterd: ", filterd);
  // console.log(
  //   "newStamp: ",
  //   props?.data?.Shiff.filter(
  //     (shiff) =>
  //       // formatDate(shiff?.DayWork) === "Monday"
  //       shiff.TimeId === 1
  //   )
  // );
  // console.log(
  //   "time stamp : ",
  //   props?.data?.Shiff.find(
  //     (shiff) =>
  //       formatDate(shiff?.DayWork) ===
  //       moment("2022-07-16 18:08:54.353+07").format("dddd")
  //     // shiff.TimeId === 1
  //   )
  // );
  return (
    <>
      <div className="phoneContainer">
        <Popover
          content={""}
          trigger="click"
          placement="right"
          visible={false}
          overlayClassName={"timeFramesContainer"}
          // onVisibleChange={handleClickChange}
        >
          {" "}
          {arrTime && arrTime.length > 0 ? (
            <p style={{ fontWeight: "600", color: "#00FF00" }}>
              {arrTime.map((item, index) => {
                return item.TimeId;
              })}{" "}
            </p>
          ) : (
            <p style={{ fontWeight: "600", color: "#FF4500" }}>OFF</p>
          )}
          {/* {formatDate(item.DayWork)} */}
          {/* <Clock color="#0a0700" weight="light" /> */}
        </Popover>
      </div>
    </>
  );
};
export default SaturdayRenderer;
