import React from "react";

import { NavLink } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import PerInfo from "./PerInfo/perInfo";


const PersonalInformation = () => {
    return (
        <div className="PTProfileBg">
            <div className="containerListPT">
                <div className="backToHome">
                    <NavLink to="/" className="backtoHome">
                        <ArrowLeft size={24} color="#292829" weight="duotone" />
                        <div className="textBackToHome">Back to home</div>
                    </NavLink>
                    <PerInfo />


                </div>

            </div>
        </div>
    );
};
export default PersonalInformation;