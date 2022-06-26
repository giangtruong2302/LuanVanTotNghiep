import React, { useState } from "react";
import "./listBooking.scss";
import { Empty } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import StaggerAnimation from "../../../component/StaggerAnimation";
import { Link } from "react-router-dom";
import chinhanh from "../../../assets/images/gym-place/chiNhanh1.jpg";

const ListBooking = () => {
    const [noService, setNoservice] = useState(false);

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
                <div className="listCenterContent container">
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
                        <div className="Center">
                            <div className="centerInfo">
                                <div className="info">

                                    <p className={"infoCus"}>Khách hàng : Dương Trường Giang</p>
                                    <p className={"infoCus"}>Tuổi : 22</p>
                                    <p className={"infoCus"}>Phái : Nam</p>

                                </div>
                                <div className="infoService">
                                    <p className={"textNameCenter"}>Dịch vụ đăng ký : KichBoxing</p>
                                    <p className={"textNameCenter"}>Gói dịch vụ : 3 tháng</p>
                                    <p className={"textNameCenter"}>Thời gian : 15h30 - 17h30</p>
                                </div>
                                <div className="detailInfo">
                                    <button className="buttonAccept">Xác nhận</button>
                                    <span className="lineDetailInfo"></span>
                                    <button className="buttonDeniend">Từ chối</button>
                                </div>
                            </div>
                        </div>
                        <div className="Center">
                            <div className="centerInfo">
                                <div className="info">

                                    <p className={"infoCus"}>Khách hàng : Dương Trường Giang</p>
                                    <p className={"infoCus"}>Tuổi : 22</p>
                                    <p className={"infoCus"}>Phái : Nam</p>

                                </div>
                                <div className="infoService">
                                    <p className={"textNameCenter"}>Dịch vụ đăng ký : KichBoxing</p>
                                    <p className={"textNameCenter"}>Gói dịch vụ : 3 tháng</p>
                                    <p className={"textNameCenter"}>Thời gian : 15h30 - 17h30</p>
                                </div>
                                <div className="detailInfo">
                                    <button className="buttonAccept">Xác nhận</button>
                                    <span className="lineDetailInfo"></span>
                                    <button className="buttonDeniend">Từ chối</button>
                                </div>
                            </div>
                        </div>
                        <div className="Center">
                            <div className="centerInfo">
                                <div className="info">

                                    <p className={"infoCus"}>Khách hàng : Dương Trường Giang</p>
                                    <p className={"infoCus"}>Tuổi : 22</p>
                                    <p className={"infoCus"}>Phái : Nam</p>

                                </div>
                                <div className="infoService">
                                    <p className={"textNameCenter"}>Dịch vụ đăng ký : KichBoxing</p>
                                    <p className={"textNameCenter"}>Gói dịch vụ : 3 tháng</p>
                                    <p className={"textNameCenter"}>Thời gian : 15h30 - 17h30</p>
                                </div>
                                <div className="detailInfo">
                                    <button className="buttonAccept">Xác nhận</button>
                                    <span className="lineDetailInfo"></span>
                                    <button className="buttonDeniend">Từ chối</button>
                                </div>
                            </div>
                        </div>
                        <div className="Center">
                            <div className="centerInfo">
                                <div className="info">

                                    <p className={"infoCus"}>Khách hàng : Dương Trường Giang</p>
                                    <p className={"infoCus"}>Tuổi : 22</p>
                                    <p className={"infoCus"}>Phái : Nam</p>

                                </div>
                                <div className="infoService">
                                    <p className={"textNameCenter"}>Dịch vụ đăng ký : KichBoxing</p>
                                    <p className={"textNameCenter"}>Gói dịch vụ : 3 tháng</p>
                                    <p className={"textNameCenter"}>Thời gian : 15h30 - 17h30</p>
                                </div>
                                <div className="detailInfo">
                                    <button className="buttonAccept">Xác nhận</button>
                                    <span className="lineDetailInfo"></span>
                                    <button className="buttonDeniend">Từ chối</button>
                                </div>
                            </div>
                        </div>
                        <div className="Center">
                            <div className="centerInfo">
                                <div className="info">

                                    <p className={"infoCus"}>Khách hàng : Dương Trường Giang</p>
                                    <p className={"infoCus"}>Tuổi : 22</p>
                                    <p className={"infoCus"}>Phái : Nam</p>

                                </div>
                                <div className="infoService">
                                    <p className={"textNameCenter"}>Dịch vụ đăng ký : KichBoxing</p>
                                    <p className={"textNameCenter"}>Gói dịch vụ : 3 tháng</p>
                                    <p className={"textNameCenter"}>Thời gian : 15h30 - 17h30</p>
                                </div>
                                <div className="detailInfo">
                                    <button className="buttonAccept">Xác nhận</button>
                                    <span className="lineDetailInfo"></span>
                                    <button className="buttonDeniend">Từ chối</button>
                                </div>
                            </div>
                        </div>
                    </InfiniteScroll>
                </div>
            )}
        </>
    );
};
export default ListBooking;
