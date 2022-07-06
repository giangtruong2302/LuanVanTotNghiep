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
  Customers,
  Services,
  ReservationDetail,
  Account,
  SettingAccountAdmin,
  ServiceAllSystem,
  Manager,
  GymDetail,
  DashboardBranchCenter,
  GymConfig,
  RatingAndReview,
} from "../routes/admin";
import AdminPage from "../features/Admin";
import RequireAuth from "./RequiredAuth";
import { useSelector } from "react-redux";

const AppLayoutAdmin = () => {
  let roleId = -1;
  roleId = useSelector((state) => state.user?.userInfo?.roleId);

  return (
    <AppSuspense>
      <Routes>
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminPage />
            </RequireAuth>
          }
        >
          <Route
            index
            element={
              roleId ? (
                roleId === 1 ? (
                  <HomePageAdmin />
                ) : (
                  <GymCenterAdmin />
                )
              ) : (
                ""
              )
            }
          />
          <Route path="/admin/customer-total" element={<CustomerTotal />} />
          <Route path="/admin/merchant/reservation" element={<Reservation />} />
          <Route path="/admin/merchant/gym-config" element={<GymConfig />}>
            <Route index element={<GymDetail />} />
            <Route
              path="/admin/merchant/gym-config/details"
              element={<GymDetail />}
            />
            <Route
              path="/admin/merchant/gym-config/rating-and-review"
              element={<RatingAndReview />}
            />
          </Route>

          <Route path="/admin/merchant/:branchId/staffs" element={<Staffs />} />
          <Route path="/admin/manage-center" element={<GymCenterAdmin />} />
          <Route path="/admin/merchant/settings" element={<SettingAccount />} />
          <Route
            path="/admin/merchant/:branchId/services"
            element={<Services />}
          />
          <Route
            path="/admin/merchant/:branchId/customers"
            element={<Customers />}
          />
          <Route
            path="/admin/merchant/reservation-detail/:id"
            element={<ReservationDetail />}
          />
          <Route path="/admin/view-list-account" element={<Account />} />
          <Route
            path="/admin/setting-account"
            element={<SettingAccountAdmin />}
          />
          <Route
            path="/admin/view-list-service"
            element={<ServiceAllSystem />}
          />
          <Route path="/admin/view-list-manager" element={<Manager />} />
        </Route>
      </Routes>
    </AppSuspense>
  );
};
export default AppLayoutAdmin;
