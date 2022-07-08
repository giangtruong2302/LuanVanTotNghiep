import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "./admin.scss";
import { useNavigate } from "react-router-dom";
import * as actions from "../../store/actions";
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
  ClockClockwise,
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
  Planet,
  CalendarCheck,
  Book,
} from "phosphor-react";
import DashboardAdmin from "./Dashboard";
import { Link, NavLink, Outlet, Route, Router, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguageApp } from "../../store/actions";
import { LANGUAGES } from "../../utils/constant";
import { FormattedMessage } from "react-intl";
import flagVie from "../../assets/images/region/vietnam.png";
import flagEng from "../../assets/images/region/united-states.png";
import { getAllCenter } from "./AdminAPI";

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

const AdminPage = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  const navigate = useNavigate();
  const roleId = useSelector((state) => state.user.userInfo.roleId);
  console.log("check role: ", roleId);
  const [collapsed, setCollapsed] = useState(false);
  const [center, setCenter] = useState([]);
  const dispatch = useDispatch();
  const language = useSelector((state) => state.app.language);
  const handleChangeListStaffs = () => {
    navigate("/admin/manage-staffs");
  };
  const handleChangeCenter = (CenterId, CenterName) => {
    navigate(`/admin/manage-center`);
    localStorage.setItem("CenterId", CenterId.toString());
    console.log("check center id after change: ", CenterId);
  };
  const handleLogout = () => {
    dispatch(dispatch(actions.processLogout()));
    navigate("/admin-login");
  };
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
          label: "Logout",
          onClick: handleLogout,
        },
      ]}
    />
  );
  const handleSettingAccount = () => {
    navigate("/admin/setting-account");
  };
  useEffect(() => {
    try {
      getAllCenter(1).then((res) => {
        console.log("check res: ", res.centers);
        if (res && res.centers.rows.length > 0) {
          setCenter(res.centers.rows);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log("check center: ", center);
  const handleViewListAccount = () => {
    navigate("/admin/view-list-account");
  };
  const handleViewListService = () => {
    navigate("/admin/view-list-service");
  };
  const handleViewListManager = () => {
    navigate("/admin/view-list-manager");
  };
  const handleViewListSchedule = () => {
    navigate("/admin/view-list-schedule-working");
  };
  const handleViewListBlog = () => {
    navigate("/admin/view-list-blog");
  };
  return (
    <Layout style={{ height: "100vh" }} className="bgAdmin">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <NavLink to="" exact={true}>
          <div className="logo" />
        </NavLink>
        {roleId && roleId === 1 && (
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            itemIcon={<RightCircleOutlined />}
            // items={[
            //   getItem(
            //     <FormattedMessage id="admin.manage-gym.manage-center" />,
            //     "sub1",
            //     <Buildings size={20} color="#f4f1f1" weight="fill" />,
            //     [
            //       {
            //         label: "Centers",
            //         key: "sub21",
            //         icon: <Buildings size={20} color="#f4f1f1" weight="fill" />,
            //         children: [
            //           center && center.length > 0
            //             ? center.map((item, index) => {
            //                 return {
            //                   label: "item.CenterName,",
            //                   key: "index",
            //                   icon: (
            //                     <MapPinLine
            //                       size={20}
            //                       color="#eeeee7"
            //                       weight="fill"
            //                     />
            //                   ),
            //                   onClick: handleChangeCenter,
            //                 };
            //               })
            //             : "",
            //         ],
            //       },
            //       // getItem(
            //       //   <FormattedMessage id="admin.manage-gym.staff" />,
            //       //   "sub2",
            //       //   <UsersThree size={20} color="#f4f1f1" weight="fill" />,
            //       //   [
            //       //     {
            //       //       label: (
            //       //         <FormattedMessage id="admin.manage-gym.list-of-staff" />
            //       //       ),
            //       //       key: "1",
            //       //       onClick: handleChangeListStaffs,
            //       //     },
            //       //     getItem(
            //       //       <FormattedMessage id="admin.manage-gym.create-staff" />,
            //       //       "2"
            //       //     ),
            //       //     getItem(
            //       //       <FormattedMessage id="admin.manage-gym.update-staff" />,
            //       //       "3"
            //       //     ),
            //       //   ]
            //       // ),
            //       // getItem(
            //       //   <FormattedMessage id="admin.manage-gym.customer" />,
            //       //   "sub3",
            //       //   <UsersFour size={20} color="#f4f1f1" weight="fill" />,
            //       //   [
            //       //     getItem(
            //       //       <FormattedMessage id="admin.manage-gym.list-of-cus" />,
            //       //       "4"
            //       //     ),
            //       //   ]
            //       // ),
            //       // getItem(
            //       //   <FormattedMessage id="admin.manage-gym.revenue" />,
            //       //   "sub4",
            //       //   <Coins size={20} color="#f4f1f1" weight="fill" />,
            //       //   [
            //       //     getItem(
            //       //       <FormattedMessage id="admin.manage-gym.list-of-revenue" />,
            //       //       "5"
            //       //     ),
            //       //   ]
            //       // ),
            //       getItem(
            //         "Blog",
            //         "sub5",
            //         <Books size={20} color="#f4f1f1" weight="fill" />,
            //         [
            //           getItem(
            //             <FormattedMessage id="admin.manage-gym.list-of-blog" />,
            //             "6"
            //           ),
            //           getItem(
            //             <FormattedMessage id="admin.manage-gym.create-blog" />,
            //             "7"
            //           ),
            //           getItem(
            //             <FormattedMessage id="admin.manage-gym.update-blog" />,
            //             "8"
            //           ),
            //         ]
            //       ),
            //     ]
            //   ),
            //   getItem(
            //     <FormattedMessage id="admin.manage-gym.manage-account" />,
            //     "sub6",
            //     <UserCircle size={20} color="#f4f1f1" weight="fill" />,
            //     [
            //       getItem("Xem danh sách tài khoản", "8"),
            //       getItem("Tạo tài khoản", "10"),
            //       getItem("Cập nhật tài khoản", "11"),
            //     ]
            //   ),

            //   {
            //     key: "12",
            //     // icon: <BellRinging size={20} color="#f4f1f1" weight="fill" />,
            //     icon: <GearSix size={20} color="#f5f5f5" weight="fill" />,
            //     label: <FormattedMessage id="admin.manage-gym.setting" />,
            //   },
            //   getItem(
            //     <FormattedMessage id="admin.manage-gym.languages" />,
            //     "sub7",
            //     <Translate size={20} color="#f4f1f1" weight="fill" />,
            //     [
            //       {
            //         label: "Tiếng Việt",
            //         key: "13",
            //         onClick: () => {
            //           dispatch(changeLanguageApp(LANGUAGES.VI));
            //         },
            //       },
            //       {
            //         label: "English",
            //         key: "14",
            //         onClick: () => {
            //           dispatch(changeLanguageApp(LANGUAGES.EN));
            //         },
            //       },
            //     ]
            //   ),
            // ]}
          >
            <Menu.SubMenu
              icon={<Buildings size={20} weight="bold" color="#fff" />}
              title={<FormattedMessage id="admin.manage-gym.manage-center" />}
            >
              <Menu.SubMenu title="Center">
                {center &&
                  center.length > 0 &&
                  center.map((item, index) => {
                    return (
                      <Menu.Item
                        key={index}
                        onClick={() =>
                          handleChangeCenter(item.id, item.CenterName)
                        }
                      >
                        {item.CenterName}
                      </Menu.Item>
                    );
                  })}
              </Menu.SubMenu>
            </Menu.SubMenu>
            <Menu.SubMenu
              icon={<UserCircle size={20} weight="bold" color="#fff" />}
              title={<FormattedMessage id="admin.manage-gym.manage-account" />}
            >
              <Menu.Item onClick={handleViewListAccount}>
                Xem danh sách tài khoản
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              icon={<UserCircle size={20} weight="bold" color="#fff" />}
              title="Quản lý Manager of Center"
              // title={<FormattedMessage id="admin.manage-gym.manage-account" />}
            >
              <Menu.Item onClick={handleViewListManager}>
                Xem danh sách Manager
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              icon={<Planet size={20} weight="bold" color="#fff" />}
              title="Quản lý Dịch vụ"
              // title={<FormattedMessage id="admin.manage-gym.manage-account" />}
            >
              <Menu.Item onClick={handleViewListService}>
                Xem danh sách dịch vụ
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              icon={<CalendarCheck size={20} weight="bold" color="#fff" />}
              // title={<FormattedMessage id="admin.manage-gym.manage-account" />}
              title="Quản lý Lịch làm việc"
            >
              <Menu.Item onClick={handleViewListSchedule}>
                Xem danh sách khung giờ làm việc
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              icon={<Book size={20} weight="bold" color="#fff" />}
              // title={<FormattedMessage id="admin.manage-gym.manage-account" />}
              title="Quản lý Blog"
            >
              <Menu.Item onClick={handleViewListBlog}>
                Xem danh sách Blog
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item
              icon={<ClockClockwise size={20} weight="bold" color="#fff" />}
              onClick={handleSettingAccount}
            >
              Cài đặt tài khoản
            </Menu.Item>
            <Menu.SubMenu
              icon={<Translate size={20} weight="bold" color="#fff" />}
              title={<FormattedMessage id="admin.manage-gym.languages" />}
            >
              <Menu.Item
                onClick={() => {
                  dispatch(changeLanguageApp(LANGUAGES.VI));
                }}
              >
                Tiếng việt
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  dispatch(changeLanguageApp(LANGUAGES.EN));
                }}
              >
                English
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        )}
        {roleId && roleId === 2 && (
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            itemIcon={<RightCircleOutlined />}
            items={[
              {
                label: "Center",
                key: "21",
                icon: <MapPinLine size={20} color="#eeeee7" weight="fill" />,
                // onClick: handleChangeCenter,
              },

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
        )}
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
              src={userInfo && userInfo.avatar}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "100px",
                paddingRight: "3px",
              }}
            />
            <span>{userInfo && userInfo.fullName}</span> &nbsp;
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
