import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
import "./Specialty.scss";
import img from "../../../assets/images/service/phong-tap-mma-gym-tphcm.png";
import { NavLink } from "react-router-dom";
import { getAllStaff } from "./SectionAPI";


const OutStandingPT = (props) => {
  const [allStaff, setAllStaff] = useState();
  const [noStaff, setNoStaff] = useState(false);
  const [, setStaffLoading] = useState(true);

  useEffect(() => {

    getAllStaff("1").then((response) => {

      if (response.pts.rows.length > 0) {
        setAllStaff(response.pts.rows);
        setNoStaff(false);
      } else {
        setNoStaff(true);
      }
    })
      .catch(() => {
        setNoStaff(true);
      })
      .finally(() => {
        setStaffLoading(false);
      });
  }, []);
  return (
    <div className="section-share section-specialty">
      <div className="section-container">
        <div className="section-header">
          <span className="title-section">
            <FormattedMessage id="homepage.out-standing-pt" />
          </span>
          <NavLink to={`/Personal-Training`} className="btn-section">
            <FormattedMessage id="homepage.moreInfo" />
          </NavLink>
        </div>
        <div className="section-body">
          <Slider {...props.settings}>
            {allStaff?.map((item, index) => {

              return (
                <NavLink
                  to={`/pt-detail/${item.id}`}
                  className="section-customize specialty-child"
                //key={index}
                //onClick={() => this.handleViewDetailSpecialty(item)}
                >
                  <div
                    className="bg-image section-specialty"
                    style={{ backgroundImage: `url(${item.StaffImage})` }}
                  ></div>
                  <div className="specialty-name">{item.StaffName}</div>
                </NavLink>
              )
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};
export default OutStandingPT;
