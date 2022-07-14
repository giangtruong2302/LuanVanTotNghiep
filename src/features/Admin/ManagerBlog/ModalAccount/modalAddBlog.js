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
import { CreateBlogSchema, CreateInfoSchema } from "./validation";
import { handleCreateNewBlog } from "./ModalAccountAPI";
import { getAllCenter } from "../../AdminAPI";
import { handleGetDetailManager } from "../../GymCenter/GymCenterAPI";
const { Option } = Select;
const CreateAccount = (props) => {
  const externalIdOfManager = useSelector(
    (state) => state.user.userInfo.ExternalId
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [differentPass, setDifferentPass] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [detailManager, setDetailManager] = useState();
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileSize, setFileSize] = useState();
  const [totalCenter, setTotalCenter] = useState();
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
  // console.log("check externalId of Manager: ", externalIdOfManager);

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
    getAllCenter(1)
      .then((res) => {
        setTotalCenter(res.centers.rows);
      })
      .catch((error) => {
        console.log(error);
      });

    handleGetDetailManager(externalIdOfManager)
      .then((res) => {
        if (res.managerDetail) {
          setDetailManager(res.managerDetail);
        }
      })
      .catch((error) => {
        message.error(error);
      });
  }, [props]);

  const handleCancel = () => {
    setIsModalVisible(false);
    props.handleModal(false);
  };
  const handleSubmitCreateBlog = useCallback(
    (values) => {
      // console.log("check values: ", values);
      //setDifferentPass(false)
      // const sdt = formatPhoneNumber(values.phoneNumber)
      try {
        setSaving(true);
        handleCreateNewBlog(
          values.title,
          values.content,
          imageUrl,
          fileName,
          detailManager?.id,
          values.centerId
        )
          .then((res) => {
            props.takeStatus("complete" + Date.now());
            message.success("create new blog is success !");
            props.handleModal(false);
          })
          .catch((error) => {
            setSaving(false);
            // console.log("check res data email: ", res);
            message.error("fail");
          });
      } catch (error) {
        console.log(error);
        setSaving(false);
      }
    },
    [dispatch, imageUrl, fileName]
  );
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
          <span className={classes.nameCreate}>Create New Blog</span>
        </div>
        <div className={classes.createStaffContainer}>
          <div className={classes.containerLeft}>
            <span className={classes.titleLeft}>Infomation</span>
            <div className={classes.formInfo}>
              <Formik
                validationSchema={CreateBlogSchema}
                initialValues={{
                  title: "",
                  content: "",
                  // managerId: "",
                  // avatar: "",
                  centerId: "",
                }}
                onSubmit={async (values) => {
                  // console.log("check values:", values);
                  setSaving(true);
                  handleSubmitCreateBlog(values);
                }}
              >
                {({ errors, touched, setFieldValue }) => {
                  return (
                    <Form>
                      <FormAnt.Item
                        style={{ marginTop: "10px" }}
                        validateStatus={
                          Boolean(touched?.title && errors?.title)
                            ? "error"
                            : "success"
                        }
                        help={
                          Boolean(touched?.title && errors?.title) &&
                          errors?.title
                        }
                      >
                        <Field name="title">
                          {({ field }) => (
                            <Input
                              {...field}
                              name="title"
                              className={` ${
                                touched?.title && errors?.title
                                  ? classes.inputError
                                  : ""
                              } ${classes.inputRecovery} ant-picker `}
                              placeholder="Title"
                            />
                          )}
                        </Field>
                      </FormAnt.Item>
                      <FormAnt.Item
                        //style={{ margin: '5px' }}
                        validateStatus={
                          Boolean(touched?.content && errors?.content)
                            ? "error"
                            : "success"
                        }
                        help={
                          Boolean(touched?.content && errors?.content) &&
                          errors?.content
                        }
                      >
                        <Field name="content">
                          {({ field }) => (
                            <Input.TextArea
                              style={{ height: "200px" }}
                              {...field}
                              name="content"
                              className={` ${
                                touched?.content && errors?.content
                                  ? classes.inputError
                                  : ""
                              } ${classes.inputRecovery} ant-picker `}
                              placeholder="Content"
                            />
                          )}
                        </Field>
                      </FormAnt.Item>
                      <FormAnt.Item
                        //style={{ margin: '5px' }}
                        validateStatus={
                          Boolean(touched?.centerId && errors?.centerId)
                            ? "error"
                            : "success"
                        }
                        help={
                          Boolean(touched?.centerId && errors?.centerId) &&
                          errors?.centerId
                        }
                      >
                        <Select
                          className={` ${
                            touched?.centerId && errors?.centerId
                              ? classes.inputError
                              : ""
                          } ${classes.inputRecovery} ant-picker `}
                          placeholder="Center"
                          onChange={(value) => {
                            setFieldValue("centerId", value);
                          }}
                        >
                          {totalCenter && totalCenter.length > 0
                            ? totalCenter.map((item, index) => {
                                return (
                                  <Option value={item.CenterId} key={index}>
                                    {item.CenterName}
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
                          "Create"
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
                  image={imageUrl ? imageUrl + " " : unknow}
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
export default CreateAccount;
