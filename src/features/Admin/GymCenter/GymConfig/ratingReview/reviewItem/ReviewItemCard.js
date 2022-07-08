import { Rate } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import React, { ChangeEvent, useRef } from "react";
import human from "../../../../../../assets/images/ratingandreview/image 47.png";
import "./ReviewItem.scss";

const ReviewItemCard = (props) => {
  return (
    <div className="reviewItemContainer">
      <div className="reviewItem">
        <div className="customerInfo">
          <div className="reviewLeft">
            <div className="image">
              <img src={human} alt="" />
            </div>
            <div className="infor">
              <div className="name">{props.reviewItem.CustomerId}</div>
              <div className="date">
                {moment(new Date("02/23/2000")).format("MM/DD/YYYY")}
              </div>
              <div className="rating">
                <Rate
                  allowHalf
                  defaultValue={
                    props.reviewItem.ratingPoint
                      ? props.reviewItem.ratingPoint
                      : 5
                  }
                />{" "}
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
        <div className="reviewInfo">{props.reviewItem.reviewContent}</div>
      </div>
    </div>
  );
};
export default ReviewItemCard;
