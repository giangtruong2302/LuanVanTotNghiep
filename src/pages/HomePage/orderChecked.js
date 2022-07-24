import React, { useState, useEffect } from "react";
import "./HomeHeader.scss";
import { useNavigate } from "react-router-dom";
import { CheckOutlined } from "@ant-design/icons";
import { getOrder } from "../../features/Customer/PersonalInfomation/BookingOfCus/cusBookingAPI";
import { getCancelBooking } from "../../features/Staff/ListBooking/listBookingAPI";
import { ToastContainer, toast } from 'react-toastify';
import { FormattedMessage } from "react-intl";
const OrderChecked = (props) => {
    const [oderDetail, setOrderDetail] = useState()
    const [item, setItem] = useState(props.data)
    const [canceled, setCancled] = useState("CANCELED")
    const [statusPage, setStatusPage] = useState()
    useEffect(() => {
        getOrder(props.data.id).then((response) => {
            setOrderDetail(response.order.Status)
        })


    }, [statusPage]);
    const navigate = useNavigate();
    const handlePay = () => {
        console.log("booking id: ", item);
        navigate("/payment-page", { state: { item } });
    };
    const options = {

        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };
    const handleCancel = () => {
        getCancelBooking(canceled, item.id, item.ScheduleId)((response) => {

            if (response.message.errorCode === 0) {
                toast.success("Success", options)
                setStatusPage(Date.now())
            } else {
                toast.error("Fail", options)

            }


        })


    };


    return (

        <>
            {oderDetail === 1 ?
                <div className="OptionPay">
                    <div className="textOptionPay">
                        <FormattedMessage id="cart.paid" /> <CheckOutlined style={{ fontSize: '17px', color: '#08c' }} />
                    </div>
                </div>
                :
                <>

                    <div className="OptionPay">
                        <p className="textOptionPay">
                            <FormattedMessage id="cart.accept" />
                        </p>

                        <div className="optionBtn">
                            <button
                                className="btnPay"
                                // value={props.data}
                                // style={{ borderRadius: "6px", backgroundColor: "aqua" }}
                                onClick={() => handlePay()}
                            // onClick={() => console.log("check id: ", item)}
                            >
                                <FormattedMessage id="cart.pay" />
                            </button>
                            <button
                                className="btnCancel"
                                onClick={() => handleCancel()}
                            // style={{ borderRadius: "6px", backgroundColor: "red" }}
                            >
                                <FormattedMessage id="cart.cancel" />
                            </button>
                        </div>
                    </div>

                </>
            }
            <ToastContainer />
        </>
    )


}
export default OrderChecked;