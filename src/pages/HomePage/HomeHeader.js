import { Input, Button, Menu } from "antd";
import * as actions from "../../store/actions";
import { Dropdown } from 'react-bootstrap';
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
  ShoppingCart
} from "phosphor-react";
import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoGHGym from "../../assets/images/logo/GHGYMLogo.png";
import { changeLanguageApp } from "../../store/actions";
import { LANGUAGES } from "../../utils/constant";
import "./HomeHeader.scss";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "antd";
import { getCusBooking } from "../../features/Customer/PersonalInfomation/BookingOfCus/cusBookingAPI";
const { Search } = Input;
const HomeHeader = (props) => {
  const navigate = useNavigate();
  const cusInfo = useSelector((state) => state.cus.cusInfo);
  const handleLogout = () => {
    dispatch(dispatch(actions.cusLogout()));
    navigate("/");
  };
  const [countBooking, setCountBooking] = useState();
  const [cusBooking, setCusBooking] = useState();
  const [noCusBooking, setNoCusBooking] = useState(false);
  const [, setCusBookingLoading] = useState(true);
  useEffect(() => {
    if (cusInfo) {
      getCusBooking(cusInfo["AccountCustomer.id"], 1).then((response) => {
        if (response.bookingOfCus.rows) {
          setCountBooking(response.bookingOfCus.count)
          setCusBooking(response.bookingOfCus.rows);
          setNoCusBooking(false);
        }
        else {
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

  }, []);

  // const { history } = useHistory();
  const dispatch = useDispatch();
  const language = useSelector((state) => state.app.language);
  console.log("cuurent language: ", language);
  // const handleChangeLanguage = useCallback(
  //   (language) => dispatch(changeLanguageApp(language))
  //   ,
  //   [dispatch]
  // );
  return (

    <>
      <div className="home-header-container">
        <div className="home-header-content">
          <div className="left-content">
            <i className="fas fa-bars"></i>
            <img className="header-logo" src={LogoGHGym} onClick={() => { }} />
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

            <div className="child-content">
              <>
                {(cusInfo)
                  ?
                  <div className="cusArea">
                    <div className="CusName">
                      <div className="helloCus"> {"Hello, " + cusInfo["fullName"]}</div>
                      <Dropdown className="dropdownCus">
                        <Dropdown.Toggle variant='Secondary' >
                          <Gear
                            size={20}
                            color="#c0c0c0"
                            weight="fill"
                            style={{ marginBottom: "8px" }}
                          />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item > <NavLink to="/customer-infomation">Profile</NavLink></Dropdown.Item>
                          <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>

                        </Dropdown.Menu>


                      </Dropdown></div>
                    <div className="cart">
                      <Dropdown >
                        <Dropdown.Toggle variant='Secondary' className="toggle" >
                          <Badge count={countBooking}>
                            <ShoppingCart
                              size={35}
                              color="#c0c0c0"
                              weight="fill"
                              style={{ marginBottom: "10px" }}
                            /></Badge>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="MenuCart">
                          {cusBooking?.map((item, index) => {
                            return (

                              <Dropdown.Item className="item">Đã book PT: {item.PTName}<p>Bắt đầu từ: {item.StartTime}</p>Dịch vụ: {item.ServiceId}<p> Trạng thái: {item.Status} </p></Dropdown.Item>
                            )

                          })}
                        </Dropdown.Menu>
                      </Dropdown>

                    </div>
                  </div>
                  :
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

                }


              </>
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
      {
        props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1">
                <FormattedMessage id="banner.title1" />
              </div>
              <div className="title2">
                <FormattedMessage id="banner.title2" />
              </div>
              {/* <Search
              className="search"
              placeholder="Tìm dịch vụ, PT, cơ sở..."
              loading={false}
              onSearch={true}
            /> */}
              <div className="search">
                <MagnifyingGlass size={24} color="#393937" weight="thin" />
                <input
                  type="text"
                  placeholder="Tìm PT, dịch vu,..."
                  style={{ color: "#000" }}
                />
              </div>
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
                <Link to="/bmi" className="option-child" >
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
        )
      }
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
