import React, { CSSProperties } from "react";
import "./Stagger.scss";

const StaggerAnimation = () => {
  return (
    <div className="staggerContainer">
      <div className="staggerLoading">
        <div style={{ "---delay": "3s" }}></div>
        <div style={{ "---delay": "2s" }}></div>
        <div style={{ "---delay": "1s" }}></div>
      </div>
    </div>
  );
};

export default StaggerAnimation;
