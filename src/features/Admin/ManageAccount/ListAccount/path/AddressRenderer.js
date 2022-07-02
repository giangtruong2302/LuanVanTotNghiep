import { Phone, EnvelopeSimple, MapPinLine } from "phosphor-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./customizeListPT.scss";

const AddressRenderer = (props) => {
  return (
    <>
      <div className="phoneContainer">
        <div className="phoneText">
          {props.data.roleId === 1 && "Admin"}
          {props.data.roleId === 2 && "Manage of Center"}
          {props.data.roleId === 3 && "PT"}
          {props.data.roleId === 4 && "Lễ tân"}
          {props.data.roleId === 5 && "Customer"}
        </div>
        <MapPinLine color="#0a0700" weight="light" />
      </div>
    </>
  );
};
export default AddressRenderer;
