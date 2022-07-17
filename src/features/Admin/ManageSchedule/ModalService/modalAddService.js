import { PictureOutlined } from "@ant-design/icons";
import {
  Col,
  DatePicker,
  Form as FormAnt,
  Input,
  Menu,
  message,
  Modal,
  Popover,
  Row,
  Select,
  Upload,
} from "antd";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { useDispatch, useSelector } from "react-redux";
import unknow from "../../../../assets/images/imgStaff/dyno.jpg";
import StaggerAnimation from "../../../../component/StaggerAnimation";
import { Field, FieldProps, Form, Formik } from "formik";
import moment from "moment";
import { CheckSquareOffset, Plus, XCircle } from "phosphor-react";
import React, { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
// import { Area, Point } from "react-easy-crop/types";
import { toast, ToastContainer } from "react-toastify";
import classes from "./styles.module.scss";
import { CreateCenterSchema } from "./validation";
import { TimePicker } from "antd";
// import moment from 'moment';
// import React from 'react';
import {
  handleCreateNewCenter,
  handleGetAllTimeWorking,
} from "./ModalServiceAPI";
import { getAllManager } from "../../ManageManager/accountAPI";
const { Option } = Select;
const format = "HH:mm";

const CreateTimeWorking = (props) => {
  const [manager, setManager] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [differentPass, setDifferentPass] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [timeWorking, setTimeWorking] = useState();
  const [showPopOver, setShowPopOver] = useState(false);
  const [fileType, setFileType] = useState("");
  const [fileSize, setFileSize] = useState();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [crop, setCrop] = useState({ x: 50, y: 50 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState();
  const [zoom, setZoom] = useState(1);
  const onChangeStartTime = (value) => {
    console.log("check start time: ", value._d);
  };
  const onChangeEndTime = (value) => {
    console.log("check end time ", value._d);
  };
  const content = (
    <Menu>
      <Menu.Item
        key="2"
        onClick={() => {
          // setShowPopOver(false);
          // setShowModal(true);
        }}
        style={{ height: "100%" }}
      >
        <>
          <div style={{ fontSize: "16px", fontWeight: "700" }}>
            Create new Time Working
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              Start Time
              <TimePicker
                defaultValue={moment("12:08", format)}
                format={format}
                onChange={onChangeStartTime}
              />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              End Time
              <TimePicker
                defaultValue={moment("12:08", format)}
                format={format}
                onChange={onChangeEndTime}
              />
            </div>
            <button
              style={{
                border: "1px solid transparent",
                borderRadius: "6px",
                background: "#07cd04",
                color: "#fff",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              Add
            </button>
          </div>
        </>
      </Menu.Item>
    </Menu>
  );
  const handleClickChange = (visible) => {
    setShowPopOver(visible);
  };
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
  const onCropComplete = useCallback((_croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
    setLoading(false);
  }, []);
  const currentSalon = useSelector((state) => state.currentSalon);
  const dispatch = useDispatch();
  const handleSubmitCreateStaff = useCallback(
    (values) => {
      // console.log("check values: ", values);
      //setDifferentPass(false)
      // const sdt = formatPhoneNumber(values.phoneNumber)
      try {
        setSaving(true);
        handleCreateNewCenter(
          values.CenterName,
          imageUrl,
          fileName,
          values.CenterAddress,
          values.CenterPhoneNumber,
          values.ManagerId,
          values.Status
        )
          .then((res) => {
            if (res.errCode === 0) {
              message.success("create new center is success");
            } else {
              message.error(res.message);
            }
            props.handleModal(false);
            props.takeStatus("complete" + Date.now());

            toast.success("create new staff account is success !");
          })
          .catch((res) => {
            setSaving(false);
            // console.log("check res data email: ", res);
            message.error(res.data.data.email);
          })
          .finally(() => {
            props.takeStatus("complete");
          });
      } catch (error) {
        console.log(error);
        setSaving(false);
      }
    },
    [dispatch, imageUrl, fileName]
  );
  const getBase64 = (img, callback) => {
    setLoading(false);
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
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
  // console.log(imageUrl, fileName);
  const uploadButton = (
    <div className={classes.btnUpload}>
      {loading ? <PictureOutlined /> : <PictureOutlined />}
      <div className={classes.text}>Change Image</div>
    </div>
  );

  useEffect(() => {
    if (props.showModal) {
      setIsModalVisible(true);
    }
  }, [props]);
  useEffect(() => {
    try {
      handleGetAllTimeWorking(1)
        .then((res) => {
          if (res.time) {
            setTimeWorking(res.time.rows);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleCancel = () => {
    setIsModalVisible(false);
    props.handleModal(false);
  };
  return (
    <>
      <Modal
        centered
        visible={isModalVisible}
        width="847px"
        onCancel={handleCancel}
        closable={true}
        closeIcon={<XCircle size={32} color="#fff" weight="fill" />}
        className={classes.createStaff}
      >
        <div className={classes.titleCreateStaff}>
          <span className={classes.nameCreate}>Create New Time Working</span>
        </div>
        <div className={classes.createStaffContainer}>
          <div className={classes.currentWorkingHour}>
            <p className={classes.textCurrentWorkingHour}>
              Số ca làm trong ngày hiện tại là:
            </p>
          </div>
          <Row className={classes.timeWorkingHour}>
            {timeWorking && timeWorking.length > 0
              ? timeWorking.map((item, index) => {
                  return (
                    <Col span={5} className={classes.hourOfDay}>
                      <XCircle
                        size={22}
                        color="#cbc8c8"
                        weight="fill"
                        className={classes.deleteIcon}
                      />
                      <p className={classes.textHour}>
                        {item.StartTime} - {item.EndTime}
                      </p>
                    </Col>
                  );
                })
              : ""}
            <Popover
              content={content}
              trigger={"click"}
              showPopOver={showPopOver}
              placement="right"
              onVisibleChange={handleClickChange}
            >
              <Col span={5} className={classes.plusHour}>
                <p className={classes.textHour}>
                  <Plus color="#000" weight="fill" size={32} />
                </p>
              </Col>
            </Popover>
          </Row>
        </div>
      </Modal>
    </>
  );
};
export default CreateTimeWorking;
