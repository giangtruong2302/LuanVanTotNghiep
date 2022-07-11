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
      <button
        disabled
        className="btn-no"
        value={timeDetail?.id}
        //  onClick={(e) => openModal(e)}
      >
        {timeDetail?.TimeWork}
      </button>
      {/* :
                                                        <button className="btn-vie" value={item.id} onClick={(e) => openModal(e)} >{item.TimeId}</button> */}
    </>
  );
};
export default ButtonSchedule;
