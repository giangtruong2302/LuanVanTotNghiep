import React, { useState, useEffect } from "react";
import "./booking.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import StaggerAnimation from "../../../component/StaggerAnimation";
import { getBookingDetail } from "./bookingAPI";
import { Empty } from "antd";
import { useSelector } from "react-redux";

const Booking = () => {
    const [bookDetail, setBookDetail] = useState();
    const [noBookDetail, setNoBookDetail] = useState(false);
    const [, setBookDetailLoading] = useState(true);
    const staffInfo = useSelector((state) => state.staff.staffInfo);

    useEffect(() => {
        getBookingDetail(staffInfo["AccountStaff.id"], 1).then((response) => {
            if (response.bookingOfPT.rows) {
                setBookDetail(response.bookingOfPT.rows);
                setNoBookDetail(false);
            } else {
                setNoBookDetail(true);
            }
        })
            .catch(() => {
                setNoBookDetail(true);
            })
            .finally(() => {
                setBookDetailLoading(false);
            });
    }, []);
    return (

        <div className="BookingProfileBg">

            <div className="containerListPT">
                Lịch Booking
                <div className="titlePageBooking">
                    <div className="PTinfo">
                        {noBookDetail ? (
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
                            <div className="listBookingContent ">
                                <InfiniteScroll
                                    dataLength={8}
                                    style={{ display: "flex", flexDirection: "column", gap: "10px" }}
                                    loader={
                                        <div className={"loading"}>
                                            <StaggerAnimation />
                                        </div>
                                    }
                                    hasMore={true}
                                >
                                    {bookDetail?.map((item, index) => {

                                        return (
                                            <>
                                                {(item.Status) === "SCHEDULED"
                                                    ?
                                                    <div className="Center">
                                                        <div className="centerInfo">
                                                            <div className="info">

                                                                <p className={"infoCus"}>Khách hàng : {item.CustomerName}</p>
                                                                <p className={"infoCus"}>Ngày bắt đầu : {item.StartTime}</p>
                                                                <p className={"infoCus"}>Ngày kết thúc : {item.EndTime}</p>

                                                            </div>
                                                            <div className="infoService">
                                                                <p className={"textNameCenter"}>Dịch vụ đăng ký : {item.ServiceId}</p>
                                                                <p className={"textNameCenter"}>Huấn luyện viên : {item.PTName}</p>
                                                                <p className={"textNameCenter"}>Trạng thái : {item.Status}</p>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    : ""}
                                            </>
                                        )
                                    })}

                                </InfiniteScroll>
                            </div>
                        )
                        }
                    </div>

                </div>
            </div>
        </div>
    );
};
export default Booking;