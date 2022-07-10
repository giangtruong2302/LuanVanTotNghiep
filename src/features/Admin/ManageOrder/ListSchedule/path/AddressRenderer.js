import {
  Phone,
  EnvelopeSimple,
  MapPinLine,
  Coin,
  CircleWavyCheck,
  Prohibit,
} from "phosphor-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./customizeListPT.scss";

const AddressRenderer = (props) => {
  return (
    <>
      {props.data.Status === 0 ? (
        <div className="statusContainer">
          <div className="statusText" style={{ color: "#FF0000" }}>
            UNPAID
          </div>
          <Prohibit color="#FF0000" weight="light" />
        </div>
      ) : (
        <div className="statusContainer">
          <div className="statusText" style={{ color: "#00FF00" }}>
            PAID
          </div>
          <CircleWavyCheck color="#00FF00" weight="light" />
        </div>
      )}
    </>
  );
};
export default AddressRenderer;
