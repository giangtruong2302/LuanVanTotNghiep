import React, { useState, useEffect } from "react";
import "./cusBooking.scss";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import moment from "moment";
import { Empty } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import StaggerAnimation from "../../../../component/StaggerAnimation";
import { getCusBooking } from "./cusBookingAPI";
import { useSelector } from "react-redux";
import HomeFooter from "../../../../pages/HomePage/HomeFooter";
import { handleGetDetailCustomerByExternalId } from "../../PayPage/PaymentPage/paymentAPI";
const BookingOfCus = () => {
    const cusInfo = useSelector((state) => state.cus.cusInfo);
    const [cusBooking, setCusBooking] = useState();
    const [noCusBooking, setNoCusBooking] = useState(false);
    const [, setCusBookingLoading] = useState(true);
    const [detailCustomer, setDetailCustomer] = useState();
    useEffect(() => {
        if (cusInfo) {
            try {
                handleGetDetailCustomerByExternalId(cusInfo.ExternalId)
                    .then((res) => {
                        if (res.cusDetail) {
                            setDetailCustomer(res.cusDetail);
                            getCusBooking(res.cusDetail.id, 1)
                                .then((response) => {
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
                        }
                    })
                    .catch((error) => console.log(error));
            } catch (error) {
                console.log(error);
            }
        }
    }, []);
    return (

        <div className="BookProfileBg">
            <div className="backToHome">
                <NavLink to="/customer-infomation" className="backtoHome">
                    <ArrowLeft size={24} color=" #ffffff" weight="duotone" />
                    <div className="textBackToHome">Back</div>
                </NavLink>

            </div>
            <div className="containerListPT">
                Lịch Booking
                <div className="titlePageBooking">
                    <div className="PTinfo">
                        {noCusBooking ? (
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
                                    {/* {bookDetail?.map((item, index) => {

                                    return ( */}
                                    <>
                                        {cusBooking?.map((item, index) => {
                                            return (
                                                <div className="Center">
                                                    <div className="centerInfo">
                                                        <div className="info">

                                                            <p className={"infoCus"}>Khách hàng : {item.CustomerName} </p>
                                                            <p className={"infoCus"}>Ngày bắt đầu : {moment(item.StartTime).format("DD-MM-YYYY")}    </p>
                                                            <p className={"infoCus"}>Ngày kết thúc : {moment(item.EndTime).format("DD-MM-YYYY")} </p>

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

                        )
                        }

                    </div>

                </div>

            </div>
            <HomeFooter />
        </div>
    );
}
export default BookingOfCus;