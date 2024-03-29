import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import "./ptSchedule.scss";
import moment from "moment";
import { LANGUAGES } from "../../../../utils/constant";
import { useSelector } from "react-redux";
import { Select } from "antd";

const PTShedule = () => {
  const language = useSelector((state) => state.app.language);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const getArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Hôm nay - ${ddMM}`;
          object.label = today;
        } else {
          let labelVi = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
          object.label = capitalizeFirstLetter(labelVi); // In hoa ký tự đầu tiên //
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Today - ${ddMM}`;
          object.label = today;
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("dddd - DD/MM");
        }
      }

      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();

      allDays.push(object);
    }

    return allDays;
  };
  const [allDays, setAllDays] = useState([]);
  console.log(language);

  useEffect(() => {
    const arrDay = getArrDays(language);
    setAllDays(arrDay);
  }, []);
  return (
    <>
      <div className="doctor-schedule-container">
        <div className="all-schedule">
          <select>
            {allDays && allDays.length > 0
              ? allDays.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  );
                })
              : ""}
          </select>
        </div>
        {/* In thời gian  */}
        <div className="all-available-time">
          <div className="text-calendar">
            <i className="fas fa-calendar-alt">
              <span>
                <FormattedMessage id="patient.detail-doctor.schedule" />
              </span>
            </i>
          </div>
          <div className="time-content">
            <>
              <div className="time-content-btns">
                <button className={"btn-vie"}>{"timeDisplay"}</button>
                <button className={"btn-vie"}>{"timeDisplay"}</button>
                <button className={"btn-vie"}>{"timeDisplay"}</button>
                <button className={"btn-vie"}>{"timeDisplay"}</button>
                <button className={"btn-vie"}>{"timeDisplay"}</button>
                <button className={"btn-vie"}>{"timeDisplay"}</button>
              </div>

              <div className="book-free">
                <span>
                  <FormattedMessage id="patient.detail-doctor.choose" />
                  <i className="far fa-hand-point-up"></i>
                  <FormattedMessage id="patient.detail-doctor.Book-free" />
                </span>
              </div>
            </>
            {/* {allAvalableTime && allAvalableTime.length > 0 ? (

            ) : (
              <div className="no-schedule">
                <FormattedMessage id="patient.detail-doctor.no-schedule" />
              </div>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};
export default PTShedule;
