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
                        <img src={ava} className="imgCus" />
                    </Col>
                    <Col span={20} className="infoDetailCus">
                        <div className="nameCusAndPosition">
                            Hello, Duong Truong Giang
                        </div>
                        <div className="descriptionCusDetail">
                            <div className="address">Address : </div>
                            <div className="phonenumber">Phone Number : </div>

                        </div>
                        <div className="cusDetail">
                            <div className="gender">Gender : </div>
                            <div className="birth">Day of Birth : </div>
                        </div>

                    </Col>
                </Row>
            </div>
        </div>
    );
};
export default PerInfo;