import React from "react";
import "./ServiceGym.scss";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import SearchService from "./SearchService/SearchService";
import ListService from "./ListService/ListService";

const ServiceGym = () => {
  return (
    <div className="ServiceProfileBg">
      <div className="containerServiceList">
        <div className="backToHome">
          <NavLink to="/" className="backToHomeLink">
            <ArrowLeft size={24} color="#292829" weight="duotone" />
            <div className="textBackToHome">Back to home</div>
          </NavLink>
          <div>
            <SearchService />
          </div>
        </div>
        <div className="listItem">
          <ListService />
        </div>
      </div>
    </div>
  );
};
export default ServiceGym;
