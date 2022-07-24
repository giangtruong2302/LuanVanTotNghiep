import React from "react";
import "./Service.scss"
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import SearchService from "./SearchService/SearchService";
import ListService from "./ListService/ListService";
import HomeFooter from "../../../pages/HomePage/HomeFooter";
import "../../../pages/HomePage/HomePage.scss"
import { FormattedMessage } from "react-intl";
const ServiceGym = () => {
  return (
    <>
      <div className="ServiceProfileBg">

        <div className="backToHome">
          <NavLink to="/" className="backToHomeLink">
            <ArrowLeft size={24} color="#ffffff" weight="duotone" />
            <div className="textBackToHome"><FormattedMessage id="header.back-to-home" /></div>
          </NavLink>

        </div>
        <div>
          <SearchService />
        </div>
        <div className="footer"><HomeFooter /></div>

      </div>

    </>

  );
};
export default ServiceGym;
