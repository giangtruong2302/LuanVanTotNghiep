import React from "react";
import "./listReservationMerchant.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import StaggerAnimation from "../../../../../component/StaggerAnimation";
import ReservationItemMerchant from "./ReservationItem/reservationItem";

const ListReservationMerchant = () => {
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
        <ReservationItemMerchant />
        <ReservationItemMerchant />
        <ReservationItemMerchant />
        <ReservationItemMerchant />
        <ReservationItemMerchant />
        <ReservationItemMerchant />
        <ReservationItemMerchant />
        <ReservationItemMerchant />
        <ReservationItemMerchant />
        <ReservationItemMerchant />
        <ReservationItemMerchant />
        <ReservationItemMerchant />
      </InfiniteScroll>
    </div>
  );
};
export default ListReservationMerchant;
