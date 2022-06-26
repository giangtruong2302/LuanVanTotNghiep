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
const Staffs = React.lazy(() => import("../features/Admin/Staffs"));
const GymCenterAdmin = React.lazy(() => import("../features/Admin/GymCenter"));
const SettingAccount = React.lazy(() =>
  import("../features/Admin/GymCenter/SettingAccount")
);
// const Reservation=React.lazy(()=>import("../features/Merchant/Reservations"))
export {
  Reservation,
  CustomerTotal,
  HomePageAdmin,
  Staffs,
  GymCenterAdmin,
  SettingAccount,
};
