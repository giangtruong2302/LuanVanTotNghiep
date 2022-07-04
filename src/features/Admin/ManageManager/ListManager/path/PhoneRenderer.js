import { Phone } from "phosphor-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./customizeListPT.scss";

const PhoneRenderer = (props) => {
  return (
    <>
      <div className="phoneContainer">
        <div className="phoneText">{props.data.ManagerPhone}</div>
        <Phone color="#0a0700" weight="light" />
      </div>
    </>
  );
};
export default PhoneRenderer;
