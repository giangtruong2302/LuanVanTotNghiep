import React, { useEffect } from "react";
import "./listReservationMerchant.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import StaggerAnimation from "../../../../../component/StaggerAnimation";
import ReservationItemMerchant from "./ReservationItem/reservationItem";
import { getAllReservationOfCenter } from "../ReservationAPI";
import { message } from "antd";
import { useState } from "react";

const ListReservationMerchant = (props) => {
  const [dataRes, setDataRes] = useState();
  const CenterId = localStorage.getItem("CenterId");
  console.log("check props: ", props.searchValue);
  useEffect(() => {
    try {
      getAllReservationOfCenter(CenterId, props.searchValue, 1)
        .then((res) => {
          console.log("check res reservation: ", res);
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
  return (
    <div className="listItemReservation">
      <InfiniteScroll
        dataLength={8}
        next={() => console.log("object")}
        loader={
          <div>
            <StaggerAnimation />
          </div>
        }
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
