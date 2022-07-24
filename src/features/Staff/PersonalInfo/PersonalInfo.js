import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Col,
  PageHeader,
  Row,
  Button,
  message,
  Upload,
} from "antd";
import ava from "../../../assets/images/imgStaff/staff.png";
import { useParams } from "react-router-dom";
import { getPTDetail } from "./PersonalInfoAPI";
import { Form, Input, Select } from "antd";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { updateStaffDetail } from "./PersonalInfoAPI";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./PersonalInfo.scss";
import { PictureOutlined } from "@ant-design/icons";
import NoneAvatar from "../../../assets/images/logo/noneAvatar.jpg";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import { FormattedMessage } from "react-intl";
const { Option } = Select;
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "74%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const PersonalInfoStaff = () => {
  const options = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  const navigate = useNavigate();
  const staffInfo = useSelector((state) => state.staff.staffInfo);
  const [infoDetail, setInfoDetail] = useState();
  const [noInfoDetail, setNoInfoDetail] = useState(false);
  const [, setInfoDetailLoading] = useState(true);
  const id = useParams();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [form] = Form.useForm();
  const [fileType, setFileType] = useState();
  const [fileSize, setFileSize] = useState();
  const [statusPage, setStatusPage] = useState("");
  const beforeUpload = (file) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/svg" ||
      file.type === "image/jpg";
    const fileType = file.type?.split("/")[1];
    fileType && setFileType(fileType);
    if (!isJpgOrPng) {
      message.error("you can only upload file JPG/PNG?SVG/JPEG !");
    }
    if (file.size) {
      const isLt5M = file.size / 1024 / 1024 < 5;
      setFileSize(file.size / 1024 / 1024 < 1 ? 1 : file.size / 1024 / 1024);
      if (!isLt5M) {
        message.error("Your image must smaller than 5MB");
      }
      return isJpgOrPng && isLt5M;
    }
    return isJpgOrPng;
  };
  const [loading, setLoading] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [fileName, setFileName] = useState();
  const getBase64 = (img, callback) => {
    setLoading(false);
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  console.log("");
  const handleChangeImage = async (info) => {
    setLoading(true);
    if (info.file) {
      getBase64(info.file.originFileObj, (imgUrl) => {
        setImageUrl(imgUrl);
        setFileName(info.file.name);
        setLoading(false);
      });
    }
  };
  const uploadButton = (
    <div className="btnUpload">
      {loading ? <PictureOutlined /> : <PictureOutlined />}
      <div className="text"> <FormattedMessage id="formInfoCus.changeImg" /></div>
    </div>
  );

  const onFinish = (values) => {
    updateStaffDetail(
      infoDetail.id,
      staffInfo["ExternalId"],
      values.fullName,
      values.email,
      imageUrl,
      fileName,
      values.phoneNumber,
      values.Gender,
      values.address,
      staffInfo["roleId"],
      values.DayOfBirth,
      infoDetail.CenterId,
      infoDetail.SalaryId
    ).then((response) => {
      if (response.errorCode === 0) {
        toast.success("Success", options);
        setStatusPage(Date.now());
      } else {
        toast.error("Fail", options);
      }
    });
  };
  const onReset = () => {
    form.resetFields();
  };
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#000";
  }

  function closeModal() {
    setIsOpen(false);
  }
  let subtitle;

  useEffect(() => {
    if (staffInfo) {
      getPTDetail(staffInfo["ExternalId"])
        .then((response) => {
          if (response.staffDetail) {
            setInfoDetail(response.staffDetail);
            setNoInfoDetail(false);
          } else {
            setNoInfoDetail(true);
          }
        })
        .catch(() => {
          setNoInfoDetail(true);
        })
        .finally(() => {
          setInfoDetailLoading(false);
        });
    } else {
      navigate(`/staff-login`);
    }
  }, [statusPage]);
  return (
    <div className="StaffDetailContainer">
      <div className="backToHome">
        <NavLink to="/staff-personal-page" className="backtoHome">
          <ArrowLeft size={24} color="#ffffff" weight="duotone" />
          <div className="textBackToHome"><FormattedMessage id="header.back-to-home" /></div>
        </NavLink>
        <div></div>
      </div>
      <div className="StaffProfile">
        <div className="StaffDetailContent">
          <Row className="contentInfo">
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
                <Col className="avatarCusDetail" span={4}>
                  <img
                    src={
                      infoDetail?.StaffImage
                        ? infoDetail?.StaffImage
                        : NoneAvatar
                    }
                    className="imgStaff"
                  />
                </Col>
                <Col span={20} className="infoDetailStaff">
                  <div className="nameStaffAndPosition">
                    <FormattedMessage id="cusInfo.hello" />, {infoDetail?.StaffName} !
                  </div>
                  <div className="descriptionCusDetail">
                    <div><FormattedMessage id="cusInfo.email" /> : {infoDetail?.StaffEmail} </div>
                    <div><FormattedMessage id="cusInfo.phoneNumber" /> : {infoDetail?.StaffPhoneNumber} </div>
                    <div><FormattedMessage id="cusInfo.dayOfBirth" /> : {infoDetail?.DayOfBirth} </div>
                    <div>
                      <FormattedMessage id="cusInfo.gender" /> : {infoDetail?.Gender === true ? "Nam" : "Nữ"}{" "}
                    </div>
                    <div><FormattedMessage id="cusInfo.address" /> : {infoDetail?.Address} </div>
                  </div>
                  <div className="likeAndChat">
                    <span>
                      <button className={"btn-sua"} onClick={openModal}>
                        <FormattedMessage id="cusInfo.change" />
                      </button>
                    </span>
                  </div>
                  <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                  >
                    <h1><FormattedMessage id="formInfoCus.form-title" /></h1>
                    <div ref={(_subtitle) => (subtitle = _subtitle)}>
                      <Form
                        form={form}
                        name="control-hooks"
                        onFinish={onFinish}
                      >
                        <FormattedMessage id="formInfoCus.fullName" /> :
                        <Form.Item
                          name="fullName"

                        >
                          <Input defaultValue={infoDetail?.StaffName} />
                        </Form.Item>
                        <FormattedMessage id="formInfoCus.email" /> :
                        <Form.Item
                          name="email"

                        >
                          <Input defaultValue={infoDetail?.StaffEmail} />
                        </Form.Item>
                        <FormattedMessage id="formInfoCus.gender" /> :
                        <Form.Item
                          name="Gender"

                        >
                          <Select defaultValue={infoDetail?.Gender}>
                            <Option value={true}>Nam</Option>
                            <Option value={false}>Nữ</Option>
                          </Select>
                        </Form.Item>
                        <FormattedMessage id="formInfoCus.phoneNumber" /> :
                        <Form.Item
                          name="phoneNumber"

                        >
                          <Input defaultValue={infoDetail?.StaffPhoneNumber} />
                        </Form.Item>
                        <FormattedMessage id="formInfoCus.address" /> :
                        <Form.Item
                          name="address"

                        >
                          <Input defaultValue={infoDetail?.Address} />
                        </Form.Item>
                        <FormattedMessage id="formInfoCus.dayOfBirth" /> :
                        <Form.Item
                          name="DayOfBirth"

                        >
                          <Input defaultValue={infoDetail?.DayOfBirth} />
                        </Form.Item>
                        <FormattedMessage id="formInfoCus.avatar" /> :
                        <Form.Item
                          name="image"
                          defaultValue={infoDetail?.StaffImage}
                        >
                          <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={true}
                            beforeUpload={beforeUpload}
                            onChange={handleChangeImage}

                          >
                            {uploadButton}
                          </Upload>
                        </Form.Item>
                        <ToastContainer />
                        <Button type="primary" htmlType="submit">
                          <FormattedMessage id="formInfoCus.submit" />
                        </Button>

                      </Form>
                    </div>
                  </Modal>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default PersonalInfoStaff;
