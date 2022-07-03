import React from "react";
import "./index.scss";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import CountBMI from "./countBMI/countBMI";



const BMI = () => {

    return (
        <div className="BMIProfileBg">
            <div className="containerBMIList">
                <div className="backToHome">
                    <NavLink to="/" className="backToHomeLink">
                        <ArrowLeft size={24} color="#292829" weight="duotone" />
                        <div className="textBackToHome">Back to home</div>
                    </NavLink>
                </div>
                <div className="titlePage">
                    <CountBMI />

                </div>
            </div>
        </div>
    );
};
export default BMI;