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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
import { CreateServiceSchema } from "./validation";
import {
  handleCreateNewService,
  handleGetAllDiscountRate,
  handleUpdateService,
} from "./ModalServiceAPI";
const { Option } = Select;
const UpdateService = (props) => {
  // console.log("check props update: ", props);
  const [dataDescription, setDataDescription] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [differentPass, setDifferentPass] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileSize, setFileSize] = useState();
  const [allDiscountRate, setAllDiscountRate] = useState();
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
    handleGetAllDiscountRate(1, "")
      .then((res) => {
        if (res.discount) {
          setAllDiscountRate(res.discount.rows);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props]);
  const handleSubmitUpdateStaff = useCallback(
    (values) => {
      try {
        setSaving(true);
        handleUpdateService(
          props.data.id,
          values.ServiceName,
          values.WorkDuration,
          values.Price,
          imageUrl ? imageUrl : props.data.ServiceImage,
          fileName ? fileName : props.data.public_id_image,
          dataDescription.toString(),
          values.idDiscount
        )
          .then((res) => {
            props.takeStatus("complete" + Date.now());
            props.handleModal(false);
            message.success("update service is success !");
          })
          .catch((res) => {
            setSaving(false);
            // console.log("check res data email: ", res);
            message.error("update service fail");
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
  const handleCancel = () => {
    setIsModalVisible(false);
    props.handleModal(false);
  };
  return (
    <>
      <Modal
        centered
        visible={isModalVisible}
        width="477px"
        onCancel={handleCancel}
        closable={true}
        closeIcon={<XCircle size={32} color="#fff" weight="fill" />}
        className={classes.createStaff}
      >
        <div className={classes.titleCreateStaff}>
          <span className={classes.nameCreate}>Update Service</span>
        </div>
        <div className={classes.createStaffContainer}>
          <div className={classes.formInfo}>
            <Formik
              validationSchema={CreateServiceSchema}
              initialValues={{
                ServiceName: props.data?.ServiceName
                  ? props.data.ServiceName
                  : "N/A",
                WorkDuration: props.data?.WorkDuration
                  ? props.data.WorkDuration
                  : "N/A",
                Price: props.data?.Price ? props.data.Price : "N/A",
                idDiscount: props.data?.idDiscount
                  ? props.data?.idDiscount
                  : "N/A",
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
                    <div className={classes.descriptionService}>
                      <p>Course Route of Service</p>
                      <CKEditor
                        editor={ClassicEditor}
                        // style={{ height: "250px" }}
                        data={
                          dataDescription
                            ? dataDescription
                            : props.data.CourseRoute
                        }
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
                    <FormAnt.Item
                      //style={{ margin: '5px' }}
                      validateStatus={
                        Boolean(touched?.idDiscount && errors?.idDiscount)
                          ? "error"
                          : "success"
                      }
                      help={
                        Boolean(touched?.idDiscount && errors?.idDiscount) &&
                        errors?.idDiscount
                      }
                    >
                      <Select
                        className={` ${
                          touched?.idDiscount && errors?.idDiscount
                            ? classes.inputError
                            : ""
                        } ${classes.inputRecovery} ant-picker `}
                        placeholder="Discount Rate"
                        defaultValue={props.data.idDiscount}
                        onChange={(value) => {
                          setFieldValue("idDiscount", value);
                        }}
                      >
                        {allDiscountRate && allDiscountRate.length > 0
                          ? allDiscountRate.map((item, index) => {
                              return (
                                <Select.Option value={item.id} key={index}>
                                  {item.DiscountRate} %
                                </Select.Option>
                              );
                            })
                          : ""}
                      </Select>
                    </FormAnt.Item>
                    <span className={classes.titleRight}>Avatar</span>
                    <div className={classes.changeThumbnailContainer}>
                      <div className={classes.image}>
                        <Cropper
                          image={
                            imageUrl ? imageUrl + " " : props.data.ServiceImage
                          }
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
                        <div style={{ marginLeft: "99px" }}>
                          <StaggerAnimation></StaggerAnimation>
                        </div>
                      ) : (
                        "Update"
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
export default UpdateService;
