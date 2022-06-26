import React from "react";
import { Breadcrumb, Col, PageHeader, Row } from "antd";
import './perInfo.scss';
import ava from "../../../../assets/images/imgStaff/staff.png"
import { Question, List, ThumbsUp, Chats } from "phosphor-react";
const PerInfo = () => {
    return (
        <div className="container">
            <div className="profile">
                Thông tin cá nhân
                <Row>
                    <Col className="avatarPTDetail" span={4}>
                        <img src={ava} className="imgPT" />
                    </Col>
                    <Col span={20} className="infoDetailPT">
                        <div className="namePTAndPosition">
                            Body building professor Duong Truong Giang
                        </div>
                        <div className="descriptionPTDetail">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Officia, recusandae sequi,
                        </div>
                        <div className="likeAndChat">
                            <span className="btnLike">
                                <ThumbsUp size={20} color="#fff" weight="fill" /> Like
                            </span>
                            <span className="btnChat">
                                <Chats size={20} color="#fff" weight="fill" />
                            </span>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};
export default PerInfo;