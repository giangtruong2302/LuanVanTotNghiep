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
import { getCancelBooking } from "../../../Staff/ListBooking/listBookingAPI";
import { ToastContainer, toast } from 'react-toastify';
import ListCusBooking from "./ListCusBooking";
import { FormattedMessage } from "react-intl";
const BookingOfCus = () => {
    const cusInfo = useSelector((state) => state.cus.cusInfo);
    const [cusBooking, setCusBooking] = useState();
    const [noCusBooking, setNoCusBooking] = useState(false);
    const [, setCusBookingLoading] = useState(true);
    const [detailCustomer, setDetailCustomer] = useState();
    const [canceled, setCancled] = useState("CANCELED")
    const [statusPage, setStatusPage] = useState("")
    const [cusId, setCusId] = useState()
    const [page, setPage] = useState(2)
    const [hasMore, setHasMore] = useState(true);
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
        if (cusInfo) {
            try {
                handleGetDetailCustomerByExternalId(cusInfo.ExternalId)
                    .then((res) => {
                        if (res.cusDetail) {
                            setDetailCustomer(res.cusDetail);
                            setCusId(res.cusDetail.id)
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
    }, [statusPage]);
    const fetchNextCusBooking = async () => {
        getCusBooking(cusId, page)
            .then((response) => {
                const data = response.bookingOfCus.rows;
                if (data && data.length > 0) {
                    setCusBooking((prev) => {
                        if (prev !== undefined) return [...prev, ...data];
                    });
                    if (data.length === 0 || data.length < 10) {
                        setHasMore(false);
                    }
                    setPage(page + 1);
                }
            })
            .catch(() => {
                // setFlag(true);
                setHasMore(false);
            })
            .finally(() => {
                // setFlag(true);
                console.log("success");
                // setHasMore(false)
            });
    };
    const handleCancelBooking = (id, ScheduleId) => {

        getCancelBooking(canceled, id, ScheduleId).then((response) => {

            if (response.message.errorCode === 0) {
                toast.success("Success", options)
                setStatusPage(Date.now())
            } else {
                toast.error("Fail", options)
            }


        })
    }
    return (

        <div className="BookProfileBg">
            <div className="backToHome">
                <NavLink to="/customer-infomation" className="backtoHome">
                    <ArrowLeft size={24} color=" #ffffff" weight="duotone" />
                    <div className="textBackToHome"><FormattedMessage id="header.back" /></div>
                </NavLink>

            </div>
            <div className="containerListPT">
                <FormattedMessage id="cus-booking.title" />
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
                                    dataLength={cusBooking?.length ? cusBooking?.length : 0}
                                    style={{ display: "flex", flexDirection: "column", gap: "10px" }}
                                    loader={
                                        <div className={"loading"}>
                                            <StaggerAnimation />
                                        </div>
                                    }
                                    hasMore={hasMore}
                                    next={fetchNextCusBooking}
                                >
                                    {/* {bookDetail?.map((item, index) => {

                                    return ( */}
                                    <>
                                        {cusBooking?.map((item, index) => {
                                            return (
                                                <ListCusBooking data={item} cancel={handleCancelBooking} />
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