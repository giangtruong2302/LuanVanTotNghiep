import React, { useState, useEffect } from "react";
import { getServiceDetail } from "../ListBooking/listBookingAPI";
import moment from "moment";
import { getDetailSchedule } from "../ListBooking/listBookingAPI";
import { getTimeById } from "../../Customer/GymCenterDetail/PtSchedule/PtScheduleAPI";
const List = (props) => {
    const [serviceDetail, setServiceDetail] = useState();
    const [noserviceDetail, setNoServiceDetail] = useState(false);
    const [, setServiceDetailLoading] = useState(true)
    const [scheduleDetail, setScheduleDetail] = useState();
    const [noscheduleDetail, setNoScheduleDetail] = useState(false);
    const [, setScheduleDetailLoading] = useState(true)
    const [timeDetail, setTimeDetail] = useState();
    useEffect(() => {
        getServiceDetail(props.data.ServiceId).then((response) => {
            if (response.serviceDetail) {
                setServiceDetail(response.serviceDetail);
                setNoServiceDetail(false);
            } else {
                setNoServiceDetail(true);
            }
        })
            .catch(() => {
                setNoServiceDetail(true);
            })
            .finally(() => {
                setServiceDetailLoading(false);
            });
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
    }, []);
    return (
        <>
            {(props.data.Status) === "SCHEDULED"
                ?
                <div className="Center">
                    <div className="centerInfo">
                        <div className="info">

                            <p className={"infoCus"}>Khách hàng :{props.data.CustomerName}</p>
                            <p className={"infoCus"}>Thời gian : {timeDetail?.StartTime.substring(0, 5)} - {timeDetail?.EndTime.substring(0, 5)} </p>
                            <p className={"infoCus"}>Dịch vụ : {serviceDetail?.ServiceName}</p>

                        </div>
                        <div className="infoService">
                            <p className={"textNameCenter"}>Thời gia bắt đầu: {moment(props.data.StartTime).format("DD-MM-YYYY")} </p>
                            <p className={"textNameCenter"}>Thời gia kết thúc : {moment(props.data.EndTime).format("DD-MM-YYYY")}</p>
                            <p className={"textNameCenter"}>Trạng thái : {props.data.Status}</p>
                        </div>

                    </div>
                </div>
                : " "}
        </>
    )
}
export default List;