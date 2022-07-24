import React, { useState, useEffect } from "react";
// import "antd/dist/antd.css";
import "./lisPtOfCenter.scss";
import { List, Avatar, Space, Select } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import PTShedule from "../PtSchedule/PtSchedule";
import { getPtOfCenter } from "./listPtOfCenterAPI";
import { useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const ListPTCenter = () => {
    const data = Array.from({
        length: 37,
    }).map((_, i) => ({
        title: `personal trainer ${i}`,
        avatar: "https://joeschmoe.io/api/v1/random",
        description:
            "Ant Design, a design language for background applications, is refined by Ant UED Team.",
        content:
            "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
    }));

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );
    const [PtOfCenter, setPtOfCenter] = useState();
    const [noPtOfCenter, setNoPtOfCenter] = useState(false);
    const [, setPtOfCenterLoading] = useState(true);
    const id = useParams();
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        getPtOfCenter(id.id, 1).then((response) => {
            if (response.ptOfCenter.rows) {
                console.log(response.ptOfCenter)
                setTotalPage(response.totalPage)
                setPtOfCenter(response.ptOfCenter.rows);
                setNoPtOfCenter(false);
            } else {
                setNoPtOfCenter(true);
            }
        })
            .catch(() => {
                setNoPtOfCenter(true);
            })
            .finally(() => {
                setPtOfCenterLoading(false);
            });
    }, []);


    return (
        <div className="listPTCenterContainer">
            <div className="filterCenter">
                <h5><FormattedMessage id="gymDetail.pt-of-center" /></h5>
            </div>
            <List
                // style={{ display: "flex", flexDirection: "column", gap: "15px" }}
                // className="listPTCenterItems"
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 5,
                }}
                dataSource={PtOfCenter}
                footer={
                    <div>
                        <b>GH Gym</b> Danh sách PT
                    </div>
                }
                renderItem={(item) => (
                    <List.Item
                        className="itemPTCenter"
                        key={item.title}
                        actions={[
                            <IconText
                                icon={StarOutlined}
                                text="156"
                                key="list-vertical-star-o"
                            />,
                            <IconText
                                icon={LikeOutlined}
                                text="156"
                                key="list-vertical-like-o"
                            />,
                            <IconText
                                icon={MessageOutlined}
                                text="2"
                                key="list-vertical-message"
                            />,
                        ]}
                        extra={
                            <div className="ptSchedule">
                                <PTShedule ptId={item.id} ptName={item.StaffName} centerId={item.CenterId} />
                            </div>
                        }
                    >

                        <NavLink to={`/pt-detail/${item.id}`}>

                            <List.Item.Meta
                                avatar={(item.StaffImage === "" ? <Avatar icon={<UserOutlined />} /> : <Avatar src={item.StaffImage} />)}
                                title={<a href={item.href}>{item.StaffName}</a>}
                                description={item.StaffEmail + " SĐT: " + item.StaffPhoneNumber}

                            />
                        </NavLink>

                        {item.content}
                    </List.Item>
                )}
            />
        </div>
    );
};
export default ListPTCenter;
