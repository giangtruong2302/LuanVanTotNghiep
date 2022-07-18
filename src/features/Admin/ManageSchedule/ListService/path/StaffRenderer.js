import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./customizeListPT.scss";
import avaPT from "../../../../../assets/images/service/phong-tap-mma-gym-tphcm.png";
import { handleGetDetailStaff } from "../../../GymCenter/Staffs/StaffDetail/StaffDetailAPI";

const StaffRenderer = (props) => {
  // console.log("check props path: ", props);
  const [idPT] = useState("1");
  const [detailStaff, setDetailStaff] = useState();
  useEffect(() => {
    handleGetDetailStaff(props?.data?.StaffId)
      .then((res) => {
        if (res.staffDetail) {
          setDetailStaff(res.staffDetail);
        }
      })
      .catch((error) => console.log(error));
  }, [props?.data?.StaffId]);
  return (
    <>
      <Link to={`/pt-detail/${idPT}`} className="staffContainer">
        <div className="avatar">
          <img
            src={detailStaff?.StaffImage ? detailStaff?.StaffImage : avaPT}
          />
        </div>
        <div className="staffText">{detailStaff?.StaffName}</div>

        {/* <div className="staffText">{detailStaff?.StaffName}</div> */}
      </Link>
    </>
  );
};
export default StaffRenderer;
