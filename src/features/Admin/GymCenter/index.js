import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import DashboardBranchCenter from "../OverviewBranchCenter";
import "./GymCenter.scss";
import { handleGetDetailManager } from "./GymCenterAPI";

const GymCenterAdmin = () => {
  const location = useLocation();
  const [centerId, setCenterId] = useState("");
  // const IdOfCenter = location.pathname.split("/")[3];
  const IdCenter = useSelector(
    (state) => state.user.userInfo["AccountManager.CenterId"]
  );
  const RoleId = useSelector((state) => state.user.userInfo.roleId);
  const [centerName, setCenterName] = useState("");
  console.log("check id center: ", centerId);
  useEffect(() => {
    // const data = localStorage.getItem("centerId");
    if (RoleId === 2) {
      localStorage.setItem("CenterId", IdCenter);
      setCenterId(IdCenter);
    }

    // localStorage.setItem("centerId", centerId);
    // console.log(data);
    // setCenterId(data);
    // setCenterName(data.CenterName);
    // handleGetDetailManager(parseInt(ExternalId)).then((res) => {
    //   if (res.managerDetail) {
    //     console.log("check center id: ", res.managerDetail.CenterId);
    //     localStorage.setItem("centerId", res.managerDetail.CenterId);
    //     // setCenterId(res.managerDetail.CenterId);
    //   }
    // });
  }, []);

  return (
    <div className="gymCenterContainerBg">
      <div>Gym center chi nhánh {centerId}</div>
      <DashboardBranchCenter />
    </div>
  );
};
export default GymCenterAdmin;
