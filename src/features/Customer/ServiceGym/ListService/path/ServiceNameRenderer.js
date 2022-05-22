import React from "react";
import service from "../../../../../assets/images/service/phong-tap-mma-gym-tphcm.png";

const ServiceNameRenderer = () => {
  return (
    <>
      <div className="seviceNameContainer">
        <div className="avatar">
          <img src={service} />
        </div>
        <div className="serviceNameText">Kick Boxing</div>
      </div>
    </>
  );
};
export default ServiceNameRenderer;
