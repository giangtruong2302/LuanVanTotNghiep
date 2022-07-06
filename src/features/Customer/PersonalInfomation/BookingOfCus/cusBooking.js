import React, { useState, useEffect } from "react";
import "./cusBooking.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import StaggerAnimation from "../../../../component/StaggerAnimation";
import { getCusBooking } from "./cusBookingAPI";
import { useSelector } from "react-redux";
const BookingOfCus = () => {
    const cusInfo = useSelector((state) => state.cus.cusInfo);
    const [cusBooking, setCusBooking] = useState();
    const [noCusBooking, setNoCusBooking] = useState(false);
    const [, setCusBookingLoading] = useState(true);
    useEffect(() => {
        getCusBooking(cusInfo["AccountCustomer.id"], 1).then((response) => {
            if (response.bookingOfCus.rows) {
                setCusBooking(response.bookingOfCus.rows);
                setNoCusBooking(false);
            } else {
                setNoCusBooking(true);
            }
        })
            .catch(() => {
                setNoCusBooking(true);
            })
            .finally(() => {
                setCusBookingLoading(false);
            });
    }, []);
    return (

        <div className="BookingProfileBg">

            <div className="containerListPT">
                Lịch Booking
                <div className="titlePageBooking">
                    <div className="PTinfo">
                        {/* {noBookDetail ? (
                            <div className="noData">
                                <Empty
                                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                    imageStyle={{
                                        height: 60,
                                    }}
                                    description={"No Data"}
                                />
                            </div>
                        ) : ( */}
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
                                {/* {bookDetail?.map((item, index) => {

                                    return ( */}
                                <>
                                    {cusBooking?.map((item, index) => {
                                        return (
                                            <div className="Center">
                                                <div className="centerInfo">
                                                    <div className="info">

                                                        <p className={"infoCus"}>Khách hàng : {item.CustomerName} </p>
                                                        <p className={"infoCus"}>Ngày bắt đầu : {item.StartTime}</p>
                                                        <p className={"infoCus"}>Ngày kết thúc : {item.EndTime}</p>

                                                    </div>
                                                    <div className="infoService">
                                                        <p className={"textNameCenter"}>Dịch vụ đăng ký : {item.ServiceId} </p>
                                                        <p className={"textNameCenter"}>Huấn luyện viên : {item.PTName}</p>
                                                        <p className={"textNameCenter"}>Trạng thái : {item.Status}</p>
                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    })}

                                </>
                                {/* )
                                })} */}

                            </InfiniteScroll>
                        </div>
                        {/* )
                        } */}
                    </div>

                </div>
            </div>
        </div>
    );
}
export default BookingOfCus;