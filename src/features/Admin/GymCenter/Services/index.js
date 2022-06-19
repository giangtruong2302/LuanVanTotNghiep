import React from "react";
import classes from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
// import SearchService from "./SearchService/SearchService";
import ListService from "./ListService";
import { Input, PageHeader } from "antd";
import { useNavigate } from "react-router-dom";
const { Search } = Input;
const Services = () => {
  const navigate = useNavigate();
  return (
    <div className="ServiceProfileBg">
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
            placeholder="search reservation of center"
            loading
            enterButton
          />
        }
      />
      <div className={classes.listItem}>
        <ListService />
      </div>
    </div>
  );
};
export default Services;
