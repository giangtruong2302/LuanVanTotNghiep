import React, { useState } from "react";
import { useEffect } from "react";
import DashboardBranchCenter from "../OverviewBranchCenter";
import "./GymCenter.scss";

const GymCenterAdmin = () => {
  const [centerId, setCenterId] = useState("");
  const [centerName, setCenterName] = useState("");
  console.log("check id center: ", centerId);
  useEffect(() => {
    const data = localStorage.getItem("centerId");
    console.log(data);
    setCenterId(data);
    setCenterName(data.CenterName);
  }, []);
  return (
    <div className="gymCenterContainerBg">
      <div>Gym center chi nhánh {centerId}</div>
      <DashboardBranchCenter />
    </div>
  );
};
export default GymCenterAdmin;
