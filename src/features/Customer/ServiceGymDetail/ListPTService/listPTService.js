import React from "react";
// import "antd/dist/antd.css";
import "./listPTService.scss";
import { List, Avatar, Space, Select } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import PTShedule from "../../PTDetail/PTShedule/PTShedule";

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
          <Option value="distrist8">Cơ sở quận 8</Option>
          <Option value="distrist1">Cơ sở quận 1</Option>
          <Option value="distristBT">Cơ sở Bình Tân</Option>
          <Option value="distrist10">Cơ sở quận 10</Option>
        </Select>
      </div>
      <List
        // style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        // className="listPTServiceItems"
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={data}
        footer={
          <div>
            <b>GH Gym</b> Danh sách PT
          </div>
        }
        renderItem={(item) => (
          <List.Item
            className="itemPTService"
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
                <PTShedule />
              </div>
            }
          >
            <NavLink to="/pt-detail/1">
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
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
