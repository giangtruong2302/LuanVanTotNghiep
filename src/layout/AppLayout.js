import React from "react";
import { Routes, Route } from "react-router-dom";
import AppSuspense from "../component/AppSuspense";
import CustomerLoginPage from "../features/Customer/login";
import PersonalInformation from "../features/Customer/PersonalInfomation";
import Review from "../features/Customer/Review";

import { SendEmail } from "../features/sendEmail";
import Booking from "../features/Staff/Booking/booking";
import Staff from "../features/Staff/staff";
import BMI from "../features/BMI";
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
  AdminLoginPage,
} from "../routes/user";
import GymDetailPage from "../features/Customer/GymCenterDetail";

const AppLayout = () => {
  return (
    <AppSuspense>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/Personal-Training" element={<PT />} />
        <Route path="/service-gym" element={<Service />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/gym-center" element={<GymCenter />} />
        <Route path="/pt-detail/:id" element={<PTDetail />} />
        <Route path="/service-detail/:id" element={<ServiceDetail />} />
        <Route path="/staff-personal-page" element={<Staff />} />
        <Route path="/pt-booking" element={<Booking />} />
        <Route path="/customer-login" element={<CustomerLoginPage />} />
        <Route path="/customer-review" element={<Review />} />
        <Route path="/customer-infomation" element={<PersonalInformation />} />
        <Route path="/send-email" element={<SendEmail />} />
        <Route path="/bmi" element={<BMI />} />
        <Route path="/center-detail" element={<GymDetailPage />} />

        {/* merchant */}
        <Route path="/merchant/gym-select" element={<GymSelect />} />
        <Route path="/merchant/dashboard" element={<Dashboard />} />
        <Route path="/merchant/reservation" element={<Reservation />} />
      </Routes>
    </AppSuspense>
  );
};
export default AppLayout;
