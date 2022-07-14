import React, { useState, useEffect } from "react";
import "./ListPT.scss";
import { Empty } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import StaggerAnimation from "../../../../component/StaggerAnimation";
import { Link } from "react-router-dom";
import kickboxing from "../../../../assets/images/service/phong-tap-mma-gym-tphcm.png";
import { getAllStaff } from "../PtAPI";
import PTDetail from "../../PTDetail";

import { getStaffByName } from "../PtAPI";
import HomeFooter from "../../../../pages/HomePage/HomeFooter";
const ListPT = (props) => {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);
  const [allStaff, setAllStaff] = useState();
  const [noStaff, setNoStaff] = useState(false);
  const [, setStaffLoading] = useState(true);


  useEffect(() => {

    if (props.searchValue != "") {
      getStaffByName(props.searchValue).then((response) => {

        if (response.staff.length > 0) {
          setAllStaff(response.staff);
          setNoStaff(false);
        } else {
          setNoStaff(true);
        }
      })
        .catch(() => {
          setNoStaff(true);
        })
        .finally(() => {
          setStaffLoading(false);
        });
    }
    else {
      getAllStaff("1").then((response) => {

        if (response.pts.rows.length > 0) {
          setAllStaff(response.pts.rows);
          setNoStaff(false);
        } else {
          setNoStaff(true);
        }
      })
        .catch(() => {
          setNoStaff(true);
        })
        .finally(() => {
          setStaffLoading(false);
        });
    }

  }, [props.searchValue]);
  console.log("useeffect serach", props.searchValue)
  const fetchNextPageService = async () => {
    getAllStaff(page)
      .then((response) => {
        const data = response.pts.rows;
        if (data && data.length > 0) {
          console.log(response);
          setAllStaff((prev) => {
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
      {noStaff ? (
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
        <div className="listPTContent">
          <InfiniteScroll className="scrollPT"
            dataLength={getAllStaff?.length ? getAllStaff.length : 0}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            loader={
              <div className={"loading"}>
                <StaggerAnimation />
              </div>
            }
            hasMore={hasMore}
            next={fetchNextPageService}
          >
            {allStaff?.map((item, index) => {

              return (
                <Link to={`/pt-detail/${item.id}`} className="PT">
                  <div className="ptInfo">
                    <div className="infoPt">
                      <img
                        className="StaffImg"
                        src={item.StaffImage}
                        style={{
                          borderRadius: "100px",
                          width: "110px",
                          height: "110px",
                          flex: "none",
                          order: 0,
                          flexGrow: 0,
                          marginTop: "10px"
                        }}
                      />
                      <p className={"textNamePT"}>{item.StaffName}</p>
                    </div>
                    <div className="detailInfoPT">
                      <p>Email: {item.StaffEmail}</p>
                      <span className="lineDetailInfoPT"></span>
                      <p>{(item.CenterId === 1) ? <p>Cơ sở Phạm Ngũ Lão</p> : <p>Cơ sở Lý Thường Kiệt</p>}</p>
                      <p>SĐT:{item.StaffPhoneNumber}</p>
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
export default ListPT;
