import React from "react";
import "./booking.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import StaggerAnimation from "../../../component/StaggerAnimation";



const Booking = () => {

    return (

        <div className="BookingProfileBg">

            <div className="containerListPT">
                Lịch Booking
                <div className="titlePageBooking">
                    <div className="PTinfo">
                        <div className="listCenterContent container">
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
                                <div className="Center">
                                    <div className="centerInfo">
                                        <div className="info">

                                            <p className={"infoCus"}>Khách hàng : Dương Trường Giang</p>
                                            <p className={"infoCus"}>Ngày bắt đầu : 15-02-2022</p>
                                            <p className={"infoCus"}>Ngày kết thúc : 15-05-2022</p>

                                        </div>
                                        <div className="infoService">
                                            <p className={"textNameCenter"}>Dịch vụ đăng ký : KichBoxing</p>
                                            <p className={"textNameCenter"}>Gói dịch vụ : 3 tháng</p>
                                            <p className={"textNameCenter"}>Thời gian : 15h30 - 17h30</p>
                                        </div>

                                    </div>
                                </div>
                                <div className="Center">
                                    <div className="centerInfo">
                                        <div className="info">

                                            <p className={"infoCus"}>Khách hàng : Dương Trường Giang</p>
                                            <p className={"infoCus"}>Ngày bắt đầu : 15-02-2022</p>
                                            <p className={"infoCus"}>Ngày kết thúc : 15-05-2022</p>

                                        </div>
                                        <div className="infoService">
                                            <p className={"textNameCenter"}>Dịch vụ đăng ký : KichBoxing</p>
                                            <p className={"textNameCenter"}>Gói dịch vụ : 3 tháng</p>
                                            <p className={"textNameCenter"}>Thời gian : 15h30 - 17h30</p>
                                        </div>

                                    </div>
                                </div>
                                <div className="Center">
                                    <div className="centerInfo">
                                        <div className="info">

                                            <p className={"infoCus"}>Khách hàng : Dương Trường Giang</p>
                                            <p className={"infoCus"}>Ngày bắt đầu : 15-02-2022</p>
                                            <p className={"infoCus"}>Ngày kết thúc : 15-05-2022</p>

                                        </div>
                                        <div className="infoService">
                                            <p className={"textNameCenter"}>Dịch vụ đăng ký : KichBoxing</p>
                                            <p className={"textNameCenter"}>Gói dịch vụ : 3 tháng</p>
                                            <p className={"textNameCenter"}>Thời gian : 15h30 - 17h30</p>
                                        </div>

                                    </div>
                                </div>
                                <div className="Center">
                                    <div className="centerInfo">
                                        <div className="info">

                                            <p className={"infoCus"}>Khách hàng : Dương Trường Giang</p>
                                            <p className={"infoCus"}>Ngày bắt đầu : 15-02-2022</p>
                                            <p className={"infoCus"}>Ngày kết thúc : 15-05-2022</p>

                                        </div>
                                        <div className="infoService">
                                            <p className={"textNameCenter"}>Dịch vụ đăng ký : KichBoxing</p>
                                            <p className={"textNameCenter"}>Gói dịch vụ : 3 tháng</p>
                                            <p className={"textNameCenter"}>Thời gian : 15h30 - 17h30</p>
                                        </div>

                                    </div>
                                </div>
                                <div className="Center">
                                    <div className="centerInfo">
                                        <div className="info">

                                            <p className={"infoCus"}>Khách hàng : Dương Trường Giang</p>
                                            <p className={"infoCus"}>Ngày bắt đầu : 15-02-2022</p>
                                            <p className={"infoCus"}>Ngày kết thúc : 15-05-2022</p>

                                        </div>
                                        <div className="infoService">
                                            <p className={"textNameCenter"}>Dịch vụ đăng ký : KichBoxing</p>
                                            <p className={"textNameCenter"}>Gói dịch vụ : 3 tháng</p>
                                            <p className={"textNameCenter"}>Thời gian : 15h30 - 17h30</p>
                                        </div>

                                    </div>
                                </div>
                            </InfiniteScroll>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
export default Booking;