import React from "react";
import "./AppLoader.scss";

const AppLoader = () => {
  return (
    <div className="appLoader">
      <div className="loaderSpin">
        <span className={`${"cremaDot"} ${"cremaDotSpin"}`}>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </span>
      </div>
    </div>
  );
};

export default AppLoader;
