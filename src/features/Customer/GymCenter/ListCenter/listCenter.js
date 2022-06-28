import React, { useState, useEffect } from "react";
import "./listCenter.scss";
import { Empty } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import StaggerAnimation from "../../../../component/StaggerAnimation";
import { Link } from "react-router-dom";
import chinhanh from "../../../../assets/images/gym-place/chiNhanh1.jpg";
import { getAllGymCenter } from "../gymCenterAPI";

const ListCenter = () => {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [noService, setNoservice] = useState(false);
  const [allGymCenter, setAllGymCenter] = useState();
  const [noGymCenter, setNoGymCenter] = useState(false);
  const [, setGymCenterLoading] = useState(true);
  useEffect(() => {
    getAllGymCenter(1)
      .then((res) => {
        const { data } = res;
        if (data.data.length > 0) {
          setAllGymCenter(data.data);
          setNoGymCenter(false);
        } else {
          setNoGymCenter(true);
        }
      })
      .catch(() => {
        setNoGymCenter(true);
      })
      .finally(() => {
        setGymCenterLoading(false);
      });
  }, []);
  const fetchNextPageCenter = async () => {
    getAllGymCenter(page)
      .then((res) => {
        const { data } = res.data;
        if (data && data.length > 0) {
          setAllGymCenter((prev) => {
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
  console.log("check data length: ", allGymCenter?.length);
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
            dataLength={getAllGymCenter?.length ? getAllGymCenter.length : 0}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            loader={
              <div className={"loading"}>
                <StaggerAnimation />
              </div>
            }
            hasMore={true}
            next={fetchNextPageCenter}
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
