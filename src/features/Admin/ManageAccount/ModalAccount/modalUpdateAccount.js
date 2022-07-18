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
import { CreateInfoSchema, UpdateInfoSchema } from "./validation";
import {
  handleCreateNewAcount,
  handleUpdateNewAcount,
} from "./ModalAccountAPI";
const { Option } = Select;
const UpdateAccount = (props) => {
  // console.log("check props update: ", props);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [differentPass, setDifferentPass] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
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
  const handleSubmitUpdateStaff = useCallback(
    (values) => {
      // console.log("check values: ", values);
      //setDifferentPass(false)
      // const sdt = formatPhoneNumber(values.phoneNumber)
      try {
        setSaving(true);
        handleUpdateNewAcount(
          values.email,
          values.password,
          values.fullName,
          imageUrl,
          fileName,
          values.userName,
          values.roleId,
          props.data.ExternalId,
          props.data.id
        )
          .then((res) => {
            message.success("update account is success !");
            props.handleModal(false);
            props.takeStatus("complete" + Date.now());
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
          <span className={classes.nameCreate}>Update Account</span>
          {differentPass ? (
            <p style={{ color: "#ff0000" }}>
              password is different current password
            </p>
          ) : (
            ""
          )}
        </div>
        <div className={classes.createStaffContainer}>
          <div className={classes.containerLeft}>
            <span className={classes.titleLeft}>Infomation</span>
            <div className={classes.formInfo}>
              <Formik
                validationSchema={UpdateInfoSchema}
                initialValues={{
                  email: props.data.email,
                  fullName: props.data.fullName,

                  userName: props.data.userName,
                  roleId: props.data.roleId,
                }}
                onSubmit={async (values) => {
                  // console.log("check values:", values);
                  setSaving(true);
                  handleSubmitUpdateStaff(values);
                }}
              >
                {({ errors, touched, setFieldValue }) => {
                  return (
                    <Form>
                      <FormAnt.Item
                        style={{ marginTop: "10px" }}
                        validateStatus={
                          Boolean(touched?.fullName && errors?.fullName)
                            ? "error"
                            : "success"
                        }
                        help={
                          Boolean(touched?.fullName && errors?.fullName) &&
                          errors?.fullName
                        }
                      >
                        <Field name="fullName">
                          {({ field }) => (
                            <Input
                              {...field}
                              name="fullName"
                              className={` ${
                                touched?.fullName && errors?.fullName
                                  ? classes.inputError
                                  : ""
                              } ${classes.inputRecovery} ant-picker `}
                              placeholder="Full name"
                            />
                          )}
                        </Field>
                      </FormAnt.Item>
                      <FormAnt.Item
                        //style={{ margin: '5px' }}
                        validateStatus={
                          Boolean(touched?.userName && errors?.userName)
                            ? "error"
                            : "success"
                        }
                        help={
                          Boolean(touched?.userName && errors?.userName) &&
                          errors?.userName
                        }
                      >
                        <Field name="userName">
                          {({ field }) => (
                            <Input
                              {...field}
                              name="userName"
                              className={` ${
                                touched?.userName && errors?.userName
                                  ? classes.inputError
                                  : ""
                              } ${classes.inputRecovery} ant-picker `}
                              placeholder="user name"
                            />
                          )}
                        </Field>
                      </FormAnt.Item>
                      <FormAnt.Item
                        //style={{ margin: '5px' }}
                        validateStatus={
                          Boolean(touched?.roleId && errors?.roleId)
                            ? "error"
                            : "success"
                        }
                        help={
                          Boolean(touched?.roleId && errors?.roleId) &&
                          errors?.roleId
                        }
                      >
                        <Select
                          className={` ${
                            touched?.roleId && errors?.roleId
                              ? classes.inputError
                              : ""
                          } ${classes.inputRecovery} ant-picker `}
                          placeholder="Role"
                          defaultValue={props.data.roleId}
                          onChange={(value) => {
                            setFieldValue("roleId", value);
                          }}
                        >
                          <Option value="1">Admin</Option>
                          <Option value="2">Manager of Center</Option>
                          <Option value="3">PT</Option>
                          <Option value="4">Lễ tân</Option>
                          <Option value="5">Customer</Option>
                        </Select>
                      </FormAnt.Item>

                      <span className={classes.titleLeft}>Login info</span>
                      <FormAnt.Item
                        style={{ marginTop: "20px" }}
                        validateStatus={
                          Boolean(touched?.email && errors?.email)
                            ? "error"
                            : "success"
                        }
                        help={
                          Boolean(touched?.email && errors?.email) &&
                          errors?.email
                        }
                      >
                        <Field name="email">
                          {({ field }) => (
                            <Input
                              {...field}
                              name="email"
                              className={` ${
                                touched?.email && errors?.email
                                  ? classes.inputError
                                  : ""
                              } ${classes.inputRecovery} ant-picker `}
                              placeholder="Email"
                            />
                          )}
                        </Field>
                      </FormAnt.Item>

                      <button
                        className={classes.btnRecovery}
                        type="submit"
                        style={{ margin: "10px" }}
                      >
                        {saving ? (
                          <div style={{ marginLeft: "99px" }}>
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
                  image={imageUrl ? imageUrl + " " : props.data.avatar}
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
export default UpdateAccount;
