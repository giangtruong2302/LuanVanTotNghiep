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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector } from "react-redux";
import unknow from "../../../../../assets/images/imgStaff/dyno.jpg";
import StaggerAnimation from "../../../../../component/StaggerAnimation";
import { Field, FieldProps, Form, Formik } from "formik";
import moment from "moment";
import { XCircle } from "phosphor-react";
import React, { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import { handleCreateNewStaff } from "./ModalAccountAPI";
// import { Area, Point } from "react-easy-crop/types";
import { toast } from "react-toastify";
import classes from "./styles.module.scss";
import { CreateStaffSchema } from "./validation";
import { getAllCenter } from "../../../AdminAPI";

const { Option } = Select;
const CreateStaff = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [differentPass, setDifferentPass] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [dataDescription, setDataDescription] = useState();
  const [fileName, setFileName] = useState("");
  const [allCenter, setAllCenter] = useState();
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
    getAllCenter(1).then((res) => {
      // console.log("first");
      if (res) {
        setAllCenter(res.centers.rows);
      }
    });
  }, [props]);

  const handleCancel = () => {
    setIsModalVisible(false);
    props.handleModal(false);
  };
  const handleSubmitCreateStaff = useCallback(
    (values) => {
      // console.log("check values: ", values);
      //setDifferentPass(false)
      // const sdt = formatPhoneNumber(values.phoneNumber)
      try {
        setSaving(true);
        handleCreateNewStaff(
          values.name,
          values.password,
          values.email,
          values.phoneNumber,
          values.gender,
          values.dob,
          values.address,
          values.roleId,
          imageUrl,
          fileName,
          values.centerId,
          values.salaryId,
          Math.floor(Math.random() * 1001),
          Math.floor(Math.random() * 2001),
          dataDescription
        )
          .then((res) => {
            props.takeStatus("complete" + Date.now());

            toast.success("create new staff account is success !");
            props.handleModal(false);
          })
          .catch((error) => {
            setSaving(false);
            // console.log("check res data email: ", error);
            message.error("create staff fail");
          })
          .finally(() => {
            props.takeStatus("complete");
          });
      } catch (error) {
        console.log(error);
        setSaving(false);
      }
    },
    [dispatch, fileName, imageUrl]
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
          <span className={classes.nameCreate}>Create Staff</span>
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
                validationSchema={CreateStaffSchema}
                initialValues={{
                  email: "",
                  name: "",
                  password: "",
                  phoneNumber: "",
                  gender: false,
                  roleId: "",
                  dob: "",
                  address: "",

                  centerId: "",
                  salaryId: "",
                  // avatar: "",
                  // isActive: true,
                  // userName: "",
                }}
                onSubmit={async (values) => {
                  // console.log("check values:", values);
                  setSaving(true);
                  handleSubmitCreateStaff(values);
                }}
              >
                {({ errors, touched, setFieldValue }) => {
                  return (
                    <Form>
                      <FormAnt.Item
                        style={{ marginTop: "10px" }}
                        validateStatus={
                          Boolean(touched?.name && errors?.name)
                            ? "error"
                            : "success"
                        }
                        help={
                          Boolean(touched?.name && errors?.name) && errors?.name
                        }
                      >
                        <Field name="name">
                          {({ field }) => (
                            <Input
                              {...field}
                              name="name"
                              className={` ${
                                touched?.name && errors?.name
                                  ? classes.inputError
                                  : ""
                              } ${classes.inputRecovery} ant-picker `}
                              placeholder="Staff name"
                            />
                          )}
                        </Field>
                      </FormAnt.Item>
                      <FormAnt.Item
                        //style={{ margin: '5px' }}
                        validateStatus={
                          Boolean(touched?.address && errors?.address)
                            ? "error"
                            : "success"
                        }
                        help={
                          Boolean(touched?.address && errors?.address) &&
                          errors?.address
                        }
                      >
                        <Field name="address">
                          {({ field }) => (
                            <Input
                              {...field}
                              name="address"
                              className={` ${
                                touched?.address && errors?.address
                                  ? classes.inputError
                                  : ""
                              } ${classes.inputRecovery} ant-picker `}
                              placeholder="Address"
                            />
                          )}
                        </Field>
                      </FormAnt.Item>
                      <FormAnt.Item
                        //style={{ margin: '5px' }}
                        validateStatus={
                          Boolean(touched?.gender && errors?.gender)
                            ? "error"
                            : "success"
                        }
                        help={
                          Boolean(touched?.gender && errors?.gender) &&
                          errors?.gender
                        }
                      >
                        <Select
                          className={` ${
                            touched?.gender && errors?.gender
                              ? classes.inputError
                              : ""
                          } ${classes.inputRecovery} ant-picker `}
                          placeholder="Gender"
                          onChange={(value) => {
                            setFieldValue("gender", value);
                          }}
                        >
                          <Select.Option value={true}>Nam</Select.Option>
                          <Option value={false}>Nữ</Option>
                        </Select>
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
                            touched?.salaryId && errors?.centerId
                              ? classes.inputError
                              : ""
                          } ${classes.inputRecovery} ant-picker `}
                          placeholder="Center "
                          onChange={(value) => {
                            setFieldValue("centerId", value);
                          }}
                        >
                          {allCenter && allCenter.length > 0
                            ? allCenter.map((item, index) => {
                                return (
                                  <Option key={index} value={item.id}>
                                    {item.CenterName}
                                  </Option>
                                );
                              })
                            : ""}
                        </Select>
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
                          onChange={(value) => {
                            setFieldValue("roleId", value);
                          }}
                        >
                          <Option value="3">PT</Option>
                          <Option value="4">Lễ tân</Option>
                        </Select>
                      </FormAnt.Item>
                      <FormAnt.Item
                        //style={{ margin: '5px' }}
                        validateStatus={
                          Boolean(touched?.phoneNumber && errors?.phoneNumber)
                            ? "error"
                            : "success"
                        }
                        help={
                          Boolean(
                            touched?.phoneNumber && errors?.phoneNumber
                          ) && errors?.phoneNumber
                        }
                      >
                        <Field name="phoneNumber">
                          {({ field }) => (
                            <Input
                              {...field}
                              className={` ${
                                touched?.phoneNumber && errors?.phoneNumber
                                  ? classes.inputError
                                  : ""
                              } ${classes.inputRecovery} ant-picker `}
                              initialValueFormat="national"
                              placeholder="Phone number"
                              name="phoneNumber"
                            />
                          )}
                        </Field>
                      </FormAnt.Item>

                      <FormAnt.Item
                        //style={{ margin: '5px' }}
                        validateStatus={
                          Boolean(touched?.salaryId && errors?.salaryId)
                            ? "error"
                            : "success"
                        }
                        help={
                          Boolean(touched?.salaryId && errors?.salaryId) &&
                          errors?.salaryId
                        }
                      >
                        <Select
                          className={` ${
                            touched?.salaryId && errors?.salaryId
                              ? classes.inputError
                              : ""
                          } ${classes.inputRecovery} ant-picker `}
                          placeholder="Salary Rate"
                          onChange={(value) => {
                            setFieldValue("salaryId", value);
                          }}
                        >
                          <Select.Option value="1">4.000.000</Select.Option>
                          <Option value="2">5.000.000</Option>
                        </Select>
                      </FormAnt.Item>
                      <FormAnt.Item
                        //style={{ margin: '5px' }}
                        validateStatus={
                          Boolean(touched?.dob && errors?.dob)
                            ? "error"
                            : "success"
                        }
                        help={
                          Boolean(touched?.dob && errors?.dob) && errors?.dob
                        }
                      >
                        <DatePicker
                          placeholder="Date of Birth"
                          onChange={(dateString) => {
                            const startday =
                              moment(dateString).format("YYYY-MM-DD");
                            setFieldValue("dob", startday);
                            console.log(startday);
                          }}
                          className={` ${
                            touched?.dob && errors?.dob
                              ? classes.inputError
                              : ""
                          } ${classes.inputRecovery} ant-picker `}
                          // defaultValue={moment('2015-01-01', 'YYYY-MM-DD')}
                        />
                      </FormAnt.Item>
                      <div className={classes.descriptionService}>
                        <p>Description of Staff</p>
                        <CKEditor
                          editor={ClassicEditor}
                          // style={{ height: "250px" }}
                          // data="<p>Hello from CKEditor 5!</p>"
                          placeholder="<p>About service</p>"
                          onReady={(editor) => {
                            // You can store the "editor" and use when it is needed.
                            // console.log("Editor is ready to use!", editor);
                          }}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setDataDescription(data);
                            // console.log({ event, editor, data });
                          }}
                          onBlur={(event, editor) => {
                            // console.log("Blur.", editor);
                          }}
                          onFocus={(event, editor) => {
                            // console.log("Focus.", editor);
                          }}
                        />
                      </div>
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
                      <FormAnt.Item
                        //style={{ margin: '5px' }}
                        validateStatus={
                          Boolean(touched?.password && errors?.password)
                            ? "error"
                            : "success"
                        }
                        help={
                          Boolean(touched?.password && errors?.password) &&
                          errors?.password
                        }
                      >
                        <Field name="password">
                          {({ field }) => (
                            <Input.Password
                              {...field}
                              // name="password"
                              className={` ${
                                touched?.password && errors?.password
                                  ? classes.inputError
                                  : ""
                              } ${classes.inputRecovery} ant-picker `}
                              placeholder="Password"
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
export default CreateStaff;
