import React from "react";
import "./PtSchedule.scss";
import { useState } from "react";
import { useEffect } from "react";
import { getTimeById } from "./ptScheduleAPI";
import moment from "moment";
const ButtonSchedule = (props) => {
    const [timeDetail, setTimeDetail] = useState();
    const [formatTime, setFormatTime] = useState()
    useEffect(() => {
        getTimeById(props.data.TimeId)

            .then((res) => {
                console.log("check time detail: ", res);
                setTimeDetail(res.time);
                setFormatTime(res.time.StartTime)
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
                    value={props.data.id}
                    onClick={(e) => props.open(e)}
                >
                    {timeDetail?.StartTime.substring(0, 5)} - {timeDetail?.EndTime.substring(0, 5)}
                </button>
                :
                <button
                    className="btn-vie"
                    value={props.data.id}
                    onClick={(e) => props.open(e)}
                >
                    {" "}
                    {timeDetail?.StartTime.substring(0, 5)} - {timeDetail?.EndTime.substring(0, 5)}
                </button>
            }


        </>
    );
};
export default ButtonSchedule;
