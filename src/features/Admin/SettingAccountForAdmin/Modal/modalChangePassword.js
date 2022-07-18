import { PictureOutlined, LoadingOutlined } from "@ant-design/icons";
import { Field, FieldProps, Form, Formik } from "formik";
import { DatePicker, Form as FormAnt, Input, message, Modal } from "antd";
// import { message, Modal, Upload } from "antd";
import AppLoader from "../../../../component/AppLoader";
import classes from "./styles.module.scss";
import ava from "../../../../assets/images/imgStaff/dyno.jpg";
import { handleChangePassword } from "./UpdateInfoManagerAPI";
import { XCircle } from "phosphor-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Cropper from "react-easy-crop";
import { ChangeDetailSchema, ChangePasswordSchema } from "./validation";
import moment from "moment";
import { useDispatch } from "react-redux";
// import { Area, Point } from "react-easy-crop/types";

const ChangePassword = (props) => {
  // console.log(props);
  const [isModalVisible, setIsShowModalVisible] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.showModal) {
      setIsShowModalVisible(true);
    }
  }, [props]);
  const dispatch = useDispatch();
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
  const handleSubmitChangePassword = useCallback(
    (values) => {
      try {
        setSaving(true);
        handleChangePassword(
          values.oldPassword,
          values.password,
          values.password2,
          props.data.id
        )
          .then((res) => {
            message.success("update password is success");
            props.handleModal(false);
          })
          .catch((error) => {
            console.log("check error: ", error);
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
            <span
              className={classes.nameChangeInfo}
              style={{ paddingLeft: "40px" }}
            >
              Change Password
            </span>
          </div>
          <div className={classes.containerChangeInfo}>
            <Formik
              validationSchema={ChangePasswordSchema}
              initialValues={{
                oldPassword: "",
                password: "",
                password2: "",
              }}
              onSubmit={async (values) => {
                // console.log("check values:", values);
                handleSubmitChangePassword(values);
              }}
            >
              {({ errors, touched, setFieldValue }) => {
                return (
                  <Form>
                    <FormAnt.Item
                      style={{ margin: "10px" }}
                      validateStatus={
                        Boolean(touched?.oldPassword && errors?.oldPassword)
                          ? "error"
                          : "success"
                      }
                      help={
                        Boolean(touched?.oldPassword && errors?.oldPassword) &&
                        errors?.oldPassword
                      }
                    >
                      <Field name="oldPassword">
                        {({ field }) => (
                          <Input
                            {...field}
                            name="oldPassword"
                            className={classes.inputRecovery}
                            placeholder="Current Password"
                          />
                        )}
                      </Field>
                    </FormAnt.Item>
                    <FormAnt.Item
                      style={{ margin: "10px" }}
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
                            name="password"
                            className={classes.inputRecovery}
                            placeholder="Password"
                          />
                        )}
                      </Field>
                    </FormAnt.Item>
                    <FormAnt.Item
                      style={{ margin: "10px" }}
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
                            className={classes.inputRecovery}
                            placeholder="Confirm Password"
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
export default ChangePassword;
