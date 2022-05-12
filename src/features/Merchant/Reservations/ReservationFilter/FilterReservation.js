import { Checkbox, Form as FormAnt, Input } from "antd";
import { Field, FieldProps, Form, Formik } from "formik";
import React, { useState } from "react";
import "./FilterReservation.scss";
const FilterByDay = ["Today", "All"];
const FilterReservation = () => {
  const [activeFilterDay, setActiveFilterDay] = useState(0);
  const handleFilterByDay = (index) => {
    setActiveFilterDay(index);
  };
  return (
    <div className="reservationFilterContainer">
      <div className="filterTitle">Reservation</div>
      {FilterByDay.map((item, index) => {
        return (
          <div
            key={index}
            className={`${"filterDay"} ${
              index === activeFilterDay ? "activeDay" : ""
            }`}
            onClick={() => {
              handleFilterByDay(index);
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};
export default FilterReservation;
