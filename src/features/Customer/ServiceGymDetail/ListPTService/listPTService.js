import React, { useState, useEffect } from "react";
// import "antd/dist/antd.css";
import "./listPTService.scss";
import { List, Avatar, Space, Select } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import PTShedule from "../../GymCenterDetail/PtSchedule/PtSchedule";
import { getPtOfService } from "./listPTServiceAPI";

const { Option } = Select;
const ListPTService = () => {
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
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };
  const [PtOfCenter, setPtOfCenter] = useState();
  const [noPtOfCenter, setNoPtOfCenter] = useState(false);
  const [, setPtOfCenterLoading] = useState(true);
  const [center, SetCenter] = useState();
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    getPtOfService(1, 1).then((response) => {
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
    <div className="listPTServiceContainer">
      <div className="filterCenter">
        <Select
          showSearch
          placeholder="Tất cả cơ sở"
          optionFilterProp="children"
          onSearch={onSearch}
          onChange={onChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          <Option value="allCenter">Tất cả cơ sở</Option>
          <Option value="1">Cơ sở quận 1</Option>
          <Option value="2">Cơ sở quận 10</Option>
        </Select>
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
                <PTShedule ptId={item.StaffId} />
              </div>
            }
          >

            <NavLink to={`/pt-detail/${item.StaffId}`}>

              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
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
export default ListPTService;
