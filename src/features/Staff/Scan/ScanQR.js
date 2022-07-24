import "./ScanQR.scss";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { ArrowLeft } from "phosphor-react";
import { NavLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import {
  handleCheckTimeOfCustomer,
  handleGetDetailBookingByStaffId,
  handleGetDetailStaff,
} from "../staffAPI";
import { message } from "antd";
const ScanQR = () => {
  const dataStaffId = localStorage.getItem("StaffId");
  const [data, setData] = useState("No result");
  const [dataStaffDetail, setDataStaffDetail] = useState();
  const [dataBookingDetail, setDataBookingDetail] = useState();
  const [splitData, setSplitData] = useState();
  const dataScan = data.split(",");
  const dataTime = dataScan[dataScan.length - 1];
  const dataStatus = dataScan[dataScan.length - 2];
  const dataPrice = dataScan[dataScan.length - 3];
  const dataCusId = dataScan[dataScan.length - 4];
  const dataId = dataScan[dataScan.length - 5];
  const handleCheckTime = () => {
    try {
      if (data) {
        console.log("check data scan: ", data, dataStaffId);
        if (dataStaffId) {
          handleGetDetailStaff(dataStaffId)
            .then((res) => {
              setDataStaffDetail(res.staffDetail);
              if (res.staffDetail.id) {
                handleGetDetailBookingByStaffId(res.staffDetail.id)
                  .then((res) => {
                    setDataBookingDetail(res.bookingDetail);
                    if (res.bookingDetail) {
                      handleCheckTimeOfCustomer(
                        res.bookingDetail.ServiceId,
                        res.bookingDetail.CustomerId,
                        res.bookingDetail.StaffId,
                        Date.now()
                      ).then((res) => {
                        message.success("Điểm danh thành công");
                      });
                    }
                  })
                  .catch((error) => console.log(error));
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="ScanPage">
      <div className="backToHome">
        <NavLink to="/staff-personal-page" className="backtoHome">
          <ArrowLeft size={24} color="#ffffff" weight="duotone" />
          <div className="textBackToHome"><FormattedMessage id="header.back-to-home" /></div>
        </NavLink>
      </div>
      <div className="scanContain">
        <h3><FormattedMessage id="staff-page.webcam" /></h3>
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
              console.log(result);
            }

            if (!!error) {
              console.info(error);
            }
          }}
          style={{ width: "100px" }}
        />
        <p className="resultScan"><FormattedMessage id="staff-page.result" /> : {data}</p>
        <div className="dataScan">
          <a style={{ fontWeight: "450" }}>id : </a>
          {dataId}
        </div>
        <div className="dataScan">
          <a style={{ fontWeight: "450" }}><FormattedMessage id="staff-page.cusId" /> : </a>
          {dataCusId}
        </div>
        <div className="dataScan">
          <a style={{ fontWeight: "450" }}><FormattedMessage id="staff-page.price" /> :</a> {dataPrice}
        </div>
        <div className="dataScan">
          <a style={{ fontWeight: "450" }}><FormattedMessage id="staff-page.status" /> :</a>
          <a style={{ color: "green" }}> {dataStatus}</a>
        </div>
        <div className="dataScan">
          <a style={{ fontWeight: "450" }}><FormattedMessage id="staff-page.time" /> : </a>
          {dataTime}
        </div>
        {data && (
          <button className="btn-checkTime" onClick={handleCheckTime}>
            <FormattedMessage id="staff-page.attendance" />
          </button>
        )}
      </div>
    </div>
  );
};
export default ScanQR;
