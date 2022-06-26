import { Phone } from "phosphor-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./customizeListPT.scss";

const PhoneRenderer = () => {
  return (
    <>
      <div className="phoneContainer">
        <div className="phoneText">0337657262</div>
        <Phone color="#0a0700" weight="light" />
      </div>
    </>
  );
};
export default PhoneRenderer;
