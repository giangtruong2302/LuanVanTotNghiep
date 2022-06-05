import React, { useState } from "react";
import "./PTSchedulePayment.scss";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { LANGUAGES } from "../../../../utils/constant";

const PTSchedulePayment = () => {
  const language = useSelector((state) => state.app.language);
  const [isShowDetailInfor, setIsShowDetailInfo] = useState(false);

  return (
    <div className="doctor-extra-infor-container">
      <div className="content-up">
        <div className="text-address">
          <FormattedMessage id="patient.extra-infor-doctor.text-address" />
        </div>
        <div className="name-clinic">{"Chi nhánh GH Gym Quận 8"}</div>
        <div className="detail-address">{"180 Cao lỗ p5 quận 8"}</div>
      </div>
      <div className="content-down">
        {isShowDetailInfor === false ? (
          <div className="short-infor">
            <FormattedMessage id="patient.extra-infor-doctor.price" />
            {language === LANGUAGES.VI && (
              <NumberFormat
                className="currency"
                value={"3000"}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"VNĐ"}
              />
            )}

            {language === LANGUAGES.EN && (
              <NumberFormat
                className="currency"
                value={"3000"}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"$"}
              />
            )}
            <span onClick={() => setIsShowDetailInfo(true)} className="detail">
              <FormattedMessage id="patient.extra-infor-doctor.detail" />
            </span>
          </div>
        ) : (
          <>
            <div className="title-price">
              <FormattedMessage id="patient.extra-infor-doctor.price" />
            </div>
            <div className="detail-infor">
              <div className="price">
                <span className="left">
                  <FormattedMessage id="patient.extra-infor-doctor.price" />
                </span>
                <span className="right">
                  <NumberFormat
                    className="currency"
                    value={"1000"}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"VNĐ"}
                  />
                  {/* {language === LANGUAGES.VI && (

                )} */}

                  {/* {language === LANGUAGES.EN && (
                  <NumberFormat
                    className="currency"
                    value={"2000"}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"$"}
                  />
                )} */}
                </span>
              </div>
              <div className="note">{"extraInfor.note"}</div>
            </div>
            <div className="payment">
              <FormattedMessage id="patient.extra-infor-doctor.payment" />
              {"extraInfor.paymentTypeData.valueVi"}
              {/* {language === LANGUAGES.VI
              ? "extraInfor.paymentTypeData.valueVi"
              : ""}

            {language === LANGUAGES.EN
              ? "extraInfor.paymentTypeData.valueEn"
              : ""} */}
            </div>
            <div className="hide-price">
              <span onClick={() => setIsShowDetailInfo(false)}>
                <FormattedMessage id="patient.extra-infor-doctor.hide-price" />
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default PTSchedulePayment;
