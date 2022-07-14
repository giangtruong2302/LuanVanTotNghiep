import { PageHeader } from "antd";
import { Input } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListReservationMerchant from "./ListReservationMerchant/listReservationMerchant";
import { getAllReservationOfCenter } from "./ReservationAPI";
import classes from "./styles.module.scss";
const { Search } = Input;
const ReservationMerchant = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const onChangeSearch = (e) => {
    // console.log(e.target.value);
    setTimeout(() => {
      setSearchValue(e.target.value);
    }, 1000);
  };
  return (
    <>
      <div className="reservationCenterBg">
        <PageHeader
          className="site-page-header"
          onBack={() => navigate("/admin/manage-center")}
          subTitle="Back to dashboard center"
          style={{
            top: 0,
            position: "sticky",
            zIndex: "9",
            background:
              "linear-gradient(305.38deg, #fff -50.47%, #f2edf0 94.82%)",
            color: "#fff",
            fontWeight: "600",
          }}
          extra={
            <Search
              style={{ borderRadius: "8px !important" }}
              placeholder="search customer, staff, status of reservation of center"
              // loading
              onChange={(e) => onChangeSearch(e)}
              enterButton
            />
          }
        />
        <div className={classes.filterBooking}></div>
        <div className={classes.listReservationMerchant}>
          <ListReservationMerchant searchValue={searchValue} />
        </div>
      </div>
    </>
  );
};
export default ReservationMerchant;
