import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import img from "../../../assets/images/service/phong-tap-mma-gym-tphcm.png";
import { NavLink } from "react-router-dom";
import { getAllService } from "./SectionAPI";
const Specialty = (props) => {
  console.log("object", props.settings);
  const [allService, setAllService] = useState();
  const [noService, setNoService] = useState(false);
  const [, setServiceLoading] = useState(true);

  useEffect(() => {

    getAllService("1").then((response) => {

      if (response.services.rows.length > 0) {
        setAllService(response.services.rows);
        setNoService(false);
      } else {
        setNoService(true);
      }
    })
      .catch(() => {
        setNoService(true);
      })
      .finally(() => {
        setServiceLoading(false);
      });
  }, []);
  return (
    <div className="section-share section-specialty">
      <div className="section-container">
        <div className="section-header">
          <span className="title-section">
            <FormattedMessage id="homepage.specialty-popular" />
          </span>
          <NavLink to={`/service-gym`} className="btn-section">
            <FormattedMessage id="homepage.moreInfo" />
          </NavLink>

        </div>
        <div className="section-body">
          <Slider {...props.settings}>
            {allService?.map((item, index) => {

              return (
                <NavLink
                  to={`service-detail/${item.id}`}
                  className="section-customize specialty-child"
                //key={index}
                //onClick={() => this.handleViewDetailSpecialty(item)}
                >
                  <div
                    className="bg-image section-specialty"
                    style={{ backgroundImage: `url(${item.ServiceImage})` }}
                  ></div>
                  <div className="specialty-name">{item.ServiceName}</div>
                </NavLink>
              )
            })}

          </Slider>
        </div>
      </div>
    </div>
  );
};
export default Specialty;
