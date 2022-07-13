import React from "react";
import "./PT.scss";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import SearchPT from "./SearchPT/searchPT";
import ListPT from "./ListPT/ListPT";
import HomeFooter from "../../../pages/HomePage/HomeFooter";
import "../../../pages/HomePage/HomePage.scss"

const PersonalTraining = () => {
  return (
    <div className="PTProfileBg">
      <div className="containerListPT">
        <div className="backToHome">
          <NavLink to="/" className="backtoHome">
            <ArrowLeft size={24} color="#ffffff" weight="duotone" />
            <div className="textBackToHome">Back to home</div>
          </NavLink>
          <div>
            <SearchPT />
          </div>
        </div>


      </div>
    </div>
  );
};
export default PersonalTraining;
