import React from "react";
import classes from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
// import SearchService from "./SearchService/SearchService";
import ListService from "./ListService";
import { Input, PageHeader } from "antd";
import { Gear, Plus, SquaresFour } from "phosphor-react";
import { Action, Fab } from "react-tiny-fab";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CreateService from "./ModalService/modalAddService";
const { Search } = Input;
const Services = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [status, setStatus] = useState("");
  const handleShowModalAdd = (isVisible) => {
    setShowModalAdd(isVisible);
  };
  const onSearchValue = (value) => {
    setSearchValue(value);
  };
  const onChangeSearchService = (e) => {
    setTimeout(() => {
      setSearchValue(e.target.value);
    }, 600);
  };
  const takeStatus = (value) => {
    setStatus(value);
  };
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
            // loading
            onSearch={onSearchValue}
            onChange={onChangeSearchService}
            enterButton
          />
        }
      />
      <div className={classes.listItem}>
        <ListService searchValue={searchValue} status={status} />
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
        <CreateService
          showModal={showModalAdd}
          handleModal={handleShowModalAdd}
          takeStatus={takeStatus}
        />
      )}
    </div>
  );
};
export default Services;
