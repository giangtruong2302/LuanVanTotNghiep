import React from "react";
import classes from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

import { ArrowLeft } from "phosphor-react";
// import SearchPT from "./SearchPT/searchPT";
// import ListStaff from "./ListStaff/listStaff";
import { PageHeader, Input, Layout } from "antd";
import { useNavigate } from "react-router-dom";
// import ListCustomer from "./ListCustomer/listCustomer";
import { useState } from "react";
import SideBar from "./Sidebar/sidebar";
const { Search } = Input;
const { Header, Sider, Content } = Layout;

const GymConfig = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const onSearchValue = (value) => {
    setSearchValue(value);
  };
  return (
    <div className={classes.SalonConfigBackground}>
      <div className={classes.container}>
        <SideBar />
        <div className={classes.contentContainer}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default GymConfig;
