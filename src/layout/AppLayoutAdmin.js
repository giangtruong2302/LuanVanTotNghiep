import React from "react";
import { Routes, Route } from "react-router-dom";
import AppSuspense from "../component/AppSuspense";
import {
  CustomerTotal,
  Reservation,
  HomePageAdmin,
  Staffs,
  GymCenterAdmin,
  SettingAccount,
} from "../routes/admin";
import AdminPage from "../features/Admin";

const AppLayoutAdmin = () => {
  return (
    <AppSuspense>
      <Routes>
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<HomePageAdmin />} />
          <Route path="/admin/customer-total" element={<CustomerTotal />} />
          <Route path="/admin/merchant/reservation" element={<Reservation />} />
          <Route path="/admin/manage-staffs" element={<Staffs />} />
          <Route path="/admin/manage-center" element={<GymCenterAdmin />} />
          <Route path="/admin/merchant/settings" element={<SettingAccount />} />
        </Route>

        {/* <Route path="/reservation" element={<Reservation />} /> */}
      </Routes>
    </AppSuspense>
  );
};
export default AppLayoutAdmin;
