import { Phone, EnvelopeSimple } from "phosphor-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./customizeListPT.scss";

const EmailRenderer = (props) => {
  return (
    <>
      <div className="phoneContainer">
        <div className="phoneText">{props.data.ManagerEmail}</div>
        <EnvelopeSimple color="#0a0700" weight="light" />
      </div>
    </>
  );
};
export default EmailRenderer;
