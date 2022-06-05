import React, { useState } from "react";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
import "./Specialty.scss";
import img from "../../../assets/images/service/phong-tap-mma-gym-tphcm.png";
import { NavLink } from "react-router-dom";

const OutStandingPT = (props) => {
  return (
    <div className="section-share section-specialty">
      <div className="section-container">
        <div className="section-header">
          <span className="title-section">
            <FormattedMessage id="homepage.out-standing-pt" />
          </span>
          <button className="btn-section">
            <FormattedMessage id="homepage.moreInfo" />
          </button>
        </div>
        <div className="section-body">
          <Slider {...props.settings}>
            <NavLink
              to="/pt-detail/1"
              className="section-customize specialty-child"
              //key={index}
              //onClick={() => this.handleViewDetailSpecialty(item)}
            >
              <div
                className="bg-image section-specialty"
                style={{ backgroundImage: `url(${img})` }}
              ></div>
              <div className="specialty-name">{"item.name"}</div>
            </NavLink>
            <div
              className="section-customize specialty-child"
              //key={index}
              //onClick={() => this.handleViewDetailSpecialty(item)}
            >
              <div
                className="bg-image section-specialty"
                style={{ backgroundImage: `url(${img})` }}
              ></div>
              <div className="specialty-name">{"item.name"}</div>
            </div>
            <div
              className="section-customize specialty-child"
              //key={index}
              //onClick={() => this.handleViewDetailSpecialty(item)}
            >
              <div
                className="bg-image section-specialty"
                style={{ backgroundImage: `url(${img})` }}
              ></div>
              <div className="specialty-name">{"item.name"}</div>
            </div>
            <div
              className="section-customize specialty-child"
              //key={index}
              //onClick={() => this.handleViewDetailSpecialty(item)}
            >
              <div
                className="bg-image section-specialty"
                style={{ backgroundImage: `url(${img})` }}
              ></div>
              <div className="specialty-name">{"item.name"}</div>
            </div>
            <div
              className="section-customize specialty-child"
              //key={index}
              //onClick={() => this.handleViewDetailSpecialty(item)}
            >
              <div
                className="bg-image section-specialty"
                style={{ backgroundImage: `url(${img})` }}
              ></div>
              <div className="specialty-name">{"item.name"}</div>
            </div>
            <div
              className="section-customize specialty-child"
              //key={index}
              //onClick={() => this.handleViewDetailSpecialty(item)}
            >
              <div
                className="bg-image section-specialty"
                style={{ backgroundImage: `url(${img})` }}
              ></div>
              <div className="specialty-name">{"item.name"}</div>
            </div>
            <div
              className="section-customize specialty-child"
              //key={index}
              //onClick={() => this.handleViewDetailSpecialty(item)}
            >
              <div
                className="bg-image section-specialty"
                style={{ backgroundImage: `url(${img})` }}
              ></div>
              <div className="specialty-name">{"item.name"}</div>
            </div>
            <div
              className="section-customize specialty-child"
              //key={index}
              //onClick={() => this.handleViewDetailSpecialty(item)}
            >
              <div
                className="bg-image section-specialty"
                style={{ backgroundImage: `url(${img})` }}
              ></div>
              <div className="specialty-name">{"item.name"}</div>
            </div>
            <div
              className="section-customize specialty-child"
              //key={index}
              //onClick={() => this.handleViewDetailSpecialty(item)}
            >
              <div
                className="bg-image section-specialty"
                style={{ backgroundImage: `url(${img})` }}
              ></div>
              <div className="specialty-name">{"item.name"}</div>
            </div>
            <div
              className="section-customize specialty-child"
              //key={index}
              //onClick={() => this.handleViewDetailSpecialty(item)}
            >
              <div
                className="bg-image section-specialty"
                style={{ backgroundImage: `url(${img})` }}
              ></div>
              <div className="specialty-name">{"item.name"}</div>
            </div>
            <div
              className="section-customize specialty-child"
              //key={index}
              //onClick={() => this.handleViewDetailSpecialty(item)}
            >
              <div
                className="bg-image section-specialty"
                style={{ backgroundImage: `url(${img})` }}
              ></div>
              <div className="specialty-name">{"item.name"}</div>
            </div>
            <div
              className="section-customize specialty-child"
              //key={index}
              //onClick={() => this.handleViewDetailSpecialty(item)}
            >
              <div
                className="bg-image section-specialty"
                style={{ backgroundImage: `url(${img})` }}
              ></div>
              <div className="specialty-name">{"item.name"}</div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};
export default OutStandingPT;
