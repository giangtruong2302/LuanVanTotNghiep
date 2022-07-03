import React from "react";
import classes from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import SearchService from "./SearchService/SearchService";
import ListService from "./ListService/ListService";

const ServiceGym = () => {
  return (
    <div className={classes.ServiceProfileBg}>
      <div className={classes.containerServiceList}>
        <div className={classes.backToHome}>
          <NavLink to="/" className={classes.backToHomeLink}>
            <ArrowLeft size={24} color="#292829" weight="duotone" />
            <div className={classes.textBackToHome}>Back to home</div>
          </NavLink>
          <div>
            <SearchService />
          </div>
        </div>
        <div className={classes.listItem}>
          <ListService />
        </div>
      </div>
    </div>
  );
};
export default ServiceGym;
