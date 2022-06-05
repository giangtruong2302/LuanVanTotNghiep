import React from "react";
import "./center.scss";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import ListCenter from "./ListCenter/listCenter";

const GymCenter = () => {
  return (
    <div className="CenterProfileBg">
      <div className="containerCenterList">
        <div className="backToHome">
          <NavLink to="/" className="backToHomeLink">
            <ArrowLeft size={24} color="#292829" weight="duotone" />
            <div className="textBackToHome">Back to home</div>
          </NavLink>
        </div>
        <div className="listItem">
          <ListCenter />
        </div>
      </div>
    </div>
  );
};
export default GymCenter;
