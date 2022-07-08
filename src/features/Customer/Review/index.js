import React from "react";
import FormReview from "./formReview/form";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";


const Review = () => {
    return (
        <div className="PTProfileBg1">
            <div className="containerListPT">
                <div className="backToHome">
                    <NavLink to="/" className="backtoHome">
                        <ArrowLeft size={24} color="#292829" weight="duotone" />
                        <div className="textBackToHome">Back to home</div>
                    </NavLink>

                    <FormReview />

                </div>

            </div>
        </div>
    );
};
export default Review;