import { PictureOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Form as FormAnt,
  Input,
  message,
  Modal,
  Select,
  Upload,
} from "antd";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { useDispatch, useSelector } from "react-redux";
import unknow from "../../../../assets/images/imgStaff/dyno.jpg";
import StaggerAnimation from "../../../../component/StaggerAnimation";
import { Field, FieldProps, Form, Formik } from "formik";
import moment from "moment";
import { XCircle } from "phosphor-react";
import React, { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
// import { Area, Point } from "react-easy-crop/types";
import { toast } from "react-toastify";
import classes from "./styles.module.scss";
import { CreateCenterSchema, CreateServiceSchema } from "./validation";
import { handleUpdateCenter } from "./ModalServiceAPI";
import { getAllManager } from "../../ManageManager/accountAPI";
const { Option } = Select;
const UpdateService = (props) => {
  const [manager, setManager] = useState();
  // console.log("check props update: ", props);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [differentPass, setDifferentPass] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileSize, setFileSize] = useState();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [crop, setCrop] = useState({ x: 50, y: 50 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState();
  const [zoom, setZoom] = useState(1);
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
  const handleSubmitUpdateCenter = useCallback(
    (values) => {
      // console.log("check values: ", values);
      //setDifferentPass(false)
      // const sdt = formatPhoneNumber(values.phoneNumber)
      try {
        setSaving(true);
        handleUpdateCenter(
          values.CenterName,
          imageUrl,
          fileName,
          values.CenterAddress,
          values.CenterPhoneNumber,
          values.ManagerId,
          values.Status,
          props.data.id
        )
          .then((res) => {
            props.takeStatus("complete" + Date.now());
            props.handleModal(false);
            toast.success(res.message);
            if (res.data.success === true) {
              message.success("update service is success !");
            } else {
              message.error(res.data.data.email[0]);
            }
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
    getAllManager("", 1).then((res) => {
      setManager(res.manager.rows);
      for (let i = 2; i <= res.totalPage; i++) {
        getAllManager("", i)
          .then((res) => {
            if (res.manager) {
              const data = res.manager.rows;
              setManager((prev) => {
                if (prev !== undefined) return [...prev, ...data];
              });
            }
          })
          .catch((error) => console.log(error));
      }
    });
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
          <span className={classes.nameCreate}>Update Center</span>
        </div>
        <div className={classes.createStaffContainer}>
          <div className={classes.containerLeft}>
            <span className={classes.titleLeft}>Infomation</span>
            <div className={classes.formInfo}>
              <Formik
                validationSchema={CreateCenterSchema}
                initialValues={{
                  CenterName: props.data.CenterName,
                  CenterAddress: props.data.CenterAddress,
                  CenterPhoneNumber: props.data.CenterPhoneNumber,
                  ManagerId: props.data.ManagerId,
                  Status: props.data.Status,
                }}
                onSubmit={async (values) => {
                  console.log("check values:", values);
                  setSaving(true);
                  handleSubmitUpdateCenter(values);
                }}
              >
                {({ errors, touched, setFieldValue }) => {
                  return (
                    <Form>
                      <FormAnt.Item
                        style={{ marginTop: "10px" }}
                        validateStatus={
                          Boolean(touched?.CenterName && errors?.CenterName)
                            ? "error"
                            : "success"
                        }
                        help={
                          Boolean(touched?.CenterName && errors?.CenterName) &&
                          errors?.CenterName
                        }
                      >
                        <Field name="CenterName">
                          {({ field }) => (
                            <Input
                              {...field}
                              name="CenterName"
                              className={` ${
                                touched?.CenterName && errors?.CenterName
                                  ? classes.inputError
                                  : ""
                              } ${classes.inputRecovery} ant-picker `}
                              placeholder="Manager name"
                            />
                          )}
                        </Field>
                      </FormAnt.Item>
                      <FormAnt.Item
                        //style={{ margin: '5px' }}
                        validateStatus={
                          Boolean(
                            touched?.CenterAddress && errors?.CenterAddress
                          )
                            ? "error"
                            : "success"
                        }
                        help={
                          Boolean(
                            touched?.CenterAddress && errors?.CenterAddress
                          ) && errors?.CenterAddress
                        }
                      >
                        <Field name="CenterAddress">
                          {({ field }) => (
                            <Input
                              {...field}
                              name="CenterAddress"
                              className={` ${
                                touched?.CenterAddress && errors?.CenterAddress
                                  ? classes.inputError
                                  : ""
                              } ${classes.inputRecovery} ant-picker `}
                              placeholder="Center Address"
                            />
                          )}
                        </Field>
                      </FormAnt.Item>

                      <FormAnt.Item
                        //style={{ margin: '5px' }}
                        validateStatus={
                          Boolean(
                            touched?.CenterPhoneNumber &&
                              errors?.CenterPhoneNumber
                          )
                            ? "error"
                            : "success"
                        }
                        help={
                          Boolean(
                            touched?.CenterPhoneNumber &&
                              errors?.CenterPhoneNumber
                          ) && errors?.CenterPhoneNumber
                        }
                      >
                        <Field name="CenterPhoneNumber">
                          {({ field }) => (
                            <Input
                              {...field}
                              className={` ${
                                touched?.CenterPhoneNumber &&
                                errors?.CenterPhoneNumber
                                  ? classes.inputError
                                  : ""
                              } ${classes.inputRecovery} ant-picker `}
                              initialValueFormat="national"
                              placeholder="Phone number"
                              name="CenterPhoneNumber"
                            />
                          )}
                        </Field>
                      </FormAnt.Item>
                      <FormAnt.Item
                        //style={{ margin: '5px' }}
                        validateStatus={
                          Boolean(touched?.ManagerId && errors?.ManagerId)
                            ? "error"
                            : "success"
                        }
                        help={
                          Boolean(touched?.ManagerId && errors?.ManagerId) &&
                          errors?.ManagerId
                        }
                      >
                        <Select
                          className={` ${
                            touched?.ManagerId && errors?.ManagerId
                              ? classes.inputError
                              : ""
                          } ${classes.inputRecovery} ant-picker `}
                          placeholder="Manager "
                          defaultValue={props.data.ManagerId}
                          onChange={(value) => {
                            setFieldValue("ManagerId", value);
                          }}
                        >
                          {manager && manager.length > 0
                            ? manager.map((item, index) => {
                                return (
                                  <Option key={index} value={item.id}>
                                    {item.ManagerName}
                                  </Option>
                                );
                              })
                            : ""}
                        </Select>
                      </FormAnt.Item>
                      <button
                        className={classes.btnRecovery}
                        type="submit"
                        style={{ margin: "10px" }}
                      >
                        {saving ? (
                          <div style={{ marginLeft: "150px" }}>
                            <StaggerAnimation></StaggerAnimation>
                          </div>
                        ) : (
                          "Save"
                        )}
                      </button>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
          <div className={classes.lineMiddle}></div>
          <div className={classes.containerRight}>
            <span className={classes.titleRight}>Avatar</span>
            <div className={classes.changeThumbnailContainer}>
              <div className={classes.image}>
                <Cropper
                  image={imageUrl ? imageUrl + " " : props.data.CenterImage}
                  crop={crop}
                  zoom={zoom}
                  aspect={2 / 2}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>
              <div className={classes.changeImage}>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={handleChangeImage}
                >
                  {uploadButton}
                </Upload>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default UpdateService;
