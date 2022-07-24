import { Breadcrumb, Col, PageHeader, Row } from "antd";
import { Question, List } from "phosphor-react";
import React, { useState, useEffect } from "react";
import "./blogDetail.scss";
import { useNavigate } from "react-router-dom";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import moment from "moment";
import { useParams } from "react-router-dom";
import { getBlogDetail } from "./blogDetailAPI";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import HomeFooter from "../../../pages/HomePage/HomeFooter";
import { FormattedMessage } from "react-intl";
const BlogDetail = () => {
    const navigate = useNavigate();
    const [isSeeMoreServiceDetail, setIsSeeMoreServiceDetail] = useState(false);

    const id = useParams();

    const [blogDetail, setBlogDetail] = useState();
    const [noBlogDetail, setNoBlogDetail] = useState(false);
    const [, setBlogDetailLoading] = useState(true);


    useEffect(() => {
        getBlogDetail(id.id).then((response) => {
            if (response.blog) {
                setBlogDetail(response.blog);
                setNoBlogDetail(false);
            } else {
                setNoBlogDetail(true);
            }
        })
            .catch(() => {
                setNoBlogDetail(true);
            })
            .finally(() => {
                setBlogDetailLoading(false);
            });
    }, []);

    return (

        <div className="BlogDetailBg">
            <div className="backToHome">
                <NavLink to="/blog" className="backtoHome">
                    <ArrowLeft size={24} color="#ffffff" weight="duotone" />
                    <div className="textBackToHome"><FormattedMessage id="header.back" /></div>
                </NavLink>

            </div>

            <div className="BlogDetailContent">
                <Row>
                    <Col

                        span={24}
                        offset={0}
                        style={{
                            display: "flex",
                            gap: "15px",
                            flexDirection: "column",
                        }}
                    >
                        <Row>
                            <Col span={18} offset={3}>
                                <div className="breadcumDetail">
                                    <Breadcrumb>
                                        <Breadcrumb.Item href="">
                                            <HomeOutlined />
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item href="">
                                            <span><FormattedMessage id="blog.blogList" /></span>
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item> {blogDetail?.Title} </Breadcrumb.Item>
                                    </Breadcrumb>
                                </div>
                                <div className="blogDetailAbout">
                                    <div className="blogDetailTitle">{blogDetail?.Title}</div>
                                    <div className="blogDetailDefine">
                                        <p><FormattedMessage id="blog.createdDay" /> : {moment(blogDetail?.createdAt).format('DD-MM-YYYY')} </p>

                                    </div>
                                    <div className="blogImage">
                                        <img src={blogDetail?.BlogImage} className="imageBlog" /></div>
                                    <div className="blogDetailDefineSeemore">
                                        {blogDetail?.Content}
                                    </div>




                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={18} offset={3} className="listPTService">

                    </Col>
                </Row>
            </div>
            <HomeFooter />
        </div>
    );
};
export default BlogDetail;
