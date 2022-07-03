import React, { useState, useEffect } from "react";
import "./booking.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import StaggerAnimation from "../../../component/StaggerAnimation";
import { getBookingDetail } from "./bookingAPI";
import { useParams } from "react-router-dom";
import { Empty } from "antd";

const Booking = () => {
    const [bookDetail, setBookDetail] = useState();
    const [noBookDetail, setNoBookDetail] = useState(false);
    const [, setBookDetailLoading] = useState(true);
    const id = useParams();

    useEffect(() => {
        getBookingDetail(id.id, 1).then((response) => {
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
                            <div className="listBookingContent container">
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

                                                    </div>

                                                </div>
                                            </div>
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