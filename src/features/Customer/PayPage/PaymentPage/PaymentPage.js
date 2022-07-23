import React from "react";
import { message, Steps } from "antd";
import "antd/dist/antd.css";
import "./PaymentPage.scss";
import momo from "../../../../assets/images/logo/momo.png";
import stripe from "../../../../assets/images/logo/stripe.png";
import StripeCheckout from "react-stripe-checkout";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import HomeFooter from "../../../../pages/HomePage/HomeFooter";
import "../../../../pages/HomePage/HomePage.scss";
import { useState } from "react";
import moment from "moment";
import NumberFormat from "react-number-format";
import { useEffect } from "react";
import icon from "../../../../assets/images/logo/walkIcon.gif";
import {
  handleGetDetailOrder,
  handlePayWithMomoAPI,
  handlePayWithStripe,
} from "./paymentAPI";
import { handleGetDetailCustomer } from "../../../Admin/GymCenter/Customers/CustomerDetail/CusDetailAPI";
import { handleGetDetailService } from "../../../Admin/ManageOrder/orderAPI";
import { useCallback } from "react";
const { Step } = Steps;
const PaymentPage = () => {
  // const location: Location & {
  //   state?: { name: string };
  // } = useLocation();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [detailCus, setDetailCus] = useState();
  const [detailOrder, setDetailOrder] = useState();
  const [detailService, setDetailService] = useState();
  const [step, setStep] = useState(0);
  const [url, setUrl] = useState(window.location.href);
  console.log("check url: ", url);
  console.log("check info pay: ", state);
  const [token, setToken] = useState();
  const onToken = (token) => {
    console.log("stripe", token);
    if (token) {
      setToken(token.id);
    }
  };
  const clickStripe = () => {
    setStep(1);
  };
  // console.log("step", step);
  useEffect(() => {
    try {
      handlePayWithStripe(
        token,
        detailOrder?.amount,
        detailOrder?.id,
        detailOrder?.ReservationId,
        state.item.CustomerId,
        detailOrder?.Status,
        detailOrder?.createdAt,
        detailCus?.CustomerEmail,
        "BOOKING AT GHGYM",
        "YOUR QR CODE"
      )
        .then((res) => {
          if (res.stripeRes) {
            console.log("check paymnent with stripe: ", res);
            message.success(
              "thanh toan thanh cong! Chung toi se gui email cho ban"
            );
          }
          console.log("check res stripeErr: ", res.stripeRes);
          // message.error("thanh toán thất bại");
        })
        .catch((error) => {
          console.log("check res stripeErr: ", error);
          // message.error("thanh toán thất bại");
        });
    } catch (error) {
      console.log(error);
    }
  }, [token]);
  useEffect(() => {
    try {
      handleGetDetailOrder(state.item.id)
        .then((res) => {
          console.log("check order detail: ", res.order);
          setDetailOrder(res.order);
        })
        .catch((error) => {
          message.error(error);
        });
      handleGetDetailCustomer(state.item.CustomerId)
        .then((res) => {
          if (res.cusDetail) {
            console.log("check cus detail: ", res.cusDetail);
            setDetailCus(res.cusDetail);
          }
        })
        .catch((error) => {
          message.error(error);
        });
      handleGetDetailService(state.item.ServiceId)
        .then((res) => {
          if (res.serviceDetail) {
            setDetailService(res.serviceDetail);
          }
        })
        .catch((error) => message.error(error));
    } catch (error) {
      console.log(error);
    }
  }, [state]);
  const handlePayWithMomo = () => {
    setStep(1);
    try {
      if (detailOrder && detailCus) {
        console.log("first");
        handlePayWithMomoAPI(
          detailOrder?.id,
          detailOrder?.amount
          // detailCus?.CustomerEmail,
          // "QR CODE PAYMENT",
          // ""
        )
          .then((res) => {
            console.log("check res: ", res);
            if (res.result.payUrl) {
              window.location.href = res.result.payUrl;
            }
            console.log("check momo link", res);
            message.warning(res.result.message);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="PaymentBg">
      <div className="containerPayment">
        <div className="backToHome">
          <NavLink to="/" className="backtoHome">
            <ArrowLeft size={24} color="#ffffff" weight="duotone" />
            <div className="textBackToHome">Back to home</div>
          </NavLink>
        </div>
        <div className="titlePage">
          <div className="thisIsPayment">Payment Page</div>
          <img src={icon} className="iconWalk"></img>
          <div className="step">
            <Steps current={step}>
              <Step title="Bước 1" description="Chọn phương thức" />
              <Step title="Bước 2" description="Quét QR" />
              <Step title="Bước 3" description="Hoàn thành" />
            </Steps>
          </div>
        </div>
        <div className="pageContent">
          <div className="cusOrder">
            <div className="orderTitle">Thông tin đơn hàng</div>
            <div className="content">
              <div className="leftContent">
                <div className="itemTitle">Mã giao dịch</div>
                <div className="itemContent">{state.item?.id}</div>
                <div className="itemTitle">Khách hàng</div>
                <div className="itemContent">{state.item.CustomerName}</div>
              </div>
              <div className="rightContent">
                <div className="itemTitle">Dịch vụ đăng ký</div>
                <div className="itemContent">
                  {detailService?.ServiceName}
                  <img
                    src={detailService?.ServiceImage}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "7px",
                    }}
                  />
                </div>

                <div className="itemTitle">Khung giờ</div>
                <div className="itemContent">
                  {moment(state.item.StartTime).format(
                    "dddd,DD-MM-YYYY H-mm A"
                  )}
                </div>
              </div>
            </div>
            <div className="total">
              Total :{" "}
              <NumberFormat
                value={state.item.price}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />{" "}
              {"VND"}
            </div>
          </div>
          <div className="methodPayment">
            <div className="methodTiltle">Phương thức thanh toán</div>
            <div className="methodChoose">Chọn 1 phương thức thanh toán :</div>
            <div className="imgMethod">
              {/* <img className="momo" src={momo}></img>
                            <img className="stripe" src={stripe}></img> */}
              <div className={"momo"} onClick={handlePayWithMomo}></div>
              <StripeCheckout
                name={state.item.CustomerName}
                image={detailCus?.CustomerImage}
                description="Thanks for payment booking "
                amount={detailOrder?.amount} //se sua lai giong vs gia that de v de test
                email={detailCus?.CustomerEmail}
                token={onToken}
                stripeKey={`pk_test_51LJw5FAZSrSS1g1Fw8sCcbkbuIwnq43uVQ6v4yt4oOCz4uViqITYPQAek49w0y5kZX6yE2qjYeF0IQeGmKCRRjD900uiS52NeK`}
                currency="VND"
              >
                <div className={"stripe"} onClick={clickStripe}></div>
              </StripeCheckout>
            </div>
          </div>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
};
export default PaymentPage;
