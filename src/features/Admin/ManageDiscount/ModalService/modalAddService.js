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
import unknow from "../../../../assets/images/gymplaceholder.jpg";
import StaggerAnimation from "../../../../component/StaggerAnimation";
import { Field, FieldProps, Form, Formik } from "formik";
import moment from "moment";
import { XCircle } from "phosphor-react";
import React, { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
// import { Area, Point } from "react-easy-crop/types";
import { toast, ToastContainer } from "react-toastify";
import classes from "./styles.module.scss";
import { CreateSDiscountSchema, CreateServiceSchema } from "./validation";
import { handleCreateNewService } from "./ModalServiceAPI";
const { Option } = Select;
const CreateService = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [differentPass, setDifferentPass] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
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
  const handleSubmitCreateStaff = useCallback(
    (values) => {
      // console.log("check values: ", values);
      //setDifferentPass(false)
      // const sdt = formatPhoneNumber(values.phoneNumber)
      try {
        setSaving(true);
        handleCreateNewService(
          values.ServiceName,
          values.WorkDuration,
          values.Price,
          imageUrl,
          fileName
        )
          .then((res) => {
            toast.success("create new service is success");
            props.takeStatus("complete" + Date.now());
            props.handleModal(false);

            // toast.success("create new staff account is success !");
          })
          .catch((error) => {
            message.error("add service fail");
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
          <span className={classes.nameCreate}>Create New Discount</span>
        </div>
        <div className={classes.createStaffContainer}>
          <div className={classes.formInfo}>
            <Formik
              validationSchema={CreateSDiscountSchema}
              initialValues={{
                DiscountRate: "",
              }}
              onSubmit={async (values) => {
                console.log("check values:", values);
                setSaving(true);
                // handleSubmitCreateStaff(values);
              }}
            >
              {({ errors, touched, setFieldValue }) => {
                return (
                  <Form>
                    <FormAnt.Item
                      style={{ marginTop: "10px" }}
                      validateStatus={
                        Boolean(touched?.DiscountRate && errors?.DiscountRate)
                          ? "error"
                          : "success"
                      }
                      help={
                        Boolean(
                          touched?.DiscountRate && errors?.DiscountRate
                        ) && errors?.DiscountRate
                      }
                    >
                      <Field name="DiscountRate">
                        {({ field }) => (
                          <Input
                            {...field}
                            name="DiscountRate"
                            className={` ${
                              touched?.DiscountRate && errors?.DiscountRate
                                ? classes.inputError
                                : ""
                            } ${classes.inputRecovery} ant-picker `}
                            placeholder="Discount rate %"
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
      </Modal>
    </>
  );
};
export default CreateService;
