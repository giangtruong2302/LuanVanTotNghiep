import React from "react";
import service from "../../../../../../assets/images/service/phong-tap-mma-gym-tphcm.png";
import "./serviceRender.scss";

const PriceRenderer = (props) => {
  return (
    <>
      <div className="priceOfService">
        <div className="servicePriceText">{props.data.Price}</div>
      </div>
    </>
  );
};
export default PriceRenderer;
