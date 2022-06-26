import React, { useState } from "react";
import "./ListPT.scss";
import { Empty } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import StaggerAnimation from "../../../../component/StaggerAnimation";
import { Link } from "react-router-dom";
import kickboxing from "../../../../assets/images/service/phong-tap-mma-gym-tphcm.png";

const ListPT = () => {
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
        <div className="listPTContent container">
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
            <Link to="/pt-detail/1" className="PT">
              <div className="ptInfo">
                <div className="info">
                  <img
                    src={kickboxing}
                    style={{
                      borderRadius: "100px",
                      width: "80px",
                      height: "80px",
                      flex: "none",
                      order: 0,
                      flexGrow: 0,
                    }}
                  />
                  <p className={"textNamePT"}>Duong Giang</p>
                </div>
                <div className="detailInfo">
                  <p>môn võ tổng hợp-kick boxing</p>
                  <span className="lineDetailInfo"></span>
                  <p>6/month</p>
                </div>
              </div>
            </Link>
            <Link to="/pt-detail/:id" className="PT">
              <div className="ptInfo">
                <div className="info">
                  <img
                    src={kickboxing}
                    style={{
                      borderRadius: "100px",
                      width: "80px",
                      height: "80px",
                      flex: "none",
                      order: 0,
                      flexGrow: 0,
                    }}
                  />
                  <p className={"textNamePT"}>Duong Giang</p>
                </div>
                <div className="detailInfo">
                  <p>môn võ tổng hợp-kick boxing</p>
                  <span className="lineDetailInfo"></span>
                  <p>6/month</p>
                </div>
              </div>
            </Link>
            <Link to="/pt-detail/:id" className="PT">
              <div className="ptInfo">
                <div className="info">
                  <img
                    src={kickboxing}
                    style={{
                      borderRadius: "100px",
                      width: "80px",
                      height: "80px",
                      flex: "none",
                      order: 0,
                      flexGrow: 0,
                    }}
                  />
                  <p className={"textNamePT"}>Duong Giang</p>
                </div>
                <div className="detailInfo">
                  <p>môn võ tổng hợp-kick boxing</p>
                  <span className="lineDetailInfo"></span>
                  <p>6/month</p>
                </div>
              </div>
            </Link>
            <Link to="/pt-detail/:id" className="PT">
              <div className="ptInfo">
                <div className="info">
                  <img
                    src={kickboxing}
                    style={{
                      borderRadius: "100px",
                      width: "80px",
                      height: "80px",
                      flex: "none",
                      order: 0,
                      flexGrow: 0,
                    }}
                  />
                  <p className={"textNamePT"}>Duong Giang</p>
                </div>
                <div className="detailInfo">
                  <p>môn võ tổng hợp-kick boxing</p>
                  <span className="lineDetailInfo"></span>
                  <p>6/month</p>
                </div>
              </div>
            </Link>
            <Link to="/pt-detail/:id" className="PT">
              <div className="ptInfo">
                <div className="info">
                  <img
                    src={kickboxing}
                    style={{
                      borderRadius: "100px",
                      width: "80px",
                      height: "80px",
                      flex: "none",
                      order: 0,
                      flexGrow: 0,
                    }}
                  />
                  <p className={"textNamePT"}>Duong Giang</p>
                </div>
                <div className="detailInfo">
                  <p>môn võ tổng hợp-kick boxing</p>
                  <span className="lineDetailInfo"></span>
                  <p>6/month</p>
                </div>
              </div>
            </Link>
            <Link to="/pt-detail/:id" className="PT">
              <div className="ptInfo">
                <div className="info">
                  <img
                    src={kickboxing}
                    style={{
                      borderRadius: "100px",
                      width: "80px",
                      height: "80px",
                      flex: "none",
                      order: 0,
                      flexGrow: 0,
                    }}
                  />
                  <p className={"textNamePT"}>Duong Giang</p>
                </div>
                <div className="detailInfo">
                  <p>môn võ tổng hợp-kick boxing</p>
                  <span className="lineDetailInfo"></span>
                  <p>6/month</p>
                </div>
              </div>
            </Link>
            <Link to="/pt-detail/:id" className="PT">
              <div className="ptInfo">
                <div className="info">
                  <img
                    src={kickboxing}
                    style={{
                      borderRadius: "100px",
                      width: "80px",
                      height: "80px",
                      flex: "none",
                      order: 0,
                      flexGrow: 0,
                    }}
                  />
                  <p className={"textNamePT"}>Duong Giang</p>
                </div>
                <div className="detailInfo">
                  <p>môn võ tổng hợp-kick boxing</p>
                  <span className="lineDetailInfo"></span>
                  <p>6/month</p>
                </div>
              </div>
            </Link>
            <Link to="/pt-detail/:id" className="PT">
              <div className="ptInfo">
                <div className="info">
                  <img
                    src={kickboxing}
                    style={{
                      borderRadius: "100px",
                      width: "80px",
                      height: "80px",
                      flex: "none",
                      order: 0,
                      flexGrow: 0,
                    }}
                  />
                  <p className={"textNamePT"}>Duong Giang</p>
                </div>
                <div className="detailInfo">
                  <p>môn võ tổng hợp-kick boxing</p>
                  <span className="lineDetailInfo"></span>
                  <p>6/month</p>
                </div>
              </div>
            </Link>
            <Link to="/pt-detail/:id" className="PT">
              <div className="ptInfo">
                <div className="info">
                  <img
                    src={kickboxing}
                    style={{
                      borderRadius: "100px",
                      width: "80px",
                      height: "80px",
                      flex: "none",
                      order: 0,
                      flexGrow: 0,
                    }}
                  />
                  <p className={"textNamePT"}>Duong Giang</p>
                </div>
                <div className="detailInfo">
                  <p>môn võ tổng hợp-kick boxing</p>
                  <span className="lineDetailInfo"></span>
                  <p>6/month</p>
                </div>
              </div>
            </Link>
            <Link to="/pt-detail/:id" className="PT">
              <div className="ptInfo">
                <div className="info">
                  <img
                    src={kickboxing}
                    style={{
                      borderRadius: "100px",
                      width: "80px",
                      height: "80px",
                      flex: "none",
                      order: 0,
                      flexGrow: 0,
                    }}
                  />
                  <p className={"textNamePT"}>Duong Giang</p>
                </div>
                <div className="detailInfo">
                  <p>môn võ tổng hợp-kick boxing</p>
                  <span className="lineDetailInfo"></span>
                  <p>6/month</p>
                </div>
              </div>
            </Link>
            <Link to="/pt-detail/:id" className="PT">
              <div className="ptInfo">
                <div className="info">
                  <img
                    src={kickboxing}
                    style={{
                      borderRadius: "100px",
                      width: "80px",
                      height: "80px",
                      flex: "none",
                      order: 0,
                      flexGrow: 0,
                    }}
                  />
                  <p className={"textNamePT"}>Duong Giang</p>
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
export default ListPT;
