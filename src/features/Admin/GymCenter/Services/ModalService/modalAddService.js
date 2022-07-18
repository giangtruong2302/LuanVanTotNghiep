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
import unknow from "../../../../../assets/images/imgStaff/dyno.jpg";
import StaggerAnimation from "../../../../../component/StaggerAnimation";
import { Field, FieldProps, Form, Formik } from "formik";
import moment from "moment";
import { XCircle } from "phosphor-react";
import React, { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
// import { Area, Point } from "react-easy-crop/types";
import { toast, ToastContainer } from "react-toastify";
import classes from "./styles.module.scss";
import { CreateServiceSchema } from "./validation";
import { handleCreateNewService } from "./ModalServiceAPI";
const { Option } = Select;
const CreateService = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [differentPass, setDifferentPass] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
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
  const handleSubmitCreateStaff = useCallback(
    (values) => {
      // console.log("check values: ", values);
      //setDifferentPass(false)
      // const sdt = formatPhoneNumber(values.phoneNumber)
      try {
        setSaving(true);
        handleCreateNewService(
          values.ServiceName ? values.ServiceName : "",
          values.WorkDuration ? values.WorkDuration : "",
          values.Price ? values.Price : "",
          ""
        )
          .then((res) => {
            if (res.data.success === true) {
              props.handleModal(false);
            } else {
              message.error(res.data.data.email[0]);
            }
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
    [dispatch]
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
        width="500px"
        onCancel={handleCancel}
        closable={true}
        closeIcon={<XCircle size={32} color="#fff" weight="fill" />}
        className={classes.createStaff}
      >
        <div className={classes.titleCreateStaff}>
          <span className={classes.nameCreate}>Create New Service</span>
          {/* {differentPass ? (
            <p style={{ color: "#ff0000" }}>
              password is different current password
            </p>
          ) : (
            ""
          )} */}
        </div>
        <div className={classes.createStaffContainer}>
          <div className={classes.formInfo}>
            <Formik
              validationSchema={CreateServiceSchema}
              initialValues={{
                ServiceName: "",
                WorkDuration: "",
                Price: "",
                // // avatar: "",
                // isActive: true,
                // userName: "",
                // roleId: "",
                // gender: "",
                // dob: "",
                // address: "",
              }}
              onSubmit={async (values) => {
                // console.log("check values:", values);
                setSaving(true);
                handleSubmitCreateStaff(values);
                // let newValues: CreateStaffAccountType = values
                // if (imageUrl && croppedAreaPixels) {
                //   const croppedImage = await getCroppedImg(
                //     imageUrl,
                //     croppedAreaPixels,
                //   )
                //   if (fileSize && croppedImage) {
                //     const metadata: ImagePresignedS3Type = {
                //       images: [
                //         {
                //           ext: fileType,
                //           size: parseInt(fileSize.toFixed(0)),
                //         },
                //       ],
                //     }
                //     doGetPresignedUrlS3(metadata).then((res) => {
                //       const { data } = res
                //       if (data.data) {
                //         doPutPresignedUrl(
                //           data.data.urls[0],
                //           croppedImage,
                //         ).then(() => {
                //           newValues = {
                //             ...newValues,
                //             avatar: data.data.urls[0].split('?')[0],
                //           }
                //           handleSubmitCreateStaff(newValues)
                //           // CreateAccountStaff(7, newValues)
                //           //   .then(() => {
                //           //     message.success('Success')
                //           //   })
                //           //   .catch(() => {
                //           //     message.error('Failure')
                //           //   })
                //           //   .finally(() => {
                //           //     setSaving(false)
                //           //     props.handleModal(false)
                //           //   })
                //         })
                //       }
                //     })
                //   }
                // } else {
                //   handleSubmitCreateStaff(values)
                // }
              }}
            >
              {({ errors, touched, setFieldValue }) => {
                return (
                  <Form>
                    <FormAnt.Item
                      style={{ marginTop: "10px" }}
                      validateStatus={
                        Boolean(touched?.ServiceName && errors?.ServiceName)
                          ? "error"
                          : "success"
                      }
                      help={
                        Boolean(touched?.ServiceName && errors?.ServiceName) &&
                        errors?.ServiceName
                      }
                    >
                      <Field name="ServiceName">
                        {({ field }) => (
                          <Input
                            {...field}
                            name="ServiceName"
                            className={` ${
                              touched?.ServiceName && errors?.ServiceName
                                ? classes.inputError
                                : ""
                            } ${classes.inputRecovery} ant-picker `}
                            placeholder="Service Name"
                          />
                        )}
                      </Field>
                    </FormAnt.Item>
                    <FormAnt.Item
                      //style={{ margin: '5px' }}
                      validateStatus={
                        Boolean(touched?.WorkDuration && errors?.WorkDuration)
                          ? "error"
                          : "success"
                      }
                      help={
                        Boolean(
                          touched?.WorkDuration && errors?.WorkDuration
                        ) && errors?.WorkDuration
                      }
                    >
                      <Field name="WorkDuration">
                        {({ field }) => (
                          <Input
                            {...field}
                            name="WorkDuration"
                            className={` ${
                              touched?.WorkDuration && errors?.WorkDuration
                                ? classes.inputError
                                : ""
                            } ${classes.inputRecovery} ant-picker `}
                            placeholder="WorkDuration"
                          />
                        )}
                      </Field>
                    </FormAnt.Item>

                    <FormAnt.Item
                      style={{ marginTop: "20px" }}
                      validateStatus={
                        Boolean(touched?.Price && errors?.Price)
                          ? "error"
                          : "success"
                      }
                      help={
                        Boolean(touched?.Price && errors?.Price) &&
                        errors?.Price
                      }
                    >
                      <Field name="Price">
                        {({ field }) => (
                          <Input
                            {...field}
                            name="Price"
                            className={` ${
                              touched?.Price && errors?.Price
                                ? classes.inputError
                                : ""
                            } ${classes.inputRecovery} ant-picker `}
                            placeholder="Price"
                          />
                        )}
                      </Field>
                    </FormAnt.Item>

                    {/* <FormAnt.Item
                        //style={{ margin: '5px' }}
                        validateStatus={
                          Boolean(touched?.password2 && errors?.password2)
                            ? "error"
                            : "success"
                        }
                        help={
                          Boolean(touched?.password2 && errors?.password2) &&
                          errors?.password2
                        }
                      >
                        <Field name="password2">
                          {({ field }) => (
                            <Input.Password
                              {...field}
                              name="password2"
                              className={` ${
                                touched?.password2 && errors?.password2
                                  ? classes.inputError
                                  : ""
                              } ${classes.inputRecovery} ant-picker `}
                              placeholder="Confirm Password"
                            />
                          )}
                        </Field>
                      </FormAnt.Item> */}
                    <span className={classes.titleRight}>Service Image</span>
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
      </Modal>
    </>
  );
};
export default CreateService;
