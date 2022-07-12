import React from "react";
import classes from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import { ArrowLeft, Plus, SquaresFour } from "phosphor-react";
// import SearchPT from "./SearchPT/searchPT";
import ListStaff from "./ListStaff/listStaff";
import { PageHeader, Input } from "antd";
import { Action, Fab } from "react-tiny-fab";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
// import CreateManager from "./ModalManager/modalAddStaff";
import CreateStaff from "./ModalManager/modalAddStaff";
import { setNestedObjectValues } from "formik";
const { Search } = Input;
const Staffs = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModalAdd] = useState(false);
  const [status, setStatus] = useState("");
  const handleShowModalAdd = (isVisible) => {
    setShowModalAdd(isVisible);
  };
  const onSearchValue = (value) => {
    setSearchValue(value);
  };
  const takeStatus = (value) => {
    setStatus(value);
  };
  const onChangeSearchStaff = (e) => {
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
            onSearch={onSearchValue}
            onChange={onChangeSearchStaff}
            enterButton
          />
        }
      />
      <div className={classes.listItem}>
        <ListStaff searchValue={searchValue} status={status} />
      </div>
      {showModal && (
        <CreateStaff
          handleModal={handleShowModalAdd}
          showModal={showModal}
          takeStatus={takeStatus}
        />
      )}
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
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
export default Staffs;
