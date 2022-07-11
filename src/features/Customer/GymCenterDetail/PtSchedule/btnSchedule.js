import React from "react";
import "./ptSchedule.scss";
import { useState } from "react";
import { useEffect } from "react";
import { getTimeById } from "./PtScheduleAPI";

const ButtonSchedule = (props) => {
  const [timeDetail, setTimeDetail] = useState();
  useEffect(() => {
    getTimeById(props.data.TimeId)

      .then((res) => {
        console.log("check time detail: ", res);
        setTimeDetail(res.time);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.data]);
  return (
    <>
      {props.data.Status === 0 ?
        <button
          disabled
          className="btn-no"
          value={timeDetail?.id}
          onClick={(e) => props.open(e)}
        >
          {timeDetail?.TimeWork}
        </button>
        :
        <button
          className="btn-vie"
          value={timeDetail?.id}
          onClick={(e) => props.open(e)}
        >
          {" "}
          {timeDetail?.TimeWork}
        </button>
      }


    </>
  );
};
export default ButtonSchedule;
