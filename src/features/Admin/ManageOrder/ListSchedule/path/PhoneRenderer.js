import { Phone } from "phosphor-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./customizeListPT.scss";

const PhoneRenderer = (props) => {
  return (
    <>
      <div className="phoneContainer">
        <div className="phoneText">{props.data.createdAt}</div>
      </div>
    </>
  );
};
export default PhoneRenderer;
