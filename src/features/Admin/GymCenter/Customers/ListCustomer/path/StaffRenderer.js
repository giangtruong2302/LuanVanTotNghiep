import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./customizeListPT.scss";
import avaPT from "../../../../../../assets/images/service/phong-tap-mma-gym-tphcm.png";

const StaffRenderer = (props) => {
  console.log("check props path: ", props);
  const [idPT] = useState("1");
  return (
    <>
      <Link to={`/pt-detail/${idPT}`} className="staffContainer">
        <div className="avatar">
          <img src={avaPT} />
        </div>
        <div className="staffText">{props.data.CustomerName}</div>
      </Link>
    </>
  );
};
export default StaffRenderer;
