import { Input, Button, Menu, Dropdown, Badge, Divider, Skeleton } from "antd";
import { BellOutlined, CheckOutlined } from "@ant-design/icons";
import * as actions from "../../store/actions";
import NoneAvatar from "../../assets/images/logo/noneAvatar.jpg"
import StaggerAnimation from "../../component/StaggerAnimation";
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
import { getCusBooking, getOrder } from "../../features/Customer/PersonalInfomation/BookingOfCus/cusBookingAPI";
import { handleGetDetailCustomerByExternalId } from "../../features/Customer/PayPage/PaymentPage/paymentAPI";
import OrderCheckedPending from "./orderCheckedPending";
import InfiniteScroll from "react-infinite-scroll-component";
import { getDetailSchedule } from "../../features/Staff/ListBooking/listBookingAPI";
import { getTimeById } from "../../features/Customer/GymCenterDetail/PtSchedule/PtScheduleAPI";
import OrderChecked from "./orderChecked";
import TimeBooking from "./timeBooking";
import { ToastContainer, toast } from 'react-toastify';
const { Search } = Input;
const HomeHeader = (props) => {
  const navigate = useNavigate();
  const [hasMore, setHasMore] = useState(true);
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
  const [cusId, setCusId] = useState();
  const [page, setPage] = useState(2)
  const options = {

    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  useEffect(() => {
    if (cusInfo) {
      try {
        handleGetDetailCustomerByExternalId(cusInfo.ExternalId)
          .then((res) => {
            if (res.cusDetail) {
              setDetailCustomer(res.cusDetail);
              setCusId(res.cusDetail.id)
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

  const fetchNextCusBooking = async () => {
    getCusBooking(cusId, page)
      .then((response) => {
        const data = response.bookingOfCus.rows;
        if (data && data.length > 0) {
          setCusBooking((prev) => {
            if (prev !== undefined) return [...prev, ...data];
          });
          if (data.length === 0 || data.length < 10) {
            setHasMore(false);
          }
          setPage(page + 1);
        }
      })
      .catch(() => {
        // setFlag(true);
        setHasMore(false);
      })
      .finally(() => {
        // setFlag(true);
        console.log("success");
        // setHasMore(false)
      });
  };
  const filtered = cusBooking?.filter(Booking => {
    return Booking.Status === "PENDING" || Booking.Status === "SCHEDULED";
  });
  console.log("filter", filtered)
  const cartMenu = (

    <Menu className="menuDrop">
      <div
        id="scrollableDiv"
        style={{
          height: 150,
          overflow: 'auto',
          padding: '0 1px',
          border: '1px solid rgba(140, 140, 140, 0.35)',
        }}
      >
        <InfiniteScroll
          dataLength={2}
          hasMore={hasMore}
          next={fetchNextCusBooking}
          // loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"

        >
          {cusBooking?.map((item, index) => {
            return (

              (item.Status === "CANCELED") ? "" :
                <Menu.Item key={index} className="CartDrop">
                  <FormattedMessage id="cart.booked" /> {item.PTName}   <FormattedMessage id="cart.in" /> {" "}
                  {moment(item.StartTime).format("DD/MM/YYYY")}{" "}
                  <TimeBooking data={item} />
                  <FormattedMessage id="cart.status" />  : {item.Status}
                  {item.Status === "SCHEDULED" ? (
                    <OrderChecked data={item} />

                  ) : (
                    <OrderCheckedPending data={item} />
                  )}
                </Menu.Item>

            );
          })}
        </InfiniteScroll></div>
    </Menu>
  );
  const userMenu = (
    <Menu className="UserDrop">
      <Menu.Item>
        <NavLink to="/customer-infomation"><FormattedMessage id="user.profile" /></NavLink>
      </Menu.Item>
      <Menu.Item onClick={handleLogout}> <FormattedMessage id="user.logout" /></Menu.Item>
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

          </div>

          <div class="hamburger-menu">
            <input id="menu__toggle" type="checkbox" />
            <label class="menu__btn" for="menu__toggle">
              <span></span>
            </label>

            <ul class="menu__box">
              <li> <NavLink to={`/service-gym`} className="menu__item" >Dịch vụ</NavLink></li>
              <li><NavLink to={`/gym-center`} className="menu__item" >Cơ sở Gym</NavLink></li>
              <li><NavLink to={`/Personal-Training`} className="menu__item" >PT</NavLink></li>
              <li><NavLink to={`/Blog`} className="menu__item" >Blog</NavLink></li>
              <li><NavLink to={`/login`} className="menu__item" >Đăng nhập</NavLink></li>
            </ul>
          </div>
          <div className="Cuscontent">
            <>
              {cusInfo ? (
                <div className="cusArea">
                  {detailCustomer?.CustomerImage === "" ?
                    <img className="imgCus" src={NoneAvatar} />
                    :
                    <img className="imgCus" src={detailCustomer?.CustomerImage} />
                  }

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

                      className="dropdown"
                      placement="bottomRight"
                      overlay={cartMenu}
                    >
                      <Badge count={filtered?.length} offset={[0, 0]}>
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
              <Link to="/gym-center" className="option-child">
                <div className="icon-child">
                  <Buildings size={24} color="#222220" weight="fill" />
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.child3" />
                </div>
              </Link>
              <Link to="/Personal-Training" className="option-child">
                <div className="icon-child">
                  <AddressBook size={24} color="#222220" weight="fill" />
                </div>
                <div className="text-child">
                  {" "}
                  <FormattedMessage id="banner.child4" />
                </div>
              </Link>
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
