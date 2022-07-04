import React, { useState } from "react";
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

const SettingAccountForAdmin = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  console.log("check user info: ", userInfo["AccountManager.ManagerName"]);
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
  return (
    <>
      <div className="settingAccountBg">
        <div className="settingAccountContainer">
          <div className="detailContainer">
            <div className="detailTop">
              <div className="topInfo">
                <div className="topInfoImg">
                  <img src={ava} alt="" />
                </div>
                <div className="topInfoContent">
                  <div className={"topInforName"}>
                    {userInfo && userInfo["AccountManager.ManagerName"]
                      ? userInfo["AccountManager.ManagerName"]
                      : "N/A"}
                  </div>
                  <div className={"topInforEmail"}>
                    {userInfo["AccountManager.ManagerEmail"]
                      ? userInfo["AccountManager.ManagerEmail"]
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
                    {userInfo["AccountManager.DayOfBirth"]
                      ? userInfo["AccountManager.DayOfBirth"]
                      : "N/A"}
                  </div>
                </div>
                <div className={"bottomItem"}>
                  <Smiley size={15} color="#121212" weight="bold" />
                  <div className={"bottomItemName"}>
                    Gender:{" "}
                    {userInfo["AccountManager.Gender"] === true
                      ? "Male"
                      : "Female"}
                  </div>
                </div>
                <div className={"bottomItem"}>
                  <UserCircle size={15} color="#121212" weight="bold" />
                  <div className={"bottomItemName"}>
                    Account Type:{" "}
                    {userInfo["AccountManager.RoleId"] === 1 && "Admin"}{" "}
                    {userInfo["AccountManager.RoleId"] === 2 && "Manager"}{" "}
                    {userInfo["AccountManager.RoleId"] === 3 &&
                      "Personal Trainer"}{" "}
                    {userInfo["AccountManager.RoleId"] === 4 && "Lễ tân"}{" "}
                    {userInfo["AccountManager.RoleId"] === 5 && "Customer"}
                  </div>
                </div>
                <div className={"bottomItem"}>
                  <Briefcase size={15} color="#121212" weight="bold" />
                  <div className={"bottomItemName"}>
                    Working Salon:{" "}
                    {userInfo["AccountManager.CenterId"] === 0 &&
                      "Quản lý hệ thống "}{" "}
                    {userInfo["AccountManager.CenterId"] === 1 &&
                      "Quản lý hệ thống Phạm Ngũ Lão "}{" "}
                    {userInfo["AccountManager.CenterId"] === 2 &&
                      "Quản lý hệ thống Lý Thường Kiệt "}
                  </div>
                </div>
                <div className={"bottomItem"}>
                  <MapPin size={15} color="#121212" weight="bold" />
                  <div className={"bottomItemName"}>
                    Address:{" "}
                    {userInfo["AccountManager.ManagerAddress"]
                      ? userInfo["AccountManager.ManagerAddress"]
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
          avatar={ava}
        />
      )}
      {showModalDetail && (
        <ChangeDetail
          handleModal={handleModalDetail}
          showModal={showModalDetail}
        />
      )}
      {showModalPassword && (
        <ChangePassword
          handleModal={handleModalPassword}
          showModal={showModalPassword}
        />
      )}
    </>
  );
};
export default SettingAccountForAdmin;
