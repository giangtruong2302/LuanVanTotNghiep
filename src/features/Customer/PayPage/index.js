import React from "react";
import PaymentPage from "./PaymentPage/PaymentPage"
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";


const PayPage = () => {
    return (
        <div className="PTProfileBg">
            <div className="containerListPT">
                <div className="backToHome">
                    <NavLink to="/" className="backtoHome">
                        <ArrowLeft size={24} color="#292829" weight="duotone" />
                        <div className="textBackToHome">Back to home</div>
                    </NavLink>

                    <PaymentPage />

                </div>

            </div>
        </div>
    );
};
export default PayPage;