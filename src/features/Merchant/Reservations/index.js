import StaggerAnimation from "../../../component/StaggerAnimation";
import React from "react";
import "./Reservation.scss";
import { NavLink } from "react-router-dom";
import ReservationItem from "./ReservationItem/ReservationItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { ArrowLeft } from "phosphor-react";
import FilterReservation from "./ReservationFilter/FilterReservation";

const Reservation = () => {
  return (
    <>
      <div className="reservationsBackground">
        <div className="container">
          <div className="backToDashboardContainer">
            <NavLink
              to={{
                pathname: "/system/dashboard",
                //state: { fromDashboard: true },
              }}
            >
              <div className="backToDashboard">
                <span className="icon-back">
                  <ArrowLeft size={24} color="#393937" weight="fill" />
                </span>
                <div className="textBackToDashboard">Back to dashboard</div>
              </div>
            </NavLink>
            <>
              {/* <SearchReservation takeSearchValue={takeSearchValue} /> */}
              search reservation
            </>
            <>
              <FilterReservation />
            </>
          </div>
          <div className="listItem" id="scrollableDiv">
            <ReservationItem />
            <ReservationItem />
            <ReservationItem />
            <ReservationItem />
            <ReservationItem />
            <ReservationItem />
          </div>
        </div>
      </div>
    </>
  );
};
export default Reservation;
