import React from "react";
import service from "../../../../../../assets/images/service/phong-tap-mma-gym-tphcm.png";
import "./serviceRender.scss";

const ServiceNameRenderer = (props) => {
  return (
    <>
      <div className="seviceNameContainer">
        <div className="avatar">
          <img
            src={props.data.ServiceImage ? props.data.ServiceImage : service}
          />
        </div>
        <div className="serviceNameText">{props.data.ServiceName}</div>
      </div>
    </>
  );
};
export default ServiceNameRenderer;
