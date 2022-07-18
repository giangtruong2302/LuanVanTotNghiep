import React, { useState, useEffect, useCallback } from "react";
import classes from "./styles.module.scss";
import { Empty } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import StaggerAnimation from "../../../../component/StaggerAnimation";
import { Link } from "react-router-dom";
import kickboxing from "../../../../assets/images/service/phong-tap-mma-gym-tphcm.png";
import { getAllService } from "../ServiceAPI";
import HomeFooter from "../../../../pages/HomePage/HomeFooter";
const ListService = (props) => {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);
  const [allService, setAllService] = useState();
  const [noService, setNoService] = useState(false);
  const [, setServiceLoading] = useState(true);

  useEffect(() => {
    if (props.searchValue != "") {
      getAllService(props.searchValue, "1")
        .then((response) => {
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
    }
    else {
      getAllService("", "1")
        .then((response) => {
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
    }
  }, [props.searchValue]);
  console.log("useeffect serach", props.searchValue)




  console.log("search:", props.searchValue)
  const fetchNextPageService = async () => {
    getAllService(page)
      .then((response) => {
        const data = response.services.rows;
        if (data && data.length > 0) {
          console.log(response);
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
  const functionSearch = () => {

  }

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
                <Link
                  to={`/service-detail/${item.id}`}
                  className={classes.service}
                >

                  <div className={classes.lineService}></div>
                  <div className={classes.serviceInfo}>
                    <div className={classes.info}>
                      <p className={classes.textNameService}>
                        {item.ServiceName}
                      </p>
                      <img
                        className={classes.SerImg}
                        src={item.ServiceImage}
                        style={{

                          width: "300px",
                          height: "118px",
                          flex: "none",
                          order: 0,
                          flexGrow: 0,
                          marginLeft: "20px",
                          opacity: "0.6",
                          transform: "skew(-20deg)"
                        }}
                      />

                    </div>
                    <div className={classes.detailInfo}>
                      <p>{item.Price} VND /</p>
                      <span className={classes.lineDetailInfo}></span>
                      <p>{item.WorkDuration} Month</p>
                    </div>
                  </div>
                </Link>
              );
            })}

          </InfiniteScroll>
        </div>
      )}
    </>
  );
};
export default ListService;
