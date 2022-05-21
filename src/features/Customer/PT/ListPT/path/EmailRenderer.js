import { Phone, EnvelopeSimple } from "phosphor-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./customizeListPT.scss";

const EmailRenderer = () => {
  return (
    <>
      <div className="phoneContainer">
        <div className="phoneText">giangtruong2302@gmail.com</div>
        <EnvelopeSimple color="#0a0700" weight="light" />
      </div>
    </>
  );
};
export default EmailRenderer;
