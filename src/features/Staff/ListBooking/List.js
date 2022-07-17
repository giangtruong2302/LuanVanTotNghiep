import React, { useState, useEffect } from "react";
import { getServiceDetail } from "./listBookingAPI";
import moment from "moment";
const List = (props) => {
    const [serviceDetail, setServiceDetail] = useState();
    const [noserviceDetail, setNoServiceDetail] = useState(false);
    const [, setServiceDetailLoading] = useState(true)
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
    }, []);
    return (
        <>
            {(props.data.Status) === "PENDING"
                ?
                <div className="Center">
                    <div className="centerInfo">
                        <div className="info">

                            <p className={"infoCus"}>Khách hàng :{props.data.CustomerName}</p>
                            <p className={"infoCus"}>Cơ sở : {props.data.CenterId}</p>
                            <p className={"infoCus"}>Dịch vụ : {serviceDetail?.ServiceName}</p>

                        </div>
                        <div className="infoService">
                            <p className={"textNameCenter"}>Thời gia bắt đầu: {moment(props.data.StartTime).format("DD-MM-YYYY")} </p>
                            <p className={"textNameCenter"}>Thời gia kết thúc : {moment(props.data.EndTime).format("DD-MM-YYYY")}</p>
                            <p className={"textNameCenter"}>Trạng thái : {props.data.Status}</p>
                        </div>
                        <div className="detailInfo">
                            <button className="buttonAccept" onClick={() => props.accept(props.data.id, props.data.ScheduleId, props.data.CustomerId, props.data.CustomerName, props.data.price)} >Xác nhận</button>
                            <span className="lineDetailInfo"></span>
                            <button className="buttonDeniend" onClick={() => props.cancel(props.data.id, props.data.ScheduleId)} >Từ chối</button>
                        </div>
                    </div>
                </div>
                : " "}
        </>
    )
}
export default List;