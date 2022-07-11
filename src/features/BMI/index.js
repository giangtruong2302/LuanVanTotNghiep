import React from "react";
import "./index.scss";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import CountBMI from "./countBMI/countBMI";
import HomeFooter from "../../pages/HomePage/HomeFooter";



const BMI = () => {

    return (
        <div className="BMIProfileBg">
            <div className="containerBMIList">
                <div className="backToHome">
                    <NavLink to="/" className="backToHomeLink">
                        <ArrowLeft size={24} color="#ffffff" weight="duotone" />
                        <div className="textBackToHome">Back to home</div>
                    </NavLink>
                </div>
                <div className="titlePage">
                    <CountBMI />

                </div>


                <HomeFooter />

            </div>

        </div>
    );
};
export default BMI;