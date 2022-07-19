import {
  Phone,
  EnvelopeSimple,
  MapPinLine,
  Coin,
  Percent,
  CoinVertical,
} from "phosphor-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./customizeListPT.scss";

const AddressRenderer = (props) => {
  return (
    <>
      <div className="phoneContainer">
        <div className="phoneText">{props.data.Salary}</div>
        <CoinVertical color="#0a0700" weight="light" />
      </div>
    </>
  );
};
export default AddressRenderer;
