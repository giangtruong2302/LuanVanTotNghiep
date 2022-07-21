import React, { useState, useEffect } from "react";
import "./listCenter.scss";
import { Empty } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import StaggerAnimation from "../../../../component/StaggerAnimation";
import { Link } from "react-router-dom";
import chinhanh from "../../../../assets/images/gym-place/chiNhanh1.jpg";
import { getAllGymCenter } from "../gymCenterAPI";
import { getCenterByName } from "../gymCenterAPI";
import HomeFooter from "../../../../pages/HomePage/HomeFooter";
const ListCenter = (props) => {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);
  const [allGymCenter, setAllGymCenter] = useState();
  const [noGymCenter, setNoGymCenter] = useState(false);
  const [, setGymCenterLoading] = useState(true);

  useEffect(() => {
    if (props.searchValue != "") {
      getCenterByName(props.searchValue).then((response) => {

        if (response.center.length > 0) {
          setAllGymCenter(response.center);
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
    }
    else {
      getAllGymCenter(1).then((response) => {

        if (response.centers.rows.length > 0) {
          setAllGymCenter(response.centers.rows);
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
    }
  }, [props.searchValue]);

  console.log("data check", allGymCenter?.length)
  const fetchNextPageCenter = async () => {
    getAllGymCenter(page)
      .then((response) => {
        const { data } = response.centers.rows;
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
  return (
    <>
      {noGymCenter ? (
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
        <div className="listCenterContent">
          <InfiniteScroll className="scroll"
            dataLength={getAllGymCenter?.length ? getAllGymCenter.length : 0}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            loader={
              <div className={"loading"}>
                <StaggerAnimation />
              </div>
            }
            hasMore={hasMore}
            next={fetchNextPageCenter}
          >
            {allGymCenter?.map((item, index) => {
              return (
                <div>
                  <Link to={`/center-detail/${item.id}`} className="Center">
                    <div className="centerInfo">
                      <div className="infoCen">
                        <img
                          className="centerImg"
                          src={item.CenterImage}
                          style={{
                            borderRadius: "6px",
                            width: "220px",
                            height: "130px",
                            flex: "none",
                            order: 0,
                            flexGrow: 0,
                          }}
                        />
                        <p className={"textNameCenter"}>{item.CenterName}</p>
                      </div>
                      <div className="detailInfoCenter">
                        <div className="addressCenter">{item.CenterAddress}</div>
                        <span className="lineDetailInfoCenter"></span>

                      </div>
                    </div>
                  </Link>

                </div>
              );
            })}

          </InfiniteScroll>

        </div>
      )}
    </>
  );
};
export default ListCenter;
