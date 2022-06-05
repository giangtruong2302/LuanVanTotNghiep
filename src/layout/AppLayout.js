import React from "react";
import { Routes, Route } from "react-router-dom";
import AppSuspense from "../component/AppSuspense";
import {
  Home,
  LoginPage,
  GymCenter,
  PT,
  Service,
  SignUp,
  GymSelect,
  Dashboard,
  Reservation,
  AdminPage,
  PTDetail,
  ServiceDetail,
} from "../routes/user";

const AppLayout = () => {
  return (
    <AppSuspense>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Personal-Training" element={<PT />} />
        <Route path="/service-gym" element={<Service />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/gym-center" element={<GymCenter />} />
        <Route path="/pt-detail/:id" element={<PTDetail />} />
        <Route path="/service-detail/:id" element={<ServiceDetail />} />
        {/* merchant */}
        <Route path="/merchant/gym-select" element={<GymSelect />} />
        <Route path="/merchant/dashboard" element={<Dashboard />} />
        <Route path="/merchant/reservation" element={<Reservation />} />
      </Routes>
    </AppSuspense>
  );
};
export default AppLayout;
