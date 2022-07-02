import React from "react";
import classes from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
// import SearchPT from "./SearchPT/searchPT";
// import ListStaff from "./ListStaff/listStaff";
import { PageHeader, Input } from "antd";
import { useNavigate } from "react-router-dom";
import ListCustomer from "./ListCustomer/listCustomer";
import { useState } from "react";
const { Search } = Input;
const Customers = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const onSearchValue = (value) => {
    setSearchValue(value);
  };
  return (
    <div className="PTProfileBg">
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
            // loading
            enterButton
            onSearch={onSearchValue}
          />
        }
      />
      <div className={classes.listItem}>
        <ListCustomer searchValue={searchValue} />
      </div>
    </div>
  );
};
export default Customers;
