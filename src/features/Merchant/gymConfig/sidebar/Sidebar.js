import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Sidebar.scss";
import gridFour from "../../../../assets/images/iconServiceDetail/GridFour.svg";
import HourglassSimpleMedium from "../../../../assets/images/iconServiceDetail/HourglassSimpleMedium.svg";
import Info from "../../../../assets/images/iconServiceDetail/Info.svg";
import Star from "../../../../assets/images/iconServiceDetail/Star.svg";
import Question from "../../../../assets/images/iconServiceDetail/Question.svg";
const navItem = [
  {
    display: "Gallery",
    icon: gridFour,
    link: "/system/gym-config/gallery",
  },
  {
    display: "Service hours",
    icon: HourglassSimpleMedium,
    link: "service-hours",
  },
  {
    display: "Details",
    icon: Info,
    link: "/system/gym-config/details",
  },
  {
    display: "Rating & Reviews",
    icon: Star,
    link: "/admin/merchant/gym-config/rating-and-review",
  },
  {
    display: "FAQ",
    icon: Question,
    link: "faq",
  },
];

const Sidebar = () => {
  const [active, setActive] = useState(2);
  const { pathname } = useLocation();
  const linkName = pathname.slice("/")[2];
  useEffect(() => {
    navItem.map((item, index) => {
      return linkName === item.link && setActive(index);
    });
  }, [linkName]);
  return (
    <div className="sidebarContainer">
      <div className="sidebarList">
        {navItem.map((item, index) => {
          return (
            <NavLink to={item.link} className="sidebarItem" key={index}>
              <div
                className={`${"sidebarItemContainer"} ${
                  active === index ? "active" : ""
                }`}
              >
                <img src={item.icon} alt="" />
                <div className={"itemDisplay"}>{item.display}</div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
export default Sidebar;
