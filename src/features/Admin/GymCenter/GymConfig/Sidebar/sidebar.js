import React, { useState, useEffect } from "react";
import classes from "./styles.module.scss";
// import { Link, useLocation } from "react-router-dom";
import { useLocation, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//icon
import {
  GridFour,
  HourglassSimpleMedium,
  Info,
  Star,
  Question,
  ArrowArcLeft,
  ArrowLeft,
} from "phosphor-react";

const navItem = [
  {
    display: "Back to Dashboard",
    icon: <ArrowLeft weight="light" />,
    link: "/admin/manage-center",
  },

  {
    display: "Details",
    icon: <Info weight="light" />,
    link: "/admin/merchant/gym-config/details",
  },
  {
    display: "Rating & Reviews",
    icon: <Star weight="light" />,
    link: "/admin/merchant/gym-config/rating-and-review",
  },
];

const SideBar = () => {
  const [active, setActive] = useState(2);
  const { pathname } = useLocation();
  const linkName = pathname.split("/")[2];
  const navigate = useNavigate();
  useEffect(() => {
    navItem.map((item, index) => {
      return linkName === item.link && setActive(index);
    });
  }, [linkName]);

  return (
    <div className={classes.sidebarContainer}>
      <div className={classes.sidebarList}>
        {navItem.map((item, index) => {
          return (
            <Link to={item.link} className={classes.sidebarItem} key={index}>
              <div
                className={`${classes.sidebarItemContainer} ${
                  active === index ? classes.active : ""
                }`}
              >
                {item.icon}
                <div className={classes.itemDisplay}>{item.display}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
