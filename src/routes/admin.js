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
const SettingAccountAdmin = React.lazy(() =>
  import("../features/Admin/SettingAccountForAdmin")
);
// const Reservation=React.lazy(()=>import("../features/Merchant/Reservations"))
export {
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
};
