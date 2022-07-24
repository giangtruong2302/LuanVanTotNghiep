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
import { useNavigate } from "react-router-dom";
import List from "./List";
import moment from "moment";
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
    const [statusPage, setStatusPage] = useState("")
    const [page, setPage] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate()
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
        if (staffInfo) {
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
        } else {
            navigate(`/staff-login`);
        }
    }, [statusPage]);
    const [messRes, setMessRes] = useState()
    const handleIdBooking = (id, ScheduleId, CustomerId, CustomerName, price) => {
        getAcceptBooking(schedule, id, CustomerId, CustomerName, ScheduleId, price).then((response) => {

            if (response.message.errorCode === 0) {
                toast.success("Success", options)
                setStatusPage(Date.now())
            } else {
                toast.error("Fail", options)

            }


        })

    }
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
    const fetchNextPageService = async () => {
        getAllBookingOfPT(staffInfo["AccountStaff.id"], page)
            .then((response) => {
                const data = response.bookingOfPT.rows;
                if (data && data.length > 0) {
                    console.log(response);
                    setBookingOfPt((prev) => {
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
                <div className="listStaffBookingContent ">
                    <InfiniteScroll
                        dataLength={8}
                        style={{ display: "flex", flexDirection: "column", gap: "20px", overflow: "hidden" }}
                        loader={
                            <div className={"loading"}>
                                <StaggerAnimation />
                            </div>
                        }

                        hasMore={hasMore}
                        next={fetchNextPageService}
                    >
                        {bookingOfPt?.map((item, index) => {

                            return (
                                <List data={item} accept={handleIdBooking} cancel={handleCancelBooking} />
                            )
                        })}

                    </InfiniteScroll>
                </div>
            )}<ToastContainer />
        </>
    );
};
export default ListBooking;
