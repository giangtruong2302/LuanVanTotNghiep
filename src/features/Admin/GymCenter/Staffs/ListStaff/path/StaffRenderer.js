import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./customizeListPT.scss";
import avaPT from "../../../../../../assets/images/service/phong-tap-mma-gym-tphcm.png";

const StaffRenderer = (props) => {
  // const [idPT] = useState("1");
  return (
    <>
      <Link
        to={`/admin/view-staff-info/${props.data.id}`}
        className="staffContainer"
      >
        <div className="avatar">
          <img src={props.data.StaffImage ? props.data.StaffImage : avaPT} />
        </div>
        <div className="staffText">{props.data.StaffName}</div>
      </Link>
    </>
  );
};
export default StaffRenderer;
