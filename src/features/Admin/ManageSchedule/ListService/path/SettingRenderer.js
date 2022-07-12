import { Menu, message, Modal, Popover } from "antd";
import "antd/dist/antd.css";
import {
  Buildings,
  CheckSquareOffset,
  Gear,
  Password,
  XCircle,
} from "phosphor-react";
import React, { useState } from "react";
import "./customizeListPT.scss";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import UpdateService from "../../ModalService/modalUpdateService";
import { handleChangeStatusOfCenter } from "../../ModalService/ModalServiceAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const { confirm } = Modal;

const SettingRenderer = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [StatusOfCenter, setStatusOfCenter] = useState();
  const [showPopOver, setShowPopOver] = useState(false);
  const handleModal = (isVisible) => {
    setShowModal(isVisible);
  };
  const [status, setStatus] = useState("");
  const takeStatus = (value) => {
    setStatus(value);
    props.colDef.action.action1("update" + Date.now());
  };
  const navigate = useNavigate();
  const gotoCenter = () => {
    navigate(`/admin/manage-center`);
  };
  useEffect(() => {
    if (props.data.Status === 0) {
      setStatusOfCenter(1);
    } else if (props.data.Status === 1) {
      setStatusOfCenter(0);
    }
  }, []);
  function confirmDelete() {
    confirm({
      title: `Do you want to change status of Center ${props.data.CenterName} ${
        // props.data.firstName + " " + props.data.lastName
        ""
      }`,
      icon: <ExclamationCircleOutlined />,
      centered: true,
      // content: 'When clicked the OK button, this dialog will be closed after 1 second',
      onOk() {
        // console.log("check id: ", props.data.id);

        return handleChangeStatusOfCenter(
          parseInt(props.data.id),
          StatusOfCenter
        )
          .then((res) => {
            toast.success("Success");
            props.colDef.action.action1("delete" + Date.now());
            if (res.errCode === 0) {
              toast.success("Success");
              props.colDef.action.action1("delete" + Date.now());
            }
          })
          .catch(() => {
            message.error("Failure");
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
        key="1"
        onClick={() => {
          setShowPopOver(false);
          setShowModal(true);
        }}
        style={{ color: "#53d1b6" }}
      >
        <CheckSquareOffset size={18} color="#53d1b6" weight="fill" />
        UPDATE CENTER INFO
      </Menu.Item>
      <Menu.Item key="2" onClick={gotoCenter} style={{ color: "#53d1b6" }}>
        <Buildings size={18} color="#53d1b6" weight="fill" />
        GO TO CENTER
      </Menu.Item>
      {/* <Menu.Item
        key="3"
        // onClick={confirmResetPassword}
        style={{ color: "#53d1b6" }}
      >
        <Password size={18} color="#53d1b6" weight="fill" />
        RESET PASSWORD
      </Menu.Item> */}
      <Menu.Item key="4" onClick={confirmDelete} style={{ color: "#FD409A" }}>
        <XCircle size={18} color="#FD409A" weight="fill" />
        CHANGE STATUS
      </Menu.Item>
    </Menu>
  );

  const handleClickChange = (visible) => {
    setShowPopOver(visible);
  };
  console.log("check show popover: ", showPopOver);
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
        <UpdateService
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
