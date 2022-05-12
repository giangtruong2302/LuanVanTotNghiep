import React from "react";
import "./GymConfig.scss";
import { NavLink, Route, Switch } from "react-router-dom";
import FAQ from "./FAQ";
import Gallery from "./gallery";
import GymDetail from "./gymDetail";
import RatingReview from "./ratingReview";
import ServiceHours from "./serviceHour";
import Sidebar from "./sidebar/Sidebar";

const GymConfig = () => {
  return (
    <div className="gymConfigBackground">
      <div className="containerGymConfig">
        <Sidebar />
        <div className="contentContainer">
          <Switch>
            <Route exact path="/system/gym-config/">
              <GymDetail />
            </Route>
            <Route path="/system/gym-config/details">
              <GymDetail />
            </Route>
            <Route path="/system/gym-config/gallery">
              <Gallery />
            </Route>
            <Route path="/system/gym-config/service-hours">
              <ServiceHours />
            </Route>

            <Route path="/system/gym-config/rating-review">
              <RatingReview />
            </Route>
            <Route path="/system/gym-config/faq">
              <FAQ />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};
export default GymConfig;
