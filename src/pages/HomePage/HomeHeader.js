import { Input, Button, Menu, Dropdown, Badge } from "antd";
import { BellOutlined } from "@ant-design/icons";
import * as actions from "../../store/actions";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  AddressBook,
  BookmarksSimple,
  Buildings,
  DeviceMobile,
  MagnifyingGlass,
  Person,
  PhoneCall,
  SignIn,
  SignOut,
  Gear,
  User,
} from "phosphor-react";
import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoGHGym from "../../assets/images/logo/Group.png";
import { changeLanguageApp } from "../../store/actions";
import { LANGUAGES } from "../../utils/constant";
import "./HomeHeader.scss";
import { Link, useNavigate } from "react-router-dom";
import { getCusBooking } from "../../features/Customer/PersonalInfomation/BookingOfCus/cusBookingAPI";
import { handleGetDetailCustomerByExternalId } from "../../features/Customer/PayPage/PaymentPage/paymentAPI";
const { Search } = Input;
const HomeHeader = (props) => {
  const navigate = useNavigate();

  const cusInfo = useSelector((state) => state.cus.cusInfo);
  console.log("check info ", cusInfo);
  const handleLogout = () => {
    dispatch(dispatch(actions.cusLogout()));
    navigate("/");
  };

  const [countBooking, setCountBooking] = useState();
  const [cusBooking, setCusBooking] = useState();
  const [noCusBooking, setNoCusBooking] = useState(false);
  const [, setCusBookingLoading] = useState(true);
  const [detailCustomer, setDetailCustomer] = useState();
  useEffect(() => {
    if (cusInfo) {
      try {
        handleGetDetailCustomerByExternalId(cusInfo.ExternalId)
          .then((res) => {
            if (res.cusDetail) {
              setDetailCustomer(res.cusDetail);
              getCusBooking(res.cusDetail.id, 1)
                .then((response) => {
                  if (response.bookingOfCus.rows) {
                    setCountBooking(response.bookingOfCus.count);
                    setCusBooking(response.bookingOfCus.rows);
                    setNoCusBooking(false);
                  } else {
                    setNoCusBooking(true);
                  }
                })
                .catch(() => {
                  setNoCusBooking(true);
                })
                .finally(() => {
                  setCusBookingLoading(false);
                });
            }
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
  const cartMenu = (
    <Menu>
      {cusBooking?.map((item, index) => {
        return (
          <Menu.Item key={index} className="CartDrop">
            Đã đặt lịch với PT: {item.PTName} vào ngày{" "}
            {moment(item.StartTime).format("DD/MM/YYYY")}{" "}
            <p>Trạng thái : {item.Status}</p>
            {item.Status === "SCHEDULED" ? (
              <div className="OptionPay">
                <p className="textOptionPay">
                  your PT has confirm booking. Please pay to continue
                </p>
                <div className="optionBtn">
                  <button
                    className="btnPay"
                    style={{ borderRadius: "6px", backgroundColor: "aqua" }}
                    onClick={() => handlePay(item)}
                    // onClick={() => console.log("check id: ", item)}
                  >
                    Thanh toán
                  </button>
                  <button
                    className="btnCancel"
                    style={{ borderRadius: "6px", backgroundColor: "red" }}
                  >
                    Hủy booking
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </Menu.Item>
        );
      })}
    </Menu>
  );
  const userMenu = (
    <Menu className="UserDrop">
      <Menu.Item>
        <NavLink to="/customer-infomation">Profile</NavLink>
      </Menu.Item>
      <Menu.Item onClick={handleLogout}> Logout</Menu.Item>
    </Menu>
  );

  // const { history } = useHistory();
  const dispatch = useDispatch();
  const language = useSelector((state) => state.app.language);
  console.log("cuurent language: ", language);
  // const handleChangeLanguage = useCallback(
  //   (language) => dispatch(changeLanguageApp(language))
  //   ,
  //   [dispatch]
  // );
  const handlePay = (item) => {
    console.log("booking id: ", item);
    navigate("/payment-page", { state: { item } });
  };
  return (
    <>
      <div className="home-header-container">
        <div className="home-header-content">
          <div className="left-content">
            <i className="fas fa-bars"></i>
            <img className="header-logo" src={LogoGHGym} onClick={() => {}} />
          </div>
          <div className="center-content">
            <div className="child-content">
              <div>
                <NavLink to="/service-gym">
                  <b>
                    <FormattedMessage id="homeHeader.speciality" />
                  </b>
                </NavLink>
              </div>
              <div className="sub-title">
                <FormattedMessage id="homeHeader.searchDocter" />
              </div>
            </div>
            <div className="child-content">
              <div>
                <NavLink to="/gym-center">
                  <b>
                    <FormattedMessage id="homeHeader.health-facility" />
                  </b>
                </NavLink>
              </div>
              <div className="sub-title">
                <FormattedMessage id="homeHeader.select-room" />
              </div>
            </div>
            <div className="child-content">
              <div>
                <NavLink to="/Personal-Training">
                  <b>
                    <FormattedMessage id="homeHeader.doctor" />
                  </b>
                </NavLink>
              </div>
              <div className="sub-title">
                <FormattedMessage id="homeHeader.select-doctor" />
              </div>
            </div>
            <div className="child-content">
              <div>
                <b>
                  <FormattedMessage id="homeHeader.fee" />
                </b>
              </div>
              <div className="sub-title">
                <FormattedMessage id="homeHeader.check-health" />
              </div>
            </div>
          </div>

          <div class="hamburger-menu">
            <input id="menu__toggle" type="checkbox" />
            <label class="menu__btn" for="menu__toggle">
              <span></span>
            </label>

            <ul class="menu__box">
              <li>
                <a class="menu__item">Dịch vụ</a>
              </li>
              <li>
                <a class="menu__item">Cơ sở Gym</a>
              </li>
              <li>
                <a class="menu__item">Gói dịch vụ</a>
              </li>
              <li>
                <a class="menu__item">PT</a>
              </li>
              <li>
                <a class="menu__item">Đăng nhập</a>
              </li>
            </ul>
          </div>
          <div className="Cuscontent">
            <>
              {cusInfo ? (
                <div className="cusArea">
                  <img className="imgCus" src={detailCustomer?.CustomerImage} />
                  <div className="User">
                    <Dropdown overlay={userMenu}>
                      <Gear
                        style={{
                          fontSize: "30px",
                          backgroundColor: "#f0f0f0",
                          borderRadius: "50%",
                        }}
                      />
                    </Dropdown>
                  </div>
                  <div className="Notify">
                    <Dropdown
                      // style={{ float: 'right' }}
                      placement="bottomRight"
                      overlay={cartMenu}
                    >
                      <Badge count={countBooking} offset={[0, 0]}>
                        <BellOutlined
                          size="small"
                          style={{
                            fontSize: "28px",
                            backgroundColor: "#f0f0f0",
                            borderRadius: "50%",
                          }}
                        />
                      </Badge>
                    </Dropdown>
                  </div>
                </div>
              ) : (
                <NavLink to="/login">
                  <div className="login">
                    <div className="logoLogin">
                      <SignIn size={24} color="#1a1a19" weight="fill" />
                    </div>
                    <span className="textLogin">
                      <FormattedMessage id="homeHeader.login" />
                    </span>
                  </div>
                </NavLink>
              )}
            </>
          </div>
          <div className="right-content">
            <div className="support">
              <i className="fas fa-question-circle"></i>
              <FormattedMessage id="homeHeader.support" />
            </div>
            <div
              className={
                language === LANGUAGES.VI ? "language-vi active" : "language-vi"
              }
            >
              <span onClick={() => dispatch(changeLanguageApp(LANGUAGES.VI))}>
                VN
              </span>
            </div>
            <div
              className={
                language === LANGUAGES.EN ? "language-en active" : "language-en"
              }
            >
              <span onClick={() => dispatch(changeLanguageApp(LANGUAGES.EN))}>
                EN
              </span>
            </div>
          </div>
        </div>
      </div>
      {props.isShowBanner === true && (
        <div className="home-header-banner">
          <div className="content-up">
            {/* <Search
              className="search"
              placeholder="Tìm dịch vụ, PT, cơ sở..."
              loading={false}
              onSearch={true}
            /> */}
            {/* <div className="search">
                <MagnifyingGlass size={24} color="#393937" weight="thin" />
                <input
                  type="text"
                  placeholder="Tìm PT, dịch vu,..."
                  style={{ color: "#000" }}
                />
              </div> */}
          </div>
          <div className="content-down">
            <div className="options">
              <div className="option-child">
                <div className="icon-child">
                  <BookmarksSimple size={24} color="#393937" weight="fill" />
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.child1" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <DeviceMobile size={24} color="#393937" weight="fill" />
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.child2" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <Buildings size={24} color="#222220" weight="fill" />
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.child3" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <AddressBook size={24} color="#222220" weight="fill" />
                </div>
                <div className="text-child">
                  {" "}
                  <FormattedMessage id="banner.child4" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <PhoneCall size={24} color="#222220" weight="fill" />
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.child5" />
                </div>
              </div>
              <Link to="/bmi" className="option-child">
                <div className="icon-child">
                  <Person size={24} color="#393937" weight="light" />
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.child6" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

export default HomeHeader;
