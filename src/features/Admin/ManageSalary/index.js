import React, { useState } from "react";
import classes from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
// import SearchPT from "./SearchPT/searchPT";
import { Gear, Plus, SquaresFour } from "phosphor-react";
import { Action, Fab } from "react-tiny-fab";
import { isVisible } from "@testing-library/user-event/dist/utils";
// import CreateAccount from "./ModalService/modalAddService";
// import ListStaff from "./ListStaff/listStaff";
import { PageHeader, Input } from "antd";
import { useNavigate } from "react-router-dom";
import CreateService from "./ModalService/modalAddService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ListDiscount from "./ListDiscount/listDiscount";
import ListSalary from "./ListDiscount/listDiscount";
const { Search } = Input;
const Salary = () => {
  const navigate = useNavigate();
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [status, setStatus] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const handleShowModalAdd = (isVisible) => {
    setShowModalAdd(isVisible);
  };
  const showModalAddAcc = () => {
    setShowModalAdd(true);
    // alert("aa");
  };
  const onChangeSearchServiceSystem = (e) => {
    setTimeout(() => {
      setSearchValue(e.target.value);
    }, 700);
  };
  const takeStatus = (value) => {
    setStatus(value);
  };
  const onSearchCus = (value) => {
    // console.log("check search value: ", value);
    setSearchValue(value);
  };
  return (
    <div className="PTProfileBg">
      <PageHeader
        className="site-page-header"
        onBack={() => navigate("/admin")}
        subTitle="Back to dashboard"
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
            placeholder="search service of center"
            // loading
            onChange={onChangeSearchServiceSystem}
            onSearch={onSearchCus}
            enterButton
          />
        }
      />
      <div className={classes.listItem}>
        <ListSalary status={status} searchValue={searchValue} />
      </div>
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
      <Fab
        mainButtonStyles={{ backgroundColor: "#1363DF" }}
        icon={<SquaresFour size={24} color="#Ffff" weight="fill" />}
        alwaysShowTitle={true}
      >
        <Action
          style={{ backgroundColor: "#1363DF" }}
          onClick={showModalAddAcc}
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
export default Salary;
