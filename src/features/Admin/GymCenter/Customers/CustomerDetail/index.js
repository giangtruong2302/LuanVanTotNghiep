import { Col, Empty, Row } from "antd";
// import { useAppSelector } from "app/hooks";
import { useSelector } from "react-redux";
import banner from "../../../../../assets/images/banner/bannerPRGHGYM.png";
import placeholder from "../../../../../assets/images/person-placeholder.jpg";
import empty from "../../../../../assets/images/empty.svg";
// import banner from "assets/images/banner-user.png";
// import placeholder from "assets/images/user.png";
// import AppLoader from "components/AppLoader";
import AppLoader from "../../../../../component/AppLoader";
// import StaggerAnimation from "components/StaggerAnimation";
import StaggerAnimation from "../../../../../component/StaggerAnimation";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
// import UpcomingBooking from "./booking/upcomingBooking";
// import { getUpcommingBooking } from "./booking/upcommingBookingAPI";
// UPCOMMING BOOKING API
// import { BookingResponseType } from "./booking/upcommingBookingModels";
// import CardCustomer from "./cardCustomer/cardCustomer";
// import { getCustomerProfile } from "./cardCustomer/cardCustomerAPI";
//  CARD CUSTOMER PROFILE API
// import { CustomerResponseType } from "./cardCustomer/cardCustomerModel";
// import BookingHistory from "./history/bookingHistory";
// import empty from "assets/images/empty.svg";
import classes from "./styles.module.scss";
import {
  handleGetBookingOfCustomer,
  handleGetDetailCustomer,
} from "./CusDetailAPI";
import UpcomingBooking from "./booking/UpcomingBooking";

const CustomerProfile = () => {
  const [customerProfile, setCutomerProfile] = useState();
  const [upcommingBooking, setUpcommingBooking] = useState();
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);
  const [noUpcommingBooking, setNoUpcommingBooking] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  // const currentSalon = useSelector((state) => state.currentSalon.salonId);
  const customerId = location.pathname.split("/")[3];
  // console.log("check cus id: ", customerId);
  useEffect(() => {
    //  CARD CUSTOMER PROFILE API
    handleGetDetailCustomer(customerId)
      .then((res) => {
        const data = res.cusDetail;
        setCutomerProfile(data);
      })
      .finally(() => {
        setLoading(false);
      });
    // // UPCOMMING BOOKING API
    handleGetBookingOfCustomer(customerId, 1).then((res) => {
      const data = res.bookingOfCus.rows;
      // console.log("check data: ", data);
      if (data && data.length > 0) {
        setUpcommingBooking(res.bookingOfCus.rows);
        if (data.length === 0 || data.length < 10) {
          setHasMore(false);
        }
      } else {
        setNoUpcommingBooking(true);
      }
    });
  }, [customerId]);

  const fetchNextUpBooking = async () => {
    // getUpcommingBooking(currentSalon.toString(), customerId, page).then(
    //   (res) => {
    //     const { data } = res.data;
    //     if (data && data.length > 0) {
    //       setUpcommingBooking((prev) => {
    //         if (prev !== undefined) return [...prev, ...data];
    //       });
    //       if (data.length === 0 || data.length < 10) {
    //         setHasMore(false);
    //       }
    //       setPage(page + 1);
    //     }
    //   }
    // );
  };

  // console.log(upcommingBooking && new Date(`${upcommingBooking[0].bookingDate} ${upcommingBooking[0].bookingTime}`));
  return (
    <>
      <div className={classes.customerProfileBackground}>
        <div className={classes.container}>
          <div className={classes.topProfile}>
            <Row>
              <Col span={24}>
                <img
                  className={classes.imgBaner}
                  src={banner}
                  alt="imgBanerBackground"
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Row className={classes.infoCustomer}>
                  <Col span={10} className={classes.infoLeft}>
                    <div className={classes.imgInfo}>
                      <img
                        src={
                          customerProfile?.CustomerImage
                            ? customerProfile?.CustomerImage
                            : placeholder
                        }
                        alt="info"
                      />
                    </div>
                    <div className={classes.nameInfo}>
                      {customerProfile
                        ? customerProfile?.CustomerName
                        : "Loading"}
                    </div>
                  </Col>
                  <Col span={14} className={classes.infoRight}>
                    {/* <CardCustomer customer={customerProfile} /> */}
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <div className={classes.bottomProfile}>
            <div className={classes.upcomingBooking}>
              <div className={classes.titleBooking}>Upcoming Booking</div>
              {upcommingBooking && upcommingBooking.length === 0 ? (
                <Empty
                  image={empty}
                  imageStyle={{
                    height: 60,
                  }}
                  description={"No Upcoming Booking"}
                />
              ) : upcommingBooking && upcommingBooking.length > 0 ? (
                <div
                  id="scrollableDiv"
                  style={{
                    height: "calc(100% - 20px)",
                    overflowY: "scroll",
                  }}
                >
                  <InfiniteScroll
                    dataLength={upcommingBooking ? upcommingBooking.length : 0}
                    next={fetchNextUpBooking}
                    hasMore={hasMore}
                    loader={
                      <div className={classes.loading}>
                        <StaggerAnimation />
                      </div>
                    }
                    scrollableTarget="scrollableDiv"
                  >
                    {upcommingBooking.map(function (item, idx) {
                      return (
                        <div key={idx} className={classes.cardUpcoming}>
                          <UpcomingBooking
                            date={`${item.StartTime}`}
                            image={null}
                            title={item.ServiceId}
                            address={item.CustomerName}
                          />
                        </div>
                      );
                    })}
                  </InfiniteScroll>
                </div>
              ) : (
                "Loading..."
              )}
            </div>
            <div className={classes.bookingHistory}>
              <div className={classes.titleBooking}>Booking History</div>
              {/* <BookingHistory
                userId={customerId}
                salonId={currentSalon.toString()}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CustomerProfile;
