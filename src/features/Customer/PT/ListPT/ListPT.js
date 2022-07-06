import React, { useState, useEffect } from "react";
import "./ListPT.scss";
import { Empty } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import StaggerAnimation from "../../../../component/StaggerAnimation";
import { Link } from "react-router-dom";
import kickboxing from "../../../../assets/images/service/phong-tap-mma-gym-tphcm.png";
import { getAllStaff } from "../PtAPI";
import PTDetail from "../../PTDetail";

const ListPT = () => {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [allStaff, setAllStaff] = useState();
  const [noStaff, setNoStaff] = useState(false);
  const [, setStaffLoading] = useState(true);

  useEffect(() => {

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
  }, []);


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
          <InfiniteScroll
            dataLength={getAllStaff?.length ? getAllStaff.length : 0}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            loader={
              <div className={"loading"}>
                <StaggerAnimation />
              </div>
            }
            hasMore={hasMore}
            next={() => { console.log("aaaaaaa") }}
          >
            {allStaff?.map((item, index) => {

              return (
                <Link to={`/pt-detail/${item.id}`} className="PT">
                  <div className="ptInfo">
                    <div className="infoPt">
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
