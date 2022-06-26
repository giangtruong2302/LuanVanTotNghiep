import { PageHeader } from "antd";
import { Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
const { Search } = Input;
const Reservation = () => {
  const navigate = useNavigate();
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
              placeholder="input search loading with enterButton"
              loading
              enterButton
            />
          }
        />
      </div>
    </>
  );
};
export default Reservation;
