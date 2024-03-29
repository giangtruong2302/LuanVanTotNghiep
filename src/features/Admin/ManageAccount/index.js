import React, { useState } from "react";
import classes from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
// import SearchPT from "./SearchPT/searchPT";
import { Gear, Plus, SquaresFour } from "phosphor-react";
import { Action, Fab } from "react-tiny-fab";
import { isVisible } from "@testing-library/user-event/dist/utils";
import CreateAccount from "./ModalAccount/modalAddAccount";
// import ListStaff from "./ListStaff/listStaff";
import { PageHeader, Input } from "antd";
import { useNavigate } from "react-router-dom";
import ListAccount from "./ListAccount/listAccount";
const { Search } = Input;
const Account = () => {
  const navigate = useNavigate();
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [status, setStatus] = useState("");
  const handleShowModalAdd = (isVisible) => {
    setShowModalAdd(isVisible);
  };
  const showModalAddAcc = () => {
    setShowModalAdd(true);
    // alert("aa");
  };
  const takeStatus = (value) => {
    setStatus(value);
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
            loading
            enterButton
          />
        }
      />
      <div className={classes.listItem}>
        <ListAccount status={status} />
      </div>
      <Fab
        mainButtonStyles={{ backgroundColor: "#A9A9A9" }}
        icon={<SquaresFour size={24} color="#Ffff" weight="fill" />}
        alwaysShowTitle={true}
      >
        <Action
          style={{ backgroundColor: "#A9A9A9" }}
          onClick={showModalAddAcc}
        >
          <Plus size={20} color="#Ffff" weight="fill" />
        </Action>
      </Fab>
      {showModalAdd && (
        <CreateAccount
          showModal={showModalAdd}
          handleModal={handleShowModalAdd}
          takeStatus={takeStatus}
        />
      )}
    </div>
  );
};
export default Account;
