import logo from "./logo.svg";
import "./App.css";
import { Route, Switch, Router, Body, BrowserRouter } from "react-router-dom";
import Home from "./pages/HomePage/home";
import System from "./routes/System";
import React from "react";
import { ToastContainer } from "react-toastify";
import { Fragment } from "react";
import { path } from "./utils/constant";
// import Dashboard from "./containers/System/Admin/dashboard";
import LoginPage from "./features/login";
import SignUp from "./features/sign-up";
import PersonalTraining from "./features/Customer/PT";
import ServiceGym from "./features/Customer/ServiceGym";
// import GymConfig from "./features/Merchant/gymConfig";

function App() {
  // const Home = React.lazy(() => import("./pages/HomePage/home"));
  return (
    <Fragment>
      <div className="main-container">
        {/* check login  */}
        <div className="content-container">
          {/* <CustomScrollbars style={{ height: '100vh', width: '100%' }}> */}
          <BrowserRouter>
            <Switch>
              <Route path={path.HOME} exact component={Home} />
              {/* <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                        <Route path={path.HOMEPAGE} component={HomePage} /> */}
              <Route path={path.SYSTEM} component={System} />
              <Route path={path.LOGIN} component={LoginPage} />
              <Route path={path.SIGN_UP} component={SignUp} />
              <Route path={path.PT} component={PersonalTraining} />
              <Route path={path.Service} component={ServiceGym} />
              {/* <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} /> */}
              {/* <Route path={'/doctor/'} component={Doctor} /> */}
              {/* <Route path={path.VERIFY_EMAIL_BOOKING} component={VerifyEmail} />
                        <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty} />
                        <Route path={path.DETAIL_CLINIC} component={DetailClinic} /> */}
            </Switch>
          </BrowserRouter>
          {/* </CustomScrollbars> */}
        </div>

        {/* <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            /> */}
      </div>
    </Fragment>
  );
}

export default App;
