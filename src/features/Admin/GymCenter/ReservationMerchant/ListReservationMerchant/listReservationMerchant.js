import React, { useCallback, useEffect } from "react";
import "./listReservationMerchant.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import StaggerAnimation from "../../../../../component/StaggerAnimation";
import ReservationItemMerchant from "./ReservationItem/reservationItem";
import { getAllReservationOfCenter } from "../ReservationAPI";
import { message } from "antd";
import { useState } from "react";

const ListReservationMerchant = (props) => {
  const [dataRes, setDataRes] = useState();
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const CenterId = localStorage.getItem("CenterId");
  // console.log("check props: ", props.searchValue);
  useEffect(() => {
    try {
      getAllReservationOfCenter(CenterId, props.searchValue, 1)
        .then((res) => {
          // console.log("check res reservation: ", res);
          if (
            res &&
            res.bookingOfCenter &&
            res.bookingOfCenter.rows.length > 0
          ) {
            setDataRes(res.bookingOfCenter.rows);
          }
        })
        .catch((error) => message.error(error.response.message));
    } catch (error) {
      console.log(error);
    }
  }, [CenterId, props.searchValue]);
  const fetchNextPageBooking = useCallback(async () => {
    getAllReservationOfCenter(CenterId, props.searchValue, page)
      .then((response) => {
        const data = response.bookingOfCenter.rows;
        if (data && data.length > 0) {
          // console.log(response);
          setDataRes((prev) => {
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
  }, [props.searchValue, CenterId]);
  return (
    <div className="listItemReservation" id="scrollableDiv">
      <InfiniteScroll
        dataLength={8}
        loader={
          <div>
            <StaggerAnimation />
          </div>
        }
        hasMore={hasMore}
        next={fetchNextPageBooking}
        scrollableTarget="scrollableDiv"
      >
        {dataRes && dataRes.length > 0
          ? dataRes.map((item, index) => {
              return <ReservationItemMerchant data={item} index={index} />;
            })
          : "no data to show"}
      </InfiniteScroll>
    </div>
  );
};
export default ListReservationMerchant;
