import React, { useEffect, useState } from "react";
import "./settingAccount.scss";
import ava from "../../../assets/images/imgStaff/dyno.jpg";
import lineIcon from "../../../assets/images/Line 38.svg";
import {
  Briefcase,
  DotsThreeCircleVertical,
  Gift,
  Info,
  MapPin,
  Smiley,
  UserCircle,
} from "phosphor-react";
import ChangeAvatar from "./Modal/modalUpdateAvatar";
import ChangeDetail from "./Modal/modalUpdateDetail";
import ChangePassword from "./Modal/modalChangePassword";
import { useSelector } from "react-redux";
import { handleGetInfoManager } from "./SettingAccountAPI";

const SettingAccountForAdmin = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [infoDetail, setInfoDetail] = useState();
  const [status, setStatus] = useState("");
  // console.log("check user info: ", userInfo);
  const [showModal, setShowModal] = useState(false);
  const handleModal = (isVisible) => {
    setShowModal(isVisible);
  };
  const [showModalDetail, setShowModalDetail] = useState(false);
  const handleModalDetail = (isVisible) => {
    setShowModalDetail(isVisible);
  };
  const [showModalPassword, setShowModalPassword] = useState(false);
  const handleModalPassword = (isVisible) => {
    setShowModalPassword(isVisible);
  };
  // console.log("check user info: ", userInfo.AccountManager.ManagerName);
  // const image = userInfo["AccountManager.Imange"]
  //   ? userInfo["AccountManager.ManagerName"]
  //   : "";
  // console.log("check image: ", image);
  const takeStatus = (value) => {
    setStatus(value);
  };
  useEffect(() => {
    handleGetInfoManager(userInfo.ExternalId ? userInfo.ExternalId : -1)
      .then((res) => {
        if (res) {
          // console.log("check res info: ", res.managerDetail);
          setInfoDetail(res.managerDetail);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userInfo, status]);
  return (
    <>
      <div className="settingAccountBg">
        <div className="settingAccountContainer">
          <div className="detailContainer">
            <div className="detailTop">
              <div className="topInfo">
                <div className="topInfoImg">
                  <img
                    src={infoDetail ? infoDetail.ManagerImage : ava}
                    alt=""
                  />
                </div>
                <div className="topInfoContent">
                  <div className={"topInforName"}>
                    {infoDetail && infoDetail.ManagerName
                      ? infoDetail.ManagerName
                      : "N/A"}
                  </div>
                  <div className={"topInforEmail"}>
                    {infoDetail && infoDetail.ManagerEmail
                      ? infoDetail.ManagerEmail
                      : "N/A"}
                  </div>
                </div>
              </div>
              <div className="topUpdate">
                <div
                  className={"topUpdatedItem"}
                  onClick={() => setShowModal(true)}
                >
                  <DotsThreeCircleVertical
                    size={14}
                    color="#121212"
                    weight="bold"
                  />
                  <div className={"updatedName"}>Upload Avatar</div>
                </div>
                <div className={"topUpdatedItem"}>
                  <img src={lineIcon} alt="" />
                </div>
                <div
                  className={"topUpdatedItem"}
                  onClick={() => setShowModalDetail(true)}
                >
                  <DotsThreeCircleVertical
                    size={14}
                    color="#121212"
                    weight="bold"
                  />
                  <div className={"updatedName"}>Edit Profile</div>
                </div>
                <div className={"topUpdatedItem"}>
                  <img src={lineIcon} alt="" />
                </div>
                <div
                  className={"topUpdatedItem"}
                  onClick={() => setShowModalPassword(true)}
                >
                  <DotsThreeCircleVertical
                    size={14}
                    color="#121212"
                    weight="bold"
                  />
                  <div className={"updatedName"}>Change Password</div>
                </div>
              </div>
            </div>
            <div className="detailBottomContainer">
              <div className={"detailBottom"}>
                <div className={`${"bottomItem"} ${"bottomMain"}`}>
                  <Info size={14} color="#121212" weight="bold" />
                  <div className={"bottomItemName"}>About Me</div>
                </div>
                <div className={"bottomItem"}>
                  <Gift size={15} color="#121212" weight="bold" />
                  <div className={"bottomItemName"}>
                    Date of birth:{" "}
                    {/* {userInfo["AccountManager.DayOfBirth"]
                      ? userInfo["AccountManager.DayOfBirth"]
                      : "N/A"} */}
                  </div>
                </div>
                <div className={"bottomItem"}>
                  <Smiley size={15} color="#121212" weight="bold" />
                  <div className={"bottomItemName"}>
                    Gender:{" "}
                    {infoDetail && infoDetail.Gender === true
                      ? "Male"
                      : "Female"}
                  </div>
                </div>
                <div className={"bottomItem"}>
                  <UserCircle size={15} color="#121212" weight="bold" />
                  <div className={"bottomItemName"}>
                    Account Type:{" "}
                    {infoDetail && infoDetail.RoleId === 1 && "Admin"}{" "}
                    {infoDetail && infoDetail.RoleId === 2 && "Manager"}{" "}
                    {infoDetail &&
                      infoDetail.RoleId === 3 &&
                      "Personal Trainer"}{" "}
                    {infoDetail && infoDetail.RoleId === 4 && "Lễ tân"}{" "}
                    {infoDetail && infoDetail.RoleId === 5 && "Customer"}
                  </div>
                </div>
                <div className={"bottomItem"}>
                  <Briefcase size={15} color="#121212" weight="bold" />
                  <div className={"bottomItemName"}>
                    Working Salon:{" "}
                    {infoDetail &&
                      infoDetail.CenterId === 0 &&
                      "Quản lý hệ thống "}{" "}
                    {infoDetail &&
                      infoDetail.CenterId === 1 &&
                      "Quản lý hệ thống Phạm Ngũ Lão "}{" "}
                    {infoDetail &&
                      infoDetail.CenterId === 2 &&
                      "Quản lý hệ thống Lý Thường Kiệt "}
                  </div>
                </div>
                <div className={"bottomItem"}>
                  <MapPin size={15} color="#121212" weight="bold" />
                  <div className={"bottomItemName"}>
                    Address:{" "}
                    {infoDetail && infoDetail.ManagerAddress
                      ? infoDetail.ManagerAddress
                      : "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <ChangeAvatar
          handleModal={handleModal}
          showModal={showModal}
          data={infoDetail}
          takeStatus={takeStatus}
          avatar={infoDetail.ManagerImage ? infoDetail.ManagerImage : ava}
        />
      )}
      {showModalDetail && (
        <ChangeDetail
          handleModal={handleModalDetail}
          showModal={showModalDetail}
          data={infoDetail}
          takeStatus={takeStatus}
        />
      )}
      {showModalPassword && (
        <ChangePassword
          handleModal={handleModalPassword}
          showModal={showModalPassword}
          data={infoDetail}
        />
      )}
    </>
  );
};
export default SettingAccountForAdmin;
