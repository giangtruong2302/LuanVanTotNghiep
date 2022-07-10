import { Activity, Coin } from "phosphor-react";
import React from "react";
import "./customizeListPT.scss";

const StatusRenderer = (props) => {
  return (
    <>
      <div className="phoneContainer">
        <div className="phoneText">{props.data.amount}</div>
        <Coin color="#0a0700" weight="light" />
      </div>
    </>
  );
};
export default StatusRenderer;
