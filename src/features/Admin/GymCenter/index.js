import React from "react";
import DashboardBranchCenter from "../OverviewBranchCenter";
import "./GymCenter.scss";

const GymCenterAdmin = () => {
  return (
    <div className="gymCenterContainerBg">
      <div>Gym center chi nhánh quận 8</div>
      <DashboardBranchCenter />
    </div>
  );
};
export default GymCenterAdmin;
