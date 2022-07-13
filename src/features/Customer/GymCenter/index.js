import React from "react";
import "./center.scss";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import ListCenter from "./ListCenter/listCenter";
import HomeFooter from "../../../pages/HomePage/HomeFooter";
import "../../../pages/HomePage/HomePage.scss"
import SearchCenter from "./SearchCenter/SearchCenter";
const GymCenter = () => {
  return (
    <div className="CenterProfileBg">
      <div className="containerCenterList">
        <div className="backToHome">
          <NavLink to="/" className="backToHomeLink">
            <ArrowLeft size={24} color="#ffffff" weight="duotone" />
            <div className="textBackToHome">Back to home</div>
          </NavLink>
        </div>
        <div className="listItem">
          <SearchCenter />
        </div>

      </div>
    </div>
  );
};
export default GymCenter;
