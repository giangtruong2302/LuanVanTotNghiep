import React, { useState, useEffect } from "react";
import "./ListService.scss";
import { Empty } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import StaggerAnimation from "../../../../component/StaggerAnimation";
import { Link } from "react-router-dom";
import kickboxing from "../../../../assets/images/service/phong-tap-mma-gym-tphcm.png";
import { getAllService } from "../ServiceAPI";

const ListService = () => {

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [allService, setAllService] = useState();
  const [noService, setNoService] = useState(false);
  const [, setServiceLoading] = useState(true);

  useEffect(() => {

    getAllService("1").then((response) => {

      if (response.services.rows.length > 0) {
        setAllService(response.services.rows);
        setNoService(false);
      } else {
        setNoService(true);
      }
    })
      .catch(() => {
        setNoService(true);
      })
      .finally(() => {
        setServiceLoading(false);
      });
  }, []);
  console.log("data check", allService?.length)
  const fetchNextPageService = async () => {
    getAllService(page)
      .then((response) => {
        if (response.services.rows && response.services.rows.length > 0) {
          setAllService((prev) => {
            if (prev !== undefined) return [...prev, ...response.services.rows];
          });
          if (response.services.rows.length === 0 || response.services.rows.length < 10) {
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
        <div className="listServiceContent container">
          <InfiniteScroll
            dataLength={getAllService?.length ? getAllService.length : 0}
            style={{ gap: "20px", display: "flex", flexDirection: "column" }}
            loader={
              <div className={"loading"}>
                <StaggerAnimation />
              </div>
            }
            hasMore={true}
            next={fetchNextPageService}
          >
            {allService?.map((item, index) => {
              return (
                <div>

                  <Link to={`/service-detail/${item.ServiceId}`} className="service">
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
                        <p className={"textNameService"}>{item.ServiceName}</p>
                      </div>
                      <div className="detailInfo">
                        <p>{item.Price}</p>
                        <span className="lineDetailInfo"></span>
                        <p>{item.WorkDuration}</p>
                      </div>
                    </div>
                  </Link>

                </div>
              )
            })}
          </InfiniteScroll>
        </div>
      )}
    </>
  );
};
export default ListService;
