import {
  Phone,
  EnvelopeSimple,
  MapPinLine,
  CoinVertical,
} from "phosphor-react";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getDetailSalary } from "../../StaffAPI";
import "./customizeListPT.scss";

const SalaryRateRenderer = (props) => {
  const [salaryRate, setSalaryRate] = useState();
  useEffect(() => {
    getDetailSalary(props.data.SalaryId)
      .then((res) => {
        if (res.salary) {
          setSalaryRate(res.salary);
        }
      })
      .catch((error) => {});
  }, []);
  return (
    <>
      <div className="phoneContainer">
        <div className="phoneText">{salaryRate?.Salary}</div>
        <CoinVertical color="#0a0700" weight="light" />
      </div>
    </>
  );
};
export default SalaryRateRenderer;
