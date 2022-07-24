import React, { useState, useEffect } from "react";
// import "antd/dist/antd.css";
import "./listPTService.scss";
import { List, Avatar, Space, Select } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import PTShedule from "../ScheduleWorking/PtSchedule";
import { getPtOfService } from "./listPTServiceAPI";
import { useParams } from "react-router-dom";
import ListItem from "./ListItem";
import { FormattedMessage } from "react-intl";
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
  const [PtOfService, setPtOfService] = useState();
  const [noPtOfService, setNoPtOfService] = useState(false);
  const [, setPtOfServiceLoading] = useState(true);
  const [center, SetCenter] = useState();
  const [totalPage, setTotalPage] = useState(0);
  const [selectCenterId, setSelectSenterId] = useState(1);
  const [centerId, setCenterId] = useState()
  const [ptDetail, setptDetail] = useState();
  const [noptDetail, setNoptDetail] = useState(false);
  const [, setptDetailLoading] = useState(true);
  const id = useParams();
  useEffect(() => {

    getPtOfService(id.id, 1).then((response) => {

      if (response.staffOfService.rows.length > 0) {
        setPtOfService(response.staffOfService.rows);
        setNoPtOfService(false);
      } else {
        setNoPtOfService(true);
      }
    })
      .catch(() => {
        setNoPtOfService(true);
      })
      .finally(() => {
        setPtOfServiceLoading(false);
      });


  }, []);


  return (
    <div className="listPTServiceContainer">

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
        dataSource={PtOfService}
        footer={
          <div>
            <b>GH Gym</b>  <FormattedMessage id="pt.list-pt" />
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
                <PTShedule ptId={item.StaffId} ptName={item.StaffName} />
              </div>
            }
          >

            <NavLink to={`/pt-detail/${item.StaffId}`}>
              <ListItem data={item} />

            </NavLink>

            {item.content}
          </List.Item>
        )}
      />
    </div>
  );
};
export default ListPTService;
