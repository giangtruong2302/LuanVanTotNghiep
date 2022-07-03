import React, { useState, useEffect } from "react";
import classes from "./styles.module.scss";
import { Empty } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import StaggerAnimation from "../../../../component/StaggerAnimation";
import { Link } from "react-router-dom";
import kickboxing from "../../../../assets/images/service/phong-tap-mma-gym-tphcm.png";
import { getAllService } from "../ServiceAPI";

const ListService = () => {


  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);
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
  const fetchNextPageService = async () => {
    getAllService(page)
      .then((response) => {
        const data = response.services.rows;
        if (data && data.length > 0) {
          console.log(response)
          setAllService((prev) => {
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
        <div className={classes.listServiceContent}>
          <InfiniteScroll
            dataLength={allService?.length ? allService.length : 0}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            loader={
              <div className={"loading"}>
                <StaggerAnimation />
              </div>
            }
            hasMore={hasMore}
            next={fetchNextPageService}
          >
            {allService?.map((item, index) => {

              return (
                <Link to={`/service-detail/${item.id}`} className={classes.service}>
                  <div className={classes.breadcumService}>
                    <div className={classes.categoryService}>{item.id}</div>
                  </div>
                  <div className={classes.lineService}></div>
                  <div className={classes.serviceInfo}>
                    <div className={classes.info}>
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
                      <p className={classes.textNameService}>{item.ServiceName}</p>
                    </div>
                    <div className={classes.detailInfo}>
                      <p>{item.Price}</p>
                      <span className={classes.lineDetailInfo}></span>
                      <p>{item.WorkDuration}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </InfiniteScroll>
        </div>
      )}
    </>
  );
};
export default ListService;
