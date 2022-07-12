import React from "react";
import classes from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import { ArrowLeft, Plus, SquaresFour } from "phosphor-react";
// import SearchPT from "./SearchPT/searchPT";
// import ListStaff from "./ListStaff/listStaff";
import { PageHeader, Input } from "antd";
import { Action, Fab } from "react-tiny-fab";

import { useNavigate } from "react-router-dom";
import ListCustomer from "./ListCustomer/listCustomer";
import { useState } from "react";
import CreateCustomer from "./ModalManager/modalAddCustomer";
const { Search } = Input;
const Customers = () => {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const onSearchValue = (value) => {
    setSearchValue(value);
  };
  const takeStatus = (value) => {
    setStatus(value);
  };
  const handleShowModalAdd = (isVisible) => {
    setShowModalAdd(isVisible);
  };
  const onChangeSearchCustomer = (e) => {
    setTimeout(() => {
      setSearchValue(e.target.value);
    });
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
            onChange={onChangeSearchCustomer}
            onSearch={onSearchValue}
          />
        }
      />
      <div className={classes.listItem}>
        <ListCustomer searchValue={searchValue} status={status} />
      </div>
      <Fab
        mainButtonStyles={{ backgroundColor: "#1363DF" }}
        icon={<SquaresFour size={24} color="#Ffff" weight="fill" />}
        alwaysShowTitle={true}
      >
        <Action
          style={{ backgroundColor: "#1363DF" }}
          onClick={() => setShowModalAdd(true)}
        >
          <Plus size={20} color="#Ffff" weight="fill" />
        </Action>
      </Fab>
      {showModalAdd && (
        <CreateCustomer
          showModal={showModalAdd}
          handleModal={handleShowModalAdd}
          takeStatus={takeStatus}
        />
      )}
    </div>
  );
};
export default Customers;
