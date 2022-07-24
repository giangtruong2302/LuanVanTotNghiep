import React from "react";
import "./Blog.scss";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import HomeFooter from "../../../pages/HomePage/HomeFooter";
import { FormattedMessage } from "react-intl";
import "../../../pages/HomePage/HomePage.scss"
import SearchCenter from "./SearchBlog/SearchBlog";
const Blog = () => {
    return (
        <div className="BlogProfileBg">
            <div className="containerBlogList">
                <div className="backToHome">
                    <NavLink to="/" className="backToHomeLink">
                        <ArrowLeft size={24} color="#ffffff" weight="duotone" />
                        <div className="textBackToHome"> <FormattedMessage id="header.back-to-home" /></div>
                    </NavLink>
                </div>
                <div className="listItem">
                    <SearchCenter />
                </div>
                <div className="footer"><HomeFooter /></div>
            </div>
        </div>
    );
};
export default Blog;
