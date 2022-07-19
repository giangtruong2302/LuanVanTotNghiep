import React from "react";
const CustomerTotal = React.lazy(() =>
  import("../features/Admin/Dashboard/CustomerTotal")
);
// const ReservationAdmin = React.lazy(() =>
//   import("../features/Admin/Dashboard/Reservation")
// );
const HomePageAdmin = React.lazy(() =>
  import("../features/Admin/Dashboard/HomePageAdmin")
);
const Reservation = React.lazy(() =>
  import("../features/Admin/GymCenter/ReservationMerchant")
);
// const Staffs = React.lazy(() => import("../features/Admin/Staffs"));
const GymCenterAdmin = React.lazy(() => import("../features/Admin/GymCenter"));
const SettingAccount = React.lazy(() =>
  import("../features/Admin/GymCenter/SettingAccount")
);
const Staffs = React.lazy(() => import("../features/Admin/GymCenter/Staffs"));
const Services = React.lazy(() =>
  import("../features/Admin/GymCenter/Services")
);
const Customers = React.lazy(() =>
  import("../features/Admin/GymCenter/Customers")
);
const ReservationDetail = React.lazy(() =>
  import("../features/Admin/GymCenter/ReservationDetail")
);
const Account = React.lazy(() => import("../features/Admin/ManageAccount"));
const ServiceAllSystem = React.lazy(() =>
  import("../features/Admin/ManageService")
);
const Manager = React.lazy(() => import("../features/Admin/ManageManager"));
const SettingAccountAdmin = React.lazy(() =>
  import("../features/Admin/SettingAccountForAdmin")
);
const DashboardBranchCenter = React.lazy(() =>
  import("../features/Admin/OverviewBranchCenter")
);
const GymConfig = React.lazy(() =>
  import("../features/Admin/GymCenter/GymConfig")
);
const GymDetail = React.lazy(() =>
  import("../features/Admin/GymCenter/GymConfig/GymDetail/gymDetail")
);
const RatingAndReview = React.lazy(() =>
  import("../features/Admin/GymCenter/GymConfig/ratingReview")
);
const CustomerProfile = React.lazy(() =>
  import("../features/Admin/GymCenter/Customers/CustomerDetail")
);
const StaffProfile = React.lazy(() =>
  import("../features/Admin/GymCenter/Staffs/StaffDetail")
);
const Order = React.lazy(() => import("../features/Admin/ManageOrder"));
const Blog = React.lazy(() => import("../features/Admin/ManagerBlog"));
const Center = React.lazy(() => import("../features/Admin/ManageCenter"));
const Schedule = React.lazy(() => import("../features/Admin/ManageSchedule"));
const Discount = React.lazy(() => import("../features/Admin/ManageDiscount"));
const Salary = React.lazy(() => import("../features/Admin/ManageSalary"));
const NoMatch = React.lazy(() => import("../features/Page404/Page404"));
// const Reservation=React.lazy(()=>import("../features/Merchant/Reservations"))
export {
  GymConfig,
  Reservation,
  ReservationDetail,
  Services,
  Customers,
  CustomerTotal,
  HomePageAdmin,
  Staffs,
  GymCenterAdmin,
  SettingAccount,
  Account,
  SettingAccountAdmin,
  ServiceAllSystem,
  Manager,
  DashboardBranchCenter,
  GymDetail,
  Schedule,
  RatingAndReview,
  CustomerProfile,
  StaffProfile,
  Order,
  Center,
  Blog,
  Discount,
  Salary,
  NoMatch,
};
