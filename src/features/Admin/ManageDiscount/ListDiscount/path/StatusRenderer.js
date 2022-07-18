import { Activity } from "phosphor-react";
import React from "react";
import "./customizeListPT.scss";

const StatusRenderer = (props) => {
  return (
    <>
      {props.data.isActive === true ? (
        <div className="statusContainer">
          <div className="statusText" style={{ color: "#53d1b6" }}>
            ACTIVE
          </div>
          <Activity color="#53d1b6" weight="light" />
        </div>
      ) : (
        <div className="statusContainer">
          <div className="statusText" style={{ color: "#ffff00" }}>
            DE ACTIVE
          </div>
          <Activity color="#ffff00" weight="light" />
        </div>
      )}
    </>
  );
};
export default StatusRenderer;
