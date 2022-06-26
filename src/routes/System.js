import React, { useState } from "react";
import Dashboard from "../containers/System/Admin/dashboard";
import GymSelect from "../features/Merchant/gymSelect";
import GymConfig from "../features/Merchant/gymConfig";
import Reservation from "../features/Merchant/Reservations";
import { Routes, Route } from "react-router-dom";
import Staff from "../features/Staff/staff";


const System = () => {
  return (
    <>
      <div className="system-container">
        <div className="system-list">
          <Routes>
            <Route path="/system/dashboard" component={Dashboard} />
            <Route path="/system/gym-select" component={GymSelect} />
            <Route path="/system/gym-config" component={GymConfig} />
            <Route path="/system/gym-reservation" component={Reservation} />
            <Route path="/staff" component={Staff} />
            {/* <Route
                path="/system/dashboard/gym-config"
                component={GymConfig}
              /> */}
            {/* <Route path="/system/user-manage" component={UserManage} /> */}
            {/* <Route path="/system/user-redux" component={UserRedux} />
                            <Route path="/system/manage-doctor" component={ManageDoctor} />
                            <Route path="/system/manage-specialty" component={ManageSpecialty} />
                            <Route path="/system/manage-clinic" component={ManageClinic} /> */}
            {/* <Route component={() => { return (<Redirect to={systemMenuPath} />) }} /> */}
          </Routes>
        </div>
      </div>
    </>
  );
};
export default System;
