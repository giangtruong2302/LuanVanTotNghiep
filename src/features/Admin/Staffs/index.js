import React from "react";
import ListPT from "./ListStaff/ListPT";
import "./staff.scss";

const Staffs = () => {
  return (
    <>
      <div className="staffsBg">
        <div className="titleStaffs">All Staffs</div>
        <div className="staffsContainer">
          <ListPT />
        </div>
      </div>
    </>
  );
};
export default Staffs;
