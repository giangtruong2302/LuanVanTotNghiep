import React, { useState } from "react";
import "./listCenter.scss";
import { Empty } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import StaggerAnimation from "../../../../component/StaggerAnimation";
import { Link } from "react-router-dom";
import chinhanh from "../../../../assets/images/gym-place/chiNhanh1.jpg";

const ListCenter = () => {
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
            <Link to="/center-detail/:id" className="Center">
              <div className="centerInfo">
                <div className="info">
                  <img
                    src={chinhanh}
                    style={{
                      borderRadius: "6px",
                      width: "80px",
                      height: "80px",
                      flex: "none",
                      order: 0,
                      flexGrow: 0,
                    }}
                  />
                  <p className={"textNameCenter"}>City Gym</p>
                </div>
                <div className="detailInfo">
                  <p>môn võ tổng hợp-kick boxing</p>
                  <span className="lineDetailInfo"></span>
                  <p>6/month</p>
                </div>
              </div>
            </Link>
            <Link to="/center-detail/:id" className="Center">
              <div className="centerInfo">
                <div className="info">
                  <img
                    src={chinhanh}
                    style={{
                      borderRadius: "6px",
                      width: "80px",
                      height: "80px",
                      flex: "none",
                      order: 0,
                      flexGrow: 0,
                    }}
                  />
                  <p className={"textNameCenter"}>City Gym</p>
                </div>
                <div className="detailInfo">
                  <p>môn võ tổng hợp-kick boxing</p>
                  <span className="lineDetailInfo"></span>
                  <p>6/month</p>
                </div>
              </div>
            </Link>
            <Link to="/center-detail/:id" className="Center">
              <div className="centerInfo">
                <div className="info">
                  <img
                    src={chinhanh}
                    style={{
                      borderRadius: "6px",
                      width: "80px",
                      height: "80px",
                      flex: "none",
                      order: 0,
                      flexGrow: 0,
                    }}
                  />
                  <p className={"textNameCenter"}>City Gym</p>
                </div>
                <div className="detailInfo">
                  <p>môn võ tổng hợp-kick boxing</p>
                  <span className="lineDetailInfo"></span>
                  <p>6/month</p>
                </div>
              </div>
            </Link>
            <Link to="/center-detail/:id" className="Center">
              <div className="centerInfo">
                <div className="info">
                  <img
                    src={chinhanh}
                    style={{
                      borderRadius: "6px",
                      width: "80px",
                      height: "80px",
                      flex: "none",
                      order: 0,
                      flexGrow: 0,
                    }}
                  />
                  <p className={"textNameCenter"}>City Gym</p>
                </div>
                <div className="detailInfo">
                  <p>môn võ tổng hợp-kick boxing</p>
                  <span className="lineDetailInfo"></span>
                  <p>6/month</p>
                </div>
              </div>
            </Link>
          </InfiniteScroll>
        </div>
      )}
    </>
  );
};
export default ListCenter;
