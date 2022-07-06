import React from "react";
import service from "../../../../../../assets/images/service/phong-tap-mma-gym-tphcm.png";
import "./serviceRender.scss";

const EstimateTime = (props) => {
  return (
    <>
      <div className="estimateTimeOfService">
        <div className="serviceTimeText">{props.data.WorkDuration}</div>
      </div>
    </>
  );
};
export default EstimateTime;
