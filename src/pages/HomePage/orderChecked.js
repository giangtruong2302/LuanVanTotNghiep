import React, { useState, useEffect } from "react";
import "./HomeHeader.scss";
import { useNavigate } from "react-router-dom";
import { CheckOutlined } from "@ant-design/icons";
import { getOrder } from "../../features/Customer/PersonalInfomation/BookingOfCus/cusBookingAPI";
import { getCancelBooking } from "../../features/Staff/ListBooking/listBookingAPI";
import { ToastContainer, toast } from 'react-toastify';
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
                        Đã thanh toán <CheckOutlined style={{ fontSize: '17px', color: '#08c' }} />
                    </div>
                </div>
                :
                <>

                    <div className="OptionPay">
                        <p className="textOptionPay">
                            Your PT has confirm booking. Please pay to continue
                        </p>

                        <div className="optionBtn">
                            <button
                                className="btnPay"
                                // value={props.data}
                                // style={{ borderRadius: "6px", backgroundColor: "aqua" }}
                                onClick={() => handlePay()}
                            // onClick={() => console.log("check id: ", item)}
                            >
                                Thanh toán
                            </button>
                            <button
                                className="btnCancel"
                                onClick={() => handleCancel()}
                            // style={{ borderRadius: "6px", backgroundColor: "red" }}
                            >
                                Hủy booking
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