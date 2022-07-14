import { message, Rate } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import React, { ChangeEvent, useEffect, useRef } from "react";
import { useState } from "react";
import human from "../../../../../../assets/images/ratingandreview/image 47.png";
import { handleGetDetailCustomer } from "../../../Customers/CustomerDetail/CusDetailAPI";
import { handleHideReview } from "../reviewAPI";
import "./ReviewItem.scss";

const ReviewItemCard = (props) => {
  const checkboxRef = useRef();
  const [detailCustomer, setDetailCustomer] = useState();
  const onChangeLabel = () => {
    checkboxRef.current?.classList.toggle("hide");
    const Status = props.reviewItem.Status === 0 ? 1 : 0;
    handleHideReview(props.reviewItem.id, Status)
      .then((res) => {
        message.success(res.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (props.reviewItem.Status === 0) {
      checkboxRef.current?.classList.toggle("hide");
    }
    handleGetDetailCustomer(props.reviewItem.CustomerId)
      .then((res) => {
        setDetailCustomer(res.cusDetail);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props]);
  return (
    <div className="reviewItemContainer">
      <div className="reviewItem">
        <div className="customerInfo">
          <div className="reviewLeft">
            <div className="image">
              <img
                src={
                  detailCustomer && detailCustomer?.CustomerImage
                    ? detailCustomer?.CustomerImage
                    : human
                }
                alt=""
              />
            </div>
            <div className="infor">
              <div className="name">
                {detailCustomer?.CustomerName
                  ? detailCustomer?.CustomerName
                  : ""}
              </div>
              <div className="date">
                {moment(props.reviewItem.createdAt).format("DD/MM/YYYY")}
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
              ref={checkboxRef}
              onChange={onChangeLabel}
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
