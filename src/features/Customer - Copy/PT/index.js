import React from "react";
import "./PT.scss";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import SearchPT from "./SearchPT/searchPT";
import ListPT from "./ListPT/ListPT";

const PersonalTraining = () => {
  return (
    <div className="PTProfileBg">
      <div className="containerListPT">
        <div className="backToHome">
          <NavLink to="/" className="backtoHome">
            <ArrowLeft size={24} color="#292829" weight="duotone" />
            <div className="textBackToHome">Back to home</div>
          </NavLink>
          <div>
            <SearchPT />
          </div>
        </div>
        <div className="listItem">
          <ListPT />
        </div>
      </div>
    </div>
  );
};
export default PersonalTraining;
