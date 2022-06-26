import React from "react";
import { Routes, Route } from "react-router-dom";
import AppSuspense from "../component/AppSuspense";
import PersonalInformation from "../features/Customer/PersonalInfomation";
import Review from "../features/Customer/Review";
import Facebook from "../features/login/loginFacebook/faceBook";
import { SendEmail } from "../features/sendEmail";
import Booking from "../features/Staff/Booking/booking";
import Staff from "../features/Staff/staff";
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
        <Route path="/staff-personal-page" element={<Staff />} />
        <Route path="/pt-booking" element={<Booking />} />
        <Route path="/login-facebook" element={<Facebook />} />
        <Route path="/customer-review" element={<Review />} />
        <Route path="/customer-infomation" element={<PersonalInformation />} />
        <Route path="/send-email" element={<SendEmail />} />

        {/* merchant */}
        <Route path="/merchant/gym-select" element={<GymSelect />} />
        <Route path="/merchant/dashboard" element={<Dashboard />} />
        <Route path="/merchant/reservation" element={<Reservation />} />
      </Routes>
    </AppSuspense>
  );
};
export default AppLayout;
