import { useEffect, useState } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./gymSelect.scss";
import GymCard from "./gymCard/gymCard";

const GymSelect = () => {
  return (
    <div className="salonSelectBackground">
      <div className="salonSelectContainer">
        <div className="salonSelectTitle">Chọn phòng GYM</div>
        <div className="salonSelect">
          <div className="selectContainer">
            <GymCard></GymCard>
            <GymCard></GymCard>
            <GymCard></GymCard>
            <GymCard></GymCard>
          </div>
          {/* {
                        listSalon ?
                            (<div className={classes.selectContainer}>
                                {listSalon.map((item, index) => {
                                    return <GymCard key={index} salonDetail={item}></GymCard>
                                })}
                            </div>)
                            : <p>Đang tải</p>
                    } */}
        </div>
      </div>
    </div>
  );
};
export default GymSelect;
