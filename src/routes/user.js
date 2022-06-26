import React from "react";
const Home = React.lazy(() => import("../pages/HomePage"));
const LoginPage = React.lazy(() => import("../features/login/index"));
const GymCenter = React.lazy(() => import("../features/Customer/GymCenter"));
const PT = React.lazy(() => import("../features/Customer/PT"));
const Service = React.lazy(() => import("../features/Customer/ServiceGym"));
const SignUp = React.lazy(() => import("../features/sign-up"));

//merchant
const GymSelect = React.lazy(() => import("../features/Merchant/gymSelect"));
const Dashboard = React.lazy(() =>
  import("..//containers/System/Admin/dashboard")
);
const Reservation = React.lazy(() =>
  import("../features/Merchant/Reservations/index")
);

//admin
const AdminPage = React.lazy(() => import("../features/Admin/"));
// const GymConfig = React.lazy(() =>
//   import("../features/Merchant/gymConfig/index")
// );
const PTDetail = React.lazy(() => import("../features/Customer/PTDetail"));
const ServiceDetail = React.lazy(() =>
  import("../features/Customer/ServiceGymDetail")
);
const Staff = React.lazy(() => import("../features/Staff/staff"));
const Booking = React.lazy(() => import("../features/Staff/Booking/booking"));
const Review = React.lazy(() => import("../features/Customer/Review"));
const PersonalInfomation = React.lazy(() => import("../features/Customer/PersonalInfomation"));
const SendEmail = React.lazy(() => import("../features/sendEmail/index"));
export {
  SendEmail,
  PersonalInfomation,
  Review,
  Staff,
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
  Booking,
};
