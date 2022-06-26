import { Popover } from "antd";
import { Gear } from "phosphor-react";
import React from "react";
import "./customizeListPT.scss";

const SettingRenderer = () => {
  return (
    <>
      <Popover trigger={"click"}>
        <div className="settingContainer">
          <Gear color="#0a0700" weight="light" />
        </div>
      </Popover>
    </>
  );
};
export default SettingRenderer;
