import React, { useState } from "react";
import "antd/dist/antd.css";
import "./admin.scss";
import { useNavigate } from "react-router-dom";
import avatar from "../../assets/images/logo/logoGHGym.png";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  RightCircleOutlined,
  UserSwitchOutline,
  AppstoreOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { Badge, Button, Dropdown, Layout, Menu } from "antd";
import {
  BellRinging,
  Books,
  Buildings,
  Coins,
  Gear,
  GearSix,
  MapPinLine,
  Repeat,
  SignOut,
  Translate,
  User,
  UserCircle,
  UsersFour,
  UsersThree,
  UserSwitch,
} from "phosphor-react";
import DashboardAdmin from "./Dashboard";
import { Link, NavLink, Outlet, Route, Router, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguageApp } from "../../store/actions";
import { LANGUAGES } from "../../utils/constant";
import { FormattedMessage } from "react-intl";
import flagVie from "../../assets/images/region/vietnam.png";
import flagEng from "../../assets/images/region/united-states.png";

const { Header, Sider, Content } = Layout;
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const menu = (
  <Menu
    items={[
      {
        key: "1",
        icon: <User size={20} color="#171717" weight="fill" />,
        label: <NavLink to="/admin/reservation">Profile</NavLink>,
      },
      {
        key: "2",
        icon: <Repeat size={20} color="#171717" weight="fill" />,
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.aliyun.com"
          >
            Reset Password
          </a>
        ),
      },
      {
        key: "3",
        icon: <SignOut size={20} color="#1d1b1b" weight="fill" />,
        label: (
          <NavLink
            // target="_blank"

            to="/admin/customer-total"
          >
            Logout
          </NavLink>
        ),
      },
    ]}
  />
);
const AdminPage = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const language = useSelector((state) => state.app.language);
  const handleChangeListStaffs = () => {
    navigate("/admin/manage-staffs");
  };
  const handleChangeCenter = () => {
    navigate("/admin/manage-center");
  };
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <NavLink to="" exact={true}>
          <div className="logo" />
        </NavLink>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          itemIcon={<RightCircleOutlined />}
          items={[
            getItem(
              <FormattedMessage id="admin.manage-gym.manage-center" />,
              "sub1",
              <Buildings size={20} color="#f4f1f1" weight="fill" />,
              [
                {
                  label: "Centers",
                  key: "sub21",
                  icon: <Buildings size={20} color="#f4f1f1" weight="fill" />,
                  children: [
                    {
                      label: "Quận 8",
                      key: "21",
                      icon: (
                        <MapPinLine size={20} color="#eeeee7" weight="fill" />
                      ),
                      onClick: handleChangeCenter,
                    },
                    {
                      label: "Quận 1",
                      key: "22",
                      icon: (
                        <MapPinLine size={20} color="#eeeee7" weight="fill" />
                      ),
                    },
                    {
                      label: "Quận Bình Tân",
                      key: "23",
                      icon: (
                        <MapPinLine size={20} color="#eeeee7" weight="fill" />
                      ),
                    },
                    {
                      label: "Quận 10",
                      key: "24",
                      icon: (
                        <MapPinLine size={20} color="#eeeee7" weight="fill" />
                      ),
                    },
                  ],
                },
                // getItem(
                //   <FormattedMessage id="admin.manage-gym.staff" />,
                //   "sub2",
                //   <UsersThree size={20} color="#f4f1f1" weight="fill" />,
                //   [
                //     {
                //       label: (
                //         <FormattedMessage id="admin.manage-gym.list-of-staff" />
                //       ),
                //       key: "1",
                //       onClick: handleChangeListStaffs,
                //     },
                //     getItem(
                //       <FormattedMessage id="admin.manage-gym.create-staff" />,
                //       "2"
                //     ),
                //     getItem(
                //       <FormattedMessage id="admin.manage-gym.update-staff" />,
                //       "3"
                //     ),
                //   ]
                // ),
                // getItem(
                //   <FormattedMessage id="admin.manage-gym.customer" />,
                //   "sub3",
                //   <UsersFour size={20} color="#f4f1f1" weight="fill" />,
                //   [
                //     getItem(
                //       <FormattedMessage id="admin.manage-gym.list-of-cus" />,
                //       "4"
                //     ),
                //   ]
                // ),
                // getItem(
                //   <FormattedMessage id="admin.manage-gym.revenue" />,
                //   "sub4",
                //   <Coins size={20} color="#f4f1f1" weight="fill" />,
                //   [
                //     getItem(
                //       <FormattedMessage id="admin.manage-gym.list-of-revenue" />,
                //       "5"
                //     ),
                //   ]
                // ),
                getItem(
                  "Blog",
                  "sub5",
                  <Books size={20} color="#f4f1f1" weight="fill" />,
                  [
                    getItem(
                      <FormattedMessage id="admin.manage-gym.list-of-blog" />,
                      "6"
                    ),
                    getItem(
                      <FormattedMessage id="admin.manage-gym.create-blog" />,
                      "7"
                    ),
                    getItem(
                      <FormattedMessage id="admin.manage-gym.update-blog" />,
                      "8"
                    ),
                  ]
                ),
              ]
            ),
            getItem(
              <FormattedMessage id="admin.manage-gym.manage-account" />,
              "sub6",
              <UserCircle size={20} color="#f4f1f1" weight="fill" />,
              [
                getItem("Xem danh sách tài khoản", "8"),
                getItem("Tạo tài khoản", "10"),
                getItem("Cập nhật tài khoản", "11"),
              ]
            ),
            {
              key: "12",
              // icon: <BellRinging size={20} color="#f4f1f1" weight="fill" />,
              icon: <GearSix size={20} color="#f5f5f5" weight="fill" />,
              label: <FormattedMessage id="admin.manage-gym.setting" />,
            },
            getItem(
              <FormattedMessage id="admin.manage-gym.languages" />,
              "sub7",
              <Translate size={20} color="#f4f1f1" weight="fill" />,
              [
                {
                  label: "Tiếng Việt",
                  key: "13",
                  onClick: () => {
                    dispatch(changeLanguageApp(LANGUAGES.VI));
                  },
                },
                {
                  label: "English",
                  key: "14",
                  onClick: () => {
                    dispatch(changeLanguageApp(LANGUAGES.EN));
                  },
                },
              ]
            ),
          ]}
        />
      </Sider>
      <Layout className="sitelayout">
        <Header
          className="sitelayoutbackground"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <span>
            {language === LANGUAGES.VI ? (
              <img
                src={flagVie}
                style={{ width: "40px", height: "40px", borderRadius: "6px" }}
              />
            ) : (
              <img
                src={flagEng}
                style={{ width: "40px", height: "40px", borderRadius: "6px" }}
              />
            )}
          </span>
          <span className="notificationAdmin">
            <Badge style={{ zIndex: "9999" }} count={2} size="default">
              <BellRinging size={26} color="#ffea00" weight="fill" />
            </Badge>
          </span>
          <span className="infoUser">
            <img
              src={avatar}
              style={{ width: "80px", height: "80px", borderRadius: "100px" }}
            />
            <span>Duong Truong Giang</span> &nbsp;
            <Dropdown overlay={menu} placement={"bottomLeft"} arrow>
              <Button
                style={{ outline: "none", border: "none" }}
                icon={
                  <Gear
                    size={20}
                    color="#c0c0c0"
                    weight="fill"
                    style={{ marginBottom: "8px" }}
                  />
                }
              ></Button>
            </Dropdown>
          </span>
        </Header>
        <Content
          className="sitelayoutbackground"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            maxHeight: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPage;
