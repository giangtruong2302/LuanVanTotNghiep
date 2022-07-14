import { PictureOutlined, LoadingOutlined } from "@ant-design/icons";
import { Field, FieldProps, Form, Formik } from "formik";
import {
  DatePicker,
  Form as FormAnt,
  Input,
  message,
  Modal,
  Select,
} from "antd";
// import { message, Modal, Upload } from "antd";
import AppLoader from "../../../../component/AppLoader";
import classes from "./styles.module.scss";
import ava from "../../../../assets/images/imgStaff/dyno.jpg";

import { XCircle } from "phosphor-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Cropper from "react-easy-crop";
import { ChangeDetailSchema } from "./validation";
import moment from "moment";
import { useDispatch } from "react-redux";
import { handleChangeInfoManager } from "./UpdateInfoManagerAPI";
import { Toast } from "react-bootstrap";
import StaggerAnimation from "../../../../component/StaggerAnimation";
// import { Area, Point } from "react-easy-crop/types";
const { Option } = Select;

const ChangeDetail = (props) => {
  // console.log(props);
  const dispatch = useDispatch();

  const [isModalVisible, setIsShowModalVisible] = useState(true);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (props.showModal) {
      setIsShowModalVisible(true);
    }
  }, [props]);

  const handleCancel = () => {
    setIsShowModalVisible(false);
    props.handleModal(false);
  };
  const handleOk = () => {
    // setLoadingUpdate(true)
    // setLoading(false)
    // showCroppedImage()
  };
  const onCropComplete = useCallback((_croppedArea, croppedAreaPixels) => {
    // setCroppedAreaPixels(croppedAreaPixels)
  }, []);

  const uploadButton = useMemo(() => {
    return (
      <div className={"btnUpload"}>
        {loading ? <LoadingOutlined /> : <PictureOutlined />}
        <div className={"text"}>Change Image</div>
      </div>
    );
  }, []);
  const handleSubmitUpdatePersonalDetail = useCallback(
    (values) => {
      try {
        setSaving(true);
        handleChangeInfoManager(
          props.data.id,
          values.name,
          values.gender,
          "",
          values.phoneNumber,
          values.address,
          values.email,
          props.data.RoleId,
          props.data.ManagerImage,
          props.data.public_id_image,
          props.data.Centered,
          props.data.SalaryId,
          props.data.ExternalId
        )
          .then((res) => {
            message.success("update info success");
            props.takeStatus("complete" + Date.now());
            props.handleModal(false);
          })
          .catch((error) => {
            console.log("error is: ", error);
          });
      } catch (error) {
        console.log(error);
        setSaving(false);
      }
    },
    [dispatch]
  );
  return (
    <>
      <Modal
        centered
        visible={isModalVisible}
        width="343px"
        onCancel={handleCancel}
        closable={true}
        closeIcon={<XCircle size={33} color="#fff" weight="fill" />}
        className={classes.changeThumbnail}
      >
        <div className={classes.changeInfoContainer}>
          <div className={classes.titleChangeInfo}>
            <span className={classes.nameChangeInfo}>
              Update Personal Detail
            </span>
          </div>
          <div className={classes.containerChangeInfo}>
            <Formik
              validationSchema={ChangeDetailSchema}
              initialValues={{
                name: props.data.ManagerName,
                email: props.data.ManagerEmail,
                phoneNumber: props.data.ManagerPhone,
                gender: props.data.Gender,
                address: props.data.ManagerAddress,
              }}
              onSubmit={async (values) => {
                // console.log("check values:", values);
                handleSubmitUpdatePersonalDetail(values);
              }}
            >
              {({ errors, touched, setFieldValue }) => {
                return (
                  <Form>
                    <FormAnt.Item
                      style={{ margin: "10px" }}
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
                            className={classes.inputRecovery}
                            placeholder="Manager name"
                          />
                        )}
                      </Field>
                    </FormAnt.Item>
                    <FormAnt.Item
                      style={{ margin: "10px" }}
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
                            className={classes.inputRecovery}
                            placeholder="Email"
                          />
                        )}
                      </Field>
                    </FormAnt.Item>
                    <FormAnt.Item
                      style={{ margin: "10px" }}
                      validateStatus={
                        Boolean(touched?.phoneNumber && errors?.phoneNumber)
                          ? "error"
                          : "success"
                      }
                      help={
                        Boolean(touched?.phoneNumber && errors?.phoneNumber) &&
                        errors?.phoneNumber
                      }
                    >
                      <Field name="phoneNumber">
                        {({ field }) => (
                          <Input
                            {...field}
                            name="phoneNumber"
                            className={classes.inputRecovery}
                            placeholder="Phone Number"
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
                        errors?.roleId
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
                        <Option value="true">Nam</Option>
                        <Option value="false">Nữ</Option>
                      </Select>
                    </FormAnt.Item>
                    <FormAnt.Item
                      style={{ margin: "10px" }}
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
                            className={classes.inputRecovery}
                            placeholder="address"
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
                        <div style={{ marginLeft: "100px" }}>
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
      </Modal>
    </>
  );
};
export default ChangeDetail;
