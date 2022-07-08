import React from "react";
import { Steps } from 'antd';
import 'antd/dist/antd.css';
import './PaymentPage.scss'
import momo from "../../../../assets/images/logo/momo.png"
import stripe from "../../../../assets/images/logo/stripe.png"
const { Step } = Steps;
const PaymentPage = () => {
    return (
        <>
            <div className="titlePage">
                This is Payment Page
                <div className="step">
                    <Steps current={0}>
                        <Step title="Bước 1" description="Chọn phương thức" />
                        <Step title="Bước 2" description="Quét QR" />
                        <Step title="Bước 3" description="Hoàn thành" />
                    </Steps></div>
            </div>
            <div className="pageContent">
                <div className="cusOrder">
                    <div className="orderTitle">Thông tin đơn hàng</div>
                    <div className="content">
                        <div className="leftContent">

                            <div className="itemTitle">Mã giao dịch</div>
                            <div className="itemContent">A651HVH1641</div>
                            <div className="itemTitle">Khách hàng</div>
                            <div className="itemContent">Nguyễn Văn A</div>
                        </div>
                        <div className="rightContent">

                            <div className="itemTitle">Dịch vụ đăng ký</div>
                            <div className="itemContent">Kich Boxing</div>
                            <div className="itemTitle">Khung giờ</div>
                            <div className="itemContent">18h30 - 20h</div>
                        </div>
                    </div>
                    <div className="total">Total : 5.000.000 VND</div>
                </div>
                <div className="methodPayment">
                    <div className="methodTiltle">Phương thức thanh toán</div>
                    <div className="methodChoose">Chọn 1 phương thức thanh toán :</div>
                    <div className="imgMethod">
                        <img className="momo" src={momo}></img>
                        <img className="stripe" src={stripe}></img>
                    </div>
                </div>
                <button className="btn-pay">Thanh toán</button>
            </div></>
    );
};
export default PaymentPage;