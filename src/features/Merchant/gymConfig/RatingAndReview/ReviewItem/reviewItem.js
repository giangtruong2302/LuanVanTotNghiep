import { message, Rate } from "antd";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";
import timezone from "moment-timezone";
import React, { ChangeEvent, useRef } from "react";
// import { checkDateTypeItem, checkTypeItem } from "utils/checkTypeItem";
import human from "../../../../../../assets/images/ratingandreview/image 47.png";
// import human from "../../../../assets/images/ratingandreview/image 47.png";
// import { doShowHideReview } from "../ratingAndReviewAPI";
// import { RatingAndReviewType } from "../ratingAndReviewModel";
import classes from "./styles.module.scss";

const ReviewItem = (props) => {
  const currentTimezone = useSelector(
    (state) => state.currentSalon.data.timezone
  );

  const checkboxRef = useRef < HTMLLabelElement > null;
  const onChangeLabel = () => {
    checkboxRef.current?.classList.toggle(classes.hide);
    // doShowHideReview(props.salonId, props.reviewItem.id)
    //   .then(() => {
    //     message.success("Success");
    //   })
    //   .catch(() => {
    //     message.error("Failure");
    //   });
  };
  const onChangeHanlde = (_e) => {
    // console.log(e.target.value);
  };
  return (
    <div className={classes.reviewItemContainer}>
      <div className={classes.reviewItem}>
        <div className={classes.customerInfo}>
          <div className={classes.reviewLeft}>
            <div className={classes.image}>
              <img
                src={props.reviewItem.avatar ? props.reviewItem.avatar : human}
                alt=""
              />
            </div>
            <div className={classes.infor}>
              <div className={classes.name}>{"props.reviewItem.name"}</div>
              <div className={classes.date}>
                {/* {moment(props.reviewItem.ratingDate).format("MM/DD/YYYY")} */}
                {timezone
                  .utc("23/09/2022" || "")
                  .tz(currentTimezone || "")
                  .format("YYYY/MM/DD")}
              </div>
              <div className={classes.rating}>
                <Rate
                  allowHalf
                  disabled
                  defaultValue={props.reviewItem.ratingPoint}
                />{" "}
                {props.reviewItem.ratingPoint}.0
              </div>
            </div>
          </div>
          <div className={classes.reviewRight}>
            <label
              className={`${classes.checkbox} ${
                props.reviewItem.isActive ? "" : classes.hide
              }`}
              ref={checkboxRef}
              onChange={onChangeLabel}
              style={{ cursor: "pointer" }}
            >
              <input
                type="checkbox"
                value={"hello"}
                onChange={onChangeHanlde}
              />
              <span className={classes.checkboxText}>
                <span className={classes.checkboxOn}>Show</span>
                <span className={classes.checkboxOff}>Hide</span>
              </span>
            </label>
          </div>
        </div>
        <div className={classes.reviewInfo}>{"props.reviewItem.content"}</div>
      </div>
    </div>
  );
};

export default ReviewItem;
