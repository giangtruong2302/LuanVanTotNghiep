import React, { useState } from "react";
import Dashboard from "../containers/System/Admin/dashboard";
import GymSelect from "../features/Merchant/gymSelect";
import GymConfig from "../features/Merchant/gymConfig";
import Reservation from "../features/Merchant/Reservations";
import {
  Redirect,
  Route,
  Switch,
  Router,
  BrowserRouter,
} from "react-router-dom";

const System = () => {
  return (
    <>
      <div className="system-container">
        <div className="system-list">
          <BrowserRouter>
            <Switch>
              <Route path="/system/dashboard" component={Dashboard} />
              <Route path="/system/gym-select" component={GymSelect} />
              <Route path="/system/gym-config" component={GymConfig} />
              <Route path="/system/gym-reservation" component={Reservation} />
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
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
};
export default System;
