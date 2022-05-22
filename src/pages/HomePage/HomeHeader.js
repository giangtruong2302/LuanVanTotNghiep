import React, { useCallback, useState } from "react";
import { FormattedMessage } from "react-intl";
import "./HomeHeader.scss";
import { LANGUAGES } from "../../utils/constant";
import { useSelector, useDispatch } from "react-redux";
import { changeLanguageApp } from "../../store/actions";
import LogoGHGym from "../../assets/images/logo/GHGYMLogo.png";
import NavBar from "./NavBar";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  BookmarksSimple,
  MagnifyingGlass,
  Buildings,
  AddressBook,
  PhoneCall,
  Person,
  DeviceMobile,
  SignIn,
} from "phosphor-react";
import { Input } from "antd";
import { NavLink } from "react-router-dom";
import LoginPage from "../../features/login";

const { Search } = Input;

const HomeHeader = (props) => {
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
                <b>
                  <FormattedMessage id="homeHeader.health-facility" />
                </b>
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
            </div>
          </div>
          <div class="hamburger-menu">
            <input id="menu__toggle" type="checkbox" />
            <label class="menu__btn" for="menu__toggle">
              <span></span>
            </label>

            <ul class="menu__box">
              <li><a class="menu__item" >Dịch vụ</a></li>
              <li><a class="menu__item" >Cơ sở Gym</a></li>
              <li><a class="menu__item" >Gói dịch vụ</a></li>
              <li><a class="menu__item" >PT</a></li>
              <li><a class="menu__item" >Đăng nhập</a></li>

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
      {props.isShowBanner === true && (
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
              <div className="option-child">
                <div className="icon-child">
                  <Person size={24} color="#393937" weight="light" />
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.child6" />
                </div>
              </div>
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
