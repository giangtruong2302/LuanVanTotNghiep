import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import img from "../../../assets/images/service/phong-tap-mma-gym-tphcm.png";
import { getAllBlog } from "./SectionAPI";
import { NavLink } from "react-router-dom";
const HandBook = (props) => {
  var HandbookSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  const [allBlog, setAllBlog] = useState();
  const [noBlog, setNoBlog] = useState(false);
  const [, setBlogLoading] = useState(true);

  useEffect(() => {

    getAllBlog("1").then((response) => {

      if (response.blog.rows.length > 0) {
        setAllBlog(response.blog.rows);
        setNoBlog(false);
      } else {
        setNoBlog(true);
      }
    })
      .catch(() => {
        setNoBlog(true);
      })
      .finally(() => {
        setBlogLoading(false);
      });
  }, []);
  return (
    <div className="section-share section-specialty">
      <div className="section-container">
        <div className="section-header">
          <span className="title-section">
            <FormattedMessage id="homepage.handbook" />
          </span>
          <NavLink to={`/Blog`} className="btn-section">
            <FormattedMessage id="homepage.moreInfo" />
          </NavLink>
        </div>
        <div className="section-body">
          <Slider {...props.settings}>
            {allBlog?.map((item, index) => {

              return (
                <NavLink
                  to={`/blog-detail/${item.id}`}
                  className="section-customize specialty-child handbook"
                //key={index}
                //onClick={() => this.handleViewDetailSpecialty(item)}
                >

                  <div
                    className="bg-image section-specialty"
                    style={{ backgroundImage: `url(${item.BlogImage})`, width: "" }}
                  ></div>
                  <div className="specialty-name">{item.Title}</div>
                </NavLink>
              )
            })}

          </Slider>
        </div>
      </div>
    </div>
  );
};
export default HandBook;
