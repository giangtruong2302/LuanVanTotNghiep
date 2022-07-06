import React from "react";
import classes from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import { ArrowLeft, Plus, SquaresFour } from "phosphor-react";
// import SearchPT from "./SearchPT/searchPT";
import ListStaff from "./ListStaff/listStaff";
import { PageHeader, Input } from "antd";
import { Action, Fab } from "react-tiny-fab";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CreateManager from "./ModalManager/modalAddAccount";
const { Search } = Input;
const Staffs = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModalAdd] = useState(false);
  const handleShowModalAdd = (isVisible) => {
    setShowModalAdd(isVisible);
  };
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
            onSearch={onSearchValue}
            enterButton
          />
        }
      />
      <div className={classes.listItem}>
        <ListStaff searchValue={searchValue} />
      </div>
      {showModal && (
        <CreateManager handleModal={handleShowModalAdd} showModal={showModal} />
      )}
      <Fab
        mainButtonStyles={{ backgroundColor: "#A9A9A9" }}
        icon={<SquaresFour size={24} color="#Ffff" weight="fill" />}
        alwaysShowTitle={true}
      >
        <Action
          style={{ backgroundColor: "#A9A9A9" }}
          onClick={() => setShowModalAdd(true)}
        >
          <Plus size={20} color="#Ffff" weight="fill" />
        </Action>
      </Fab>
    </div>
  );
};
export default Staffs;
