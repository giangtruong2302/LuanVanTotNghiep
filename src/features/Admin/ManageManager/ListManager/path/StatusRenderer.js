import { Activity, Buildings } from "phosphor-react";
import React from "react";
import "./customizeListPT.scss";

const StatusRenderer = (props) => {
  return (
    <>
      <div className="phoneContainer">
        <div className="phoneText">
          {props.data && props.data.CenterId === 1 && "Pham Ngu Lao"}
          {props.data && props.data.CenterId === 0 && "Quan ly He Thong"}
          {props.data && props.data.CenterId === 2 && "Ly Thuong Kiet"}
        </div>
        <Buildings color="#0a0700" weight="light" />
      </div>
    </>
  );
};
export default StatusRenderer;
