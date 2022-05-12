import React from "react";
import Slider from "react-slick";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import img from "../../../assets/images/service/phong-tap-mma-gym-tphcm.png";

const HandBook = (props) => {
  var HandbookSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  return (
    <div className="section-share section-specialty">
      <div className="section-container">
        <div className="section-header">
          <span className="title-section">
            <FormattedMessage id="homepage.handbook" />
          </span>
          <button className="btn-section">
            <FormattedMessage id="homepage.moreInfo" />
          </button>
        </div>
        <div className="section-body">
          <Slider {...HandbookSettings}>
            <div
              className="section-customize specialty-child handbook"
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
              className="section-customize specialty-child handbook"
              //key={index}
              //onClick={() => this.handleViewDetailSpecialty(item)}
            >
              <div
                className="bg-image section-specialty "
                style={{ backgroundImage: `url(${img})` }}
              ></div>
              <div className="specialty-name">{"item.name"}</div>
            </div>
            <div
              className="section-customize specialty-child handbook"
              //key={index}
              //onClick={() => this.handleViewDetailSpecialty(item)}
            >
              <div
                className="bg-image section-specialty "
                style={{ backgroundImage: `url(${img})` }}
              ></div>
              <div className="specialty-name">{"item.name"}</div>
            </div>
            <div
              className="section-customize specialty-child handbook"
              //key={index}
              //onClick={() => this.handleViewDetailSpecialty(item)}
            >
              <div
                className="bg-image section-specialty "
                style={{ backgroundImage: `url(${img})` }}
              ></div>
              <div className="specialty-name">{"item.name"}</div>
            </div>
            <div
              className="section-customize specialty-child handbook"
              //key={index}
              //onClick={() => this.handleViewDetailSpecialty(item)}
            >
              <div
                className="bg-image section-specialty "
                style={{ backgroundImage: `url(${img})` }}
              ></div>
              <div className="specialty-name">{"item.name"}</div>
            </div>
            <div
              className="section-customize specialty-child handbook"
              //key={index}
              //onClick={() => this.handleViewDetailSpecialty(item)}
            >
              <div
                className="bg-image section-specialty "
                style={{ backgroundImage: `url(${img})` }}
              ></div>
              <div className="specialty-name">{"item.name"}</div>
            </div>
            <div
              className="section-customize specialty-child handbook"
              //key={index}
              //onClick={() => this.handleViewDetailSpecialty(item)}
            >
              <div
                className="bg-image section-specialty "
                style={{ backgroundImage: `url(${img})` }}
              ></div>
              <div className="specialty-name">{"item.name"}</div>
            </div>
            <div
              className="section-customize specialty-child handbook"
              //key={index}
              //onClick={() => this.handleViewDetailSpecialty(item)}
            >
              <div
                className="bg-image section-specialty "
                style={{ backgroundImage: `url(${img})` }}
              ></div>
              <div className="specialty-name">{"item.name"}</div>
            </div>
            <div
              className="section-customize specialty-child handbook"
              //key={index}
              //onClick={() => this.handleViewDetailSpecialty(item)}
            >
              <div
                className="bg-image section-specialty "
                style={{ backgroundImage: `url(${img})` }}
              ></div>
              <div className="specialty-name">{"item.name"}</div>
            </div>
            <div
              className="section-customize specialty-child handbook"
              //key={index}
              //onClick={() => this.handleViewDetailSpecialty(item)}
            >
              <div
                className="bg-image section-specialty "
                style={{ backgroundImage: `url(${img})` }}
              ></div>
              <div className="specialty-name">{"item.name"}</div>
            </div>
            <div
              className="section-customize specialty-child handbook"
              //key={index}
              //onClick={() => this.handleViewDetailSpecialty(item)}
            >
              <div
                className="bg-image section-specialty "
                style={{ backgroundImage: `url(${img})` }}
              ></div>
              <div className="specialty-name">{"item.name"}</div>
            </div>
            <div
              className="section-customize specialty-child handbook"
              //key={index}
              //onClick={() => this.handleViewDetailSpecialty(item)}
            >
              <div
                className="bg-image section-specialty handbook"
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
export default HandBook;
