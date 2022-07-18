import { Menu, message, Modal, Popover } from "antd";
import "antd/dist/antd.css";
import {
  CheckSquareOffset,
  Gear,
  Password,
  UserCircle,
  XCircle,
} from "phosphor-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./customizeListPT.scss";
import { ExclamationCircleOutlined } from "@ant-design/icons";
// import UpdateAccount from "../../ModalManager/modalUpdateAccount";
// import { handleDeleteManager } from "../../ModalManager/ModalAccountAPI";
// import UpdateStaff from "../../ModalManager/modalUpdateStaff";
// import { handleDeleteStaff } from "../../ModalManager/ModalAccountAPI";
import { toast } from "react-toastify";
import UpdateCustomer from "../../ModalManager/modalUpdateCustomer";
import { handleDeleteStaff } from "../../ModalManager/ModalAccountAPI";
const { confirm } = Modal;

const SettingRenderer = (props) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const [showPopOver, setShowPopOver] = useState(false);
  const handleModal = (isVisible) => {
    setShowModal(isVisible);
  };
  const [status, setStatus] = useState("");
  const takeStatus = (value) => {
    setStatus(value);
    props.colDef.action.action1("update" + Date.now());
  };
  const handleViewCusInfo = () => {
    navigate(`/admin/view-customer-info/${props.data.id}`);
  };
  function confirmDelete() {
    confirm({
      title: `Do you want to delete ${
        // props.data.firstName + " " + props.data.lastName
        ""
      }`,
      icon: <ExclamationCircleOutlined />,
      centered: true,
      // content: 'When clicked the OK button, this dialog will be closed after 1 second',
      onOk() {
        // return console.log("role id: ");
        return handleDeleteStaff(
          props.data.ExternalId,
          props.data.RoleId,
          props.data.id
        )
          .then((res) => {
            toast.success("delete success");
            props.colDef.action.action1("delete" + Date.now());
          })
          .catch((error) => {
            console.log(error);
          });
      },
      onCancel() {
        ("");
      },
    });
  }
  const content = (
    <Menu>
      <Menu.Item
        key="2"
        onClick={() => setShowModal(true)}
        style={{ color: "#53d1b6" }}
      >
        <CheckSquareOffset size={18} color="#53d1b6" weight="fill" />
        UPDATE CUSTOMER INFO
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={handleViewCusInfo}
        style={{ color: "#53d1b6" }}
      >
        <UserCircle size={18} color="#53d1b6" weight="fill" />
        VIEW CUSTOMER INFO
      </Menu.Item>
      <Menu.Item key="4" onClick={confirmDelete} style={{ color: "#FD409A" }}>
        <XCircle size={18} color="#FD409A" weight="fill" />
        DELETE STAFF
      </Menu.Item>
    </Menu>
  );
  const handleClickChange = (visible) => {
    setShowPopOver(visible);
  };
  // console.log("check show popover: ", showPopOver);
  // console.log("check props setting: ", props.data);
  return (
    <>
      <Popover
        content={content}
        trigger={"click"}
        showPopOver={showPopOver}
        placement="right"
        onVisibleChange={handleClickChange}
      >
        <div className="settingContainer">
          <Gear color="#0a0700" weight="light" />
        </div>
      </Popover>
      {showModal && (
        <UpdateCustomer
          handleModal={handleModal}
          showModal={showModal}
          data={props.data}
          takeStatus={takeStatus}
        />
      )}
    </>
  );
};
export default SettingRenderer;
