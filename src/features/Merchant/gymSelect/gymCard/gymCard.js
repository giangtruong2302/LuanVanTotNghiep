import React, { useEffect } from "react";
import "./gymCard.scss";
import CNGym from "../../../../assets/images/gym-place/chiNhanh1.jpg";
import { NavLink } from "react-router-dom";

const GymCard = () => {
  const handleAccess = () => {
    try {
      <NavLink to="/merchant/dashboard" />;
    } catch (error) {}
  };
  return (
    <div className="salonCard" onClick={handleAccess}>
      <div className="top"></div>
      <div className="bottom">
        <div className="image">
          <img src={CNGym} alt="" />
        </div>
        <div className="salonName">Chi Nhánh GH Quận 8</div>
        <div className="salonPhone">{"033 765 7262"}</div>
        <div className="salonAddress">
          {"180 Cao lỗ P5 Quận 8 Tp. Hồ Chí Minh"}
        </div>
        <div className="salonAccess" onClick={handleAccess}>
          <NavLink to="/merchant/dashboard" className="textLinkAccess">
            {" "}
            Access
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default GymCard;
