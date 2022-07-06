import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./listBooking.scss";
import { Empty } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import StaggerAnimation from "../../../component/StaggerAnimation";
import { Link } from "react-router-dom";
import chinhanh from "../../../assets/images/gym-place/chiNhanh1.jpg";
import { getAllBookingOfPT } from "./listBookingAPI";
import { useParams } from "react-router-dom";
import { getAcceptBooking } from "./listBookingAPI";
import { getCancelBooking } from "./listBookingAPI";
import { ToastContainer, toast } from 'react-toastify';
const ListBooking = () => {
    const [noService, setNoservice] = useState(false);
    const [bookingOfPt, setBookingOfPt] = useState();
    const [noBookingOfPt, setNoBookingOfPt] = useState(false);
    const [, setBookingOfPtLoading] = useState(true);
    const id = useParams();
    const [schedule, setSchedule] = useState("SCHEDULED");
    const [canceled, setCancled] = useState("CANCELED")
    const [amountBooking, setAmountBooing] = useState(30000);
    const [bookingId, setBookingId] = useState(2)
    const staffInfo = useSelector((state) => state.staff.staffInfo);
    const options = {

        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };
    useEffect(() => {
        getAllBookingOfPT(staffInfo["AccountStaff.id"], 1).then((response) => {
            if (response.bookingOfPT.rows) {
                setBookingOfPt(response.bookingOfPT.rows);
                setNoBookingOfPt(false);
            } else {
                setNoBookingOfPt(true);
            }
        })
            .catch(() => {
                setNoBookingOfPt(true);
            })
            .finally(() => {
                setBookingOfPtLoading(false);
            });
    }, []);
    const [messRes, setMessRes] = useState()
    const handleIdBooking = (id, CustomerId, CustomerName, StaffId) => {
        getAcceptBooking(schedule, id, CustomerId, CustomerName, StaffId, amountBooking).then((response) => {

            if (response.message.errorCode === 0) {
                toast.success("Success", options)
            } else {
                toast.error("Fail", options)
            }


        })

    }
    const handleCancelBooking = (id) => {

        getCancelBooking(canceled, id).then((response) => {

            if (response.message.errorCode === 0) {
                toast.success("Success", options)
            } else {
                toast.error("Fail", options)
            }


        })
    }

    return (
        <>
            {noService ? (
                <div className="noData">
                    <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{
                            height: 60,
                        }}
                        description={"No Data"}
                    />
                </div>
            ) : (
                <div className="listCenterContent ">
                    <InfiniteScroll
                        dataLength={8}
                        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
                        loader={
                            <div className={"loading"}>
                                <StaggerAnimation />
                            </div>
                        }
                        hasMore={true}
                    >
                        {bookingOfPt?.map((item, index) => {

                            return (
                                <>
                                    {(item.Status) === "PENDING"
                                        ?
                                        <div className="Center">
                                            <div className="centerInfo">
                                                <div className="info">

                                                    <p className={"infoCus"}>Khách hàng :{item.CustomerName}</p>
                                                    <p className={"infoCus"}>Cơ sở : {item.CenterId}</p>
                                                    <p className={"infoCus"}>Dịch vụ đăng ký : {item.ServiceId}</p>

                                                </div>
                                                <div className="infoService">
                                                    <p className={"textNameCenter"}>Thời gia bắt đầu: {item.StartTime}</p>
                                                    <p className={"textNameCenter"}>Thời gia kết thúc : {item.EndTime}</p>
                                                    <p className={"textNameCenter"}>Trạng thái : {item.Status}</p>
                                                </div>
                                                <div className="detailInfo">
                                                    <button className="buttonAccept" onClick={() => handleIdBooking(item.id, item.CustomerId, item.CustomerName, item.StaffId)} >Xác nhận</button>
                                                    <span className="lineDetailInfo"></span>
                                                    <button className="buttonDeniend" onClick={() => handleCancelBooking(item.id)} >Từ chối</button>
                                                </div>
                                            </div>
                                        </div>
                                        : " "}
                                </>
                            )
                        })}

                    </InfiniteScroll>
                </div>
            )}<ToastContainer />
        </>
    );
};
export default ListBooking;
