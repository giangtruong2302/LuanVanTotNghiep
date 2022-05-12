import { Rate } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import React, { ChangeEvent, useRef } from "react";
import human from "../../../../../assets/images/ratingandreview/image 47.png";
import "./ReviewItem.scss";

const ReviewItemCard = () => {
  return (
    <div className="reviewItemContainer">
      <div className="reviewItem">
        <div className="customerInfo">
          <div className="reviewLeft">
            <div className="image">
              <img src={human} alt="" />
            </div>
            <div className="infor">
              <div className="name">{"props.reviewItem.name"}</div>
              <div className="date">
                {moment(new Date("02/23/2000")).format("MM/DD/YYYY")}
              </div>
              <div className="rating">
                <Rate allowHalf defaultValue={"props.reviewItem.ratingPoint"} />{" "}
                {"9"}.0
              </div>
            </div>
          </div>
          <div className="reviewRight">
            <label
              className={`${"checkbox"}`}
              //ref={checkboxRef}
              //onChange={onChangeLabel}
            >
              <input
                type="checkbox"
                value={"hello"}
                //onChange={onChangeHanlde}
              />
              <span className="checkboxText">
                <span className="checkboxOn">Show</span>
                <span className="checkboxOff">Hide</span>
              </span>
            </label>
          </div>
        </div>
        <div className="reviewInfo">
          {
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt eget eu porttitor aenean. Tellus ac elementum in amet ultrices quis malesuada malesuada volutpat. Massa, sapien lacus, ultricies magna dictum pharetra, sagittis. Mi, tempus ornare dis magna arcu. Sapien enim, urna amet, risus at urna pretium non volutpat. Aenean turpis elit ipsum id leo eu nam nulla. Eget purus et, aliquam nunc.Natoque congue iaculis at mauris, velit duis fames mi tempor. Pulvinar feugiat morbi urna gravida feugiat ante fringilla. Sed risus lectus purus neque tincidunt tortorLorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt eget eu porttitor aenean. Tellus ac elementum in amet ultrices quis malesuada malesuada volutpat. Massa, sapien lacus, ultricies magna dictum pharetra, sagittis. Mi, tempus ornare dis magna arcu.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt eget eu porttitor aenean. Tellus ac elementum in amet ultrices quis malesuada malesuada volutpat. Massa, sapien lacus, ultricies magna dictum pharetra, sagittis. Mi, tempus ornare dis magna arcu. Sapien enim, urna amet, risus at urna pretium non volutpat. Aenean turpis elit ipsum id leo eu nam nulla. "
          }
        </div>
      </div>
    </div>
  );
};
export default ReviewItemCard;
