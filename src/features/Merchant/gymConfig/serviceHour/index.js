import React from "react";
import "./serviceHour.scss";
import SetHour from "./SetHours/SetHour";
const ServiceHours = () => {
  return (
    <div className="serviceHoursBackground">
      <div className="left">
        <SetHour></SetHour>
      </div>
      <div className="right">
        {/* <AddDayOff></AddDayOff> */}
        add day off
      </div>
    </div>
  );
};
export default ServiceHours;
