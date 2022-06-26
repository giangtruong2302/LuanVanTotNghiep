import React, { useState } from "react";
import "./ListService.scss";
import { Empty } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import StaggerAnimation from "../../../../component/StaggerAnimation";
import { Link } from "react-router-dom";
import kickboxing from "../../../../assets/images/service/phong-tap-mma-gym-tphcm.png";

const ListService = () => {
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
        <div className="listServiceContent container">
          <InfiniteScroll
            dataLength={8}
            style={{ gap: "20px", display: "flex", flexDirection: "column" }}
            loader={
              <div className={"loading"}>
                <StaggerAnimation />
              </div>
            }
            hasMore={true}
          >
            <Link to="/service-detail/:id" className="service">
              <div className="breadcumService">
                <div className="categoryService">Category</div>
              </div>
              <div className="lineService"></div>
              <div className="serviceInfo">
                <div className="info">
                  <img
                    src={kickboxing}
                    style={{
                      borderRadius: "100px",
                      width: "30px",
                      height: "30px",
                      flex: "none",
                      order: 0,
                      flexGrow: 0,
                    }}
                  />
                  <p className={"textNameService"}>Kick Boxing</p>
                </div>
                <div className="detailInfo">
                  <p>môn võ tổng hợp-kick boxing</p>
                  <span className="lineDetailInfo"></span>
                  <p>6/month</p>
                </div>
              </div>
            </Link>
            <Link to="/service-detail/:id" className="service">
              <div className="breadcumService">
                <div className="categoryService">Category</div>
              </div>
              <div className="lineService"></div>
              <div className="serviceInfo">
                <div className="info">
                  <img
                    src={kickboxing}
                    style={{
                      borderRadius: "100px",
                      width: "30px",
                      height: "30px",
                      flex: "none",
                      order: 0,
                      flexGrow: 0,
                    }}
                  />
                  <p className={"textNameService"}>Kick Boxing</p>
                </div>
                <div className="detailInfo">
                  <p>môn võ tổng hợp-kick boxing</p>
                  <span className="lineDetailInfo"></span>
                  <p>6/month</p>
                </div>
              </div>
            </Link>
            <Link to="/service-detail/:id" className="service">
              <div className="breadcumService">
                <div className="categoryService">Category</div>
              </div>
              <div className="lineService"></div>
              <div className="serviceInfo">
                <div className="info">
                  <img
                    src={kickboxing}
                    style={{
                      borderRadius: "100px",
                      width: "30px",
                      height: "30px",
                      flex: "none",
                      order: 0,
                      flexGrow: 0,
                    }}
                  />
                  <p className={"textNameService"}>Kick Boxing</p>
                </div>
                <div className="detailInfo">
                  <p>môn võ tổng hợp-kick boxing</p>
                  <span className="lineDetailInfo"></span>
                  <p>6/month</p>
                </div>
              </div>
            </Link>
            <Link to="/service-detail/:id" className="service">
              <div className="breadcumService">
                <div className="categoryService">Category</div>
              </div>
              <div className="lineService"></div>
              <div className="serviceInfo">
                <div className="info">
                  <img
                    src={kickboxing}
                    style={{
                      borderRadius: "100px",
                      width: "30px",
                      height: "30px",
                      flex: "none",
                      order: 0,
                      flexGrow: 0,
                    }}
                  />
                  <p className={"textNameService"}>Kick Boxing</p>
                </div>
                <div className="detailInfo">
                  <p>môn võ tổng hợp-kick boxing</p>
                  <span className="lineDetailInfo"></span>
                  <p>6/month</p>
                </div>
              </div>
            </Link>
            <Link to="/service-detail/:id" className="service">
              <div className="breadcumService">
                <div className="categoryService">Category</div>
              </div>
              <div className="lineService"></div>
              <div className="serviceInfo">
                <div className="info">
                  <img
                    src={kickboxing}
                    style={{
                      borderRadius: "100px",
                      width: "30px",
                      height: "30px",
                      flex: "none",
                      order: 0,
                      flexGrow: 0,
                    }}
                  />
                  <p className={"textNameService"}>Kick Boxing</p>
                </div>
                <div className="detailInfo">
                  <p>môn võ tổng hợp-kick boxing</p>
                  <span className="lineDetailInfo"></span>
                  <p>6/month</p>
                </div>
              </div>
            </Link>
            <Link to="/service-detail/:id" className="service">
              <div className="breadcumService">
                <div className="categoryService">Category</div>
              </div>
              <div className="lineService"></div>
              <div className="serviceInfo">
                <div className="info">
                  <img
                    src={kickboxing}
                    style={{
                      borderRadius: "100px",
                      width: "30px",
                      height: "30px",
                      flex: "none",
                      order: 0,
                      flexGrow: 0,
                    }}
                  />
                  <p className={"textNameService"}>Kick Boxing</p>
                </div>
                <div className="detailInfo">
                  <p>môn võ tổng hợp-kick boxing</p>
                  <span className="lineDetailInfo"></span>
                  <p>6/month</p>
                </div>
              </div>
            </Link>
            <Link to="/service-detail/:id" className="service">
              <div className="breadcumService">
                <div className="categoryService">Category</div>
              </div>
              <div className="lineService"></div>
              <div className="serviceInfo">
                <div className="info">
                  <img
                    src={kickboxing}
                    style={{
                      borderRadius: "100px",
                      width: "30px",
                      height: "30px",
                      flex: "none",
                      order: 0,
                      flexGrow: 0,
                    }}
                  />
                  <p className={"textNameService"}>Kick Boxing</p>
                </div>
                <div className="detailInfo">
                  <p>môn võ tổng hợp-kick boxing</p>
                  <span className="lineDetailInfo"></span>
                  <p>6/month</p>
                </div>
              </div>
            </Link>
            <Link to="/service-detail/:id" className="service">
              <div className="breadcumService">
                <div className="categoryService">Category</div>
              </div>
              <div className="lineService"></div>
              <div className="serviceInfo">
                <div className="info">
                  <img
                    src={kickboxing}
                    style={{
                      borderRadius: "100px",
                      width: "30px",
                      height: "30px",
                      flex: "none",
                      order: 0,
                      flexGrow: 0,
                    }}
                  />
                  <p className={"textNameService"}>Kick Boxing</p>
                </div>
                <div className="detailInfo">
                  <p>môn võ tổng hợp-kick boxing</p>
                  <span className="lineDetailInfo"></span>
                  <p>6/month</p>
                </div>
              </div>
            </Link>
            <Link to="/service-detail/:id" className="service">
              <div className="breadcumService">
                <div className="categoryService">Category</div>
              </div>
              <div className="lineService"></div>
              <div className="serviceInfo">
                <div className="info">
                  <img
                    src={kickboxing}
                    style={{
                      borderRadius: "100px",
                      width: "30px",
                      height: "30px",
                      flex: "none",
                      order: 0,
                      flexGrow: 0,
                    }}
                  />
                  <p className={"textNameService"}>Kick Boxing</p>
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
export default ListService;
