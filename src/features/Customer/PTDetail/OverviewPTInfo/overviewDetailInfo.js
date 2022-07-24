import React from "react";
import "./overviewDetail.scss";
import { FormattedMessage } from "react-intl";
const OverviewDetail = (props) => {
  console.log(props.data?.Description.split(" - "))
  return (
    <div className="overViewPT">
      <div className="infoDetail">
        <div className="detailPTTitle">
          <h2><FormattedMessage id="pt-detail.pt" />: {props.data?.StaffName}</h2>
        </div>
        <div className="detailPTContent">
          <ul>
            <li>Huấn luyện viên thể hình phòng tập thuộc hệ thống GH Gym TP. HCM. Huấn luyện viên {props.data?.StaffName} có hơn
              kinh nghiệm trong việc huấn luyện thể chất, cải thiện vóc dáng và nâng cao sức khỏe ở
              mọi độ tuổi.</li></ul>
          <h2><FormattedMessage id="pt-detail.introduce" /> :</h2>
          <div className="description" >
            {props.data?.Description.replace("-", "<br>")}
          </div>
        </div>
      </div>
    </div>
  );
};
export default OverviewDetail;
