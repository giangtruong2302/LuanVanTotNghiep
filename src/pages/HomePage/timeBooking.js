import React, { useState, useEffect } from "react";
import "./HomeHeader.scss";
import { useNavigate } from "react-router-dom";
import { getDetailSchedule } from "../../features/Staff/ListBooking/listBookingAPI";
import { getTimeById } from "../../features/Customer/GymCenterDetail/PtSchedule/PtScheduleAPI";
const TimeBooking = (props) => {

    const [scheduleDetail, setScheduleDetail] = useState();
    const [noscheduleDetail, setNoScheduleDetail] = useState(false);
    const [, setScheduleDetailLoading] = useState(true)
    const [timeDetail, setTimeDetail] = useState();
    useEffect(() => {
        getDetailSchedule(props.data.ScheduleId).then((response) => {
            if (response.schedule) {
                setScheduleDetail(response.schedule);
                setNoScheduleDetail(false);
                getTimeById(response.schedule.TimeId)

                    .then((res) => {

                        setTimeDetail(res.time);

                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                setNoScheduleDetail(true);
            }
        })
            .catch(() => {
                setNoScheduleDetail(true);
            })
            .finally(() => {
                setScheduleDetailLoading(false);
            });
    }, [])
    const navigate = useNavigate();



    return (

        <>
            <p>Thời gian : {timeDetail?.StartTime.substring(0, 5)} - {timeDetail?.EndTime.substring(0, 5)} </p>
        </>
    )


}
export default TimeBooking;