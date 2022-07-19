import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import img from "../../../assets/images/service/phong-tap-mma-gym-tphcm.png";
import { getAllGymCenter } from "./SectionAPI";
import { NavLink } from "react-router-dom";
const GymCenter = (props) => {
  const [allGymCenter, setAllGymCenter] = useState();
  const [noGymCenter, setNoGymCenter] = useState(false);
  const [, setGymCenterLoading] = useState(true);
  useEffect(() => {

    getAllGymCenter("1").then((response) => {

      if (response.centers.rows.length > 0) {
        setAllGymCenter(response.centers.rows);
        setNoGymCenter(false);
      } else {
        setNoGymCenter(true);
      }
    })
      .catch(() => {
        setNoGymCenter(true);
      })
      .finally(() => {
        setGymCenterLoading(false);
      });
  }, []);

  return (
    <div className="section-share section-specialty">
      <div className="section-container">
        <div className="section-header">
          <span className="title-section">
            <FormattedMessage id="homepage.gym-center" />
          </span>

          <NavLink to={`/gym-center`} className="btn-section">
            <FormattedMessage id="homepage.moreInfo" />
          </NavLink>
        </div>
        <div className="section-body">
          <Slider {...props.settings}>
            {allGymCenter?.map((item, index) => {
              return (

                <NavLink
                  to={`/center-detail/${item.id}`}
                  className="section-customize specialty-child"
                //key={index}
                //onClick={() => this.handleViewDetailSpecialty(item)}
                >
                  <div
                    className="bgCenter "
                    style={{ backgroundImage: `url(${item.CenterImage})` }}
                  ></div>
                  <div className="specialty-name">{item.CenterName}</div>
                </NavLink>
              )
            })}

          </Slider>
        </div>
      </div>
    </div>
  );
};
export default GymCenter;
