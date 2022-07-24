import React, { useState, useEffect } from "react";
import "./booking.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import StaggerAnimation from "../../../component/StaggerAnimation";
import { getBookingDetail } from "./bookingAPI";
import { Empty } from "antd";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import List from "./List";
import { ArrowLeft } from "phosphor-react";
import moment from "moment";


import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
const Booking = () => {
    const navigate = useNavigate()
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(2);
    const [bookDetail, setBookDetail] = useState();
    const [noBookDetail, setNoBookDetail] = useState(false);
    const [, setBookDetailLoading] = useState(true);
    const staffInfo = useSelector((state) => state.staff.staffInfo);

    useEffect(() => {
        if (staffInfo) {
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

        } else {
            navigate(`/staff-login`);
        }
    }, []);
    const fetchNextPageService = async () => {
        getBookingDetail(staffInfo["AccountStaff.id"], page)
            .then((response) => {
                const data = response.bookingOfPT.rows;
                if (data && data.length > 0) {
                    console.log(response);
                    setBookDetail((prev) => {
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
    return (

        <div className="BookingProfileBg">
            <div className="backToHome">
                <NavLink to="/staff-personal-page" className="backtoHome">
                    <ArrowLeft size={24} color="#ffffff" weight="duotone" />
                    <div className="textBackToHome"><FormattedMessage id="header.back-to-home" /></div>
                </NavLink>


            </div>
            <div className="containerListPT">
                <FormattedMessage id="staff-booking.title" />
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
                                <InfiniteScroll className="scroll"
                                    dataLength={8}
                                    style={{ display: "flex", flexDirection: "column", gap: "10px" }}
                                    loader={
                                        <div className={"loading"}>
                                            <StaggerAnimation />
                                        </div>
                                    }
                                    hasMore={hasMore}
                                    next={fetchNextPageService}
                                >
                                    {bookDetail?.map((item, index) => {

                                        return (
                                            <List data={item} />
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