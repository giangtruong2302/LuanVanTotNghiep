import moment from "moment";
import { Phone, EnvelopeSimple, MapPinLine, Coin, Clock } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDetailTime } from "../../serviceAPI";
import "./customizeListPT.scss";

const DayRenderer = (props) => {
  console.log("check props time id: ", props);
  const [detailTime, setDetailTime] = useState();
  const [dateTime, setDateTime] = useState();
  useEffect(() => {
    const stamp = new Intl.DateTimeFormat("en-Us", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(props.data?.DayWork);
    setDateTime(stamp);
  }, []);
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
  return (
    <>
      <div className="phoneContainer">
        <div className="phoneText">
          {/* {moment(props.data?.DayWork).format("dddd, DD-MM-YYYY H:mm A")}{" "} */}
          {/* {props.data?.DayWork} */}
          {moment(dateTime).format("dddd, DD-MM-YYYY H:mm A")}
          --- {props.data.TimeId}
        </div>
        <Clock color="#0a0700" weight="light" />
      </div>
    </>
  );
};
export default DayRenderer;
