import { PictureOutlined, LoadingOutlined } from "@ant-design/icons";
import { Field, FieldProps, Form, Formik } from "formik";
import { DatePicker, Form as FormAnt, Input, Modal } from "antd";
// import { message, Modal, Upload } from "antd";
import AppLoader from "../../../../../component/AppLoader";
import classes from "./styles.module.scss";
import ava from "../../../../../assets/images/imgStaff/dyno.jpg";

import { XCircle } from "phosphor-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Cropper from "react-easy-crop";
import { ChangeDetailSchema } from "./validation";
import moment from "moment";
// import { Area, Point } from "react-easy-crop/types";

const ChangeDetail = (props) => {
  // console.log(props);
  const [isModalVisible, setIsShowModalVisible] = useState(true);

  const [loading, setLoading] = useState(false);

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
                firstName: props.firstName,
                lastName: props.lastName,
                gender: props.gender,
                dob: props.dob,
                address: props.address,
              }}
              onSubmit={async (values) => {
                // console.log("check values:", values);
                // handleSubmitUpdatePersonalDetail(values)
              }}
            >
              {({ errors, touched, setFieldValue }) => {
                return (
                  <Form>
                    <FormAnt.Item
                      style={{ margin: "10px" }}
                      validateStatus={
                        Boolean(touched?.firstName && errors?.firstName)
                          ? "error"
                          : "success"
                      }
                      help={
                        Boolean(touched?.firstName && errors?.firstName) &&
                        errors?.firstName
                      }
                    >
                      <Field name="firstName">
                        {({ field }) => (
                          <Input
                            {...field}
                            name="firstName"
                            className={classes.inputRecovery}
                            placeholder="first name"
                          />
                        )}
                      </Field>
                    </FormAnt.Item>
                    <FormAnt.Item
                      style={{ margin: "10px" }}
                      validateStatus={
                        Boolean(touched?.lastName && errors?.lastName)
                          ? "error"
                          : "success"
                      }
                      help={
                        Boolean(touched?.lastName && errors?.lastName) &&
                        errors?.lastName
                      }
                    >
                      <Field name="lastName">
                        {({ field }) => (
                          <Input
                            {...field}
                            name="lastName"
                            className={classes.inputRecovery}
                            placeholder="last name"
                          />
                        )}
                      </Field>
                    </FormAnt.Item>
                    <FormAnt.Item
                      style={{ margin: "10px" }}
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
                      <Field
                        className={classes.inputRecovery}
                        name="gender"
                        placeholder="Gender"
                        as="select"
                      >
                        {["MALE", "FEMALE", "OTHER"].map((i) => (
                          <option key={i} value={i}>
                            {i}{" "}
                          </option>
                        ))}
                      </Field>
                    </FormAnt.Item>
                    <FormAnt.Item
                      style={{ margin: "10px" }}
                      validateStatus={
                        Boolean(touched?.dob && errors?.dob)
                          ? "error"
                          : "success"
                      }
                      help={Boolean(touched?.dob && errors?.dob) && errors?.dob}
                    >
                      <DatePicker
                        onChange={(dateString) => {
                          const startday =
                            moment(dateString).format("YYYY-MM-DD");
                          setFieldValue("dob", startday);
                          console.log(startday);
                        }}
                        className={classes.inputRecovery}
                        defaultValue={moment(props.dob, "YYYY-MM-DD")}
                      />
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
                      Save
                      {/* {isLoading ? (
                        <div style={{ marginLeft: '100px' }}>
                          <StaggerAnimation></StaggerAnimation>
                        </div>
                      ) : (
                        'Submit'
                      )} */}
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
