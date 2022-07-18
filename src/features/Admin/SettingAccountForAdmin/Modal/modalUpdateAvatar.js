import { PictureOutlined, LoadingOutlined } from "@ant-design/icons";
import { message, Modal, Upload } from "antd";
import AppLoader from "../../../../component/AppLoader";
import classes from "./styles.module.scss";
import ava from "../../../../assets/images/imgStaff/dyno.jpg";

import { XCircle } from "phosphor-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Cropper from "react-easy-crop";
import { handleChangeInfoManager } from "./UpdateInfoManagerAPI";
import { useDispatch } from "react-redux";
// import { Area, Point } from "react-easy-crop/types";

const ChangeAvatar = (props) => {
  // console.log(props);
  const [isModalVisible, setIsShowModalVisible] = useState(true);
  const [crop, setCrop] = useState({ x: 50, y: 50 });
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [saving, setSaving] = useState(false);
  const [zoom, setZoom] = useState(1);
  const dispatch = useDispatch();
  const getBase64 = (img, callback) => {
    setLoading(false);
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  useEffect(() => {
    if (props.showModal) {
      setIsShowModalVisible(true);
    }
  }, [props]);

  const handleCancel = () => {
    setIsShowModalVisible(false);
    props.handleModal(false);
  };
  const handleOk = useCallback(() => {
    try {
      setSaving(true);
      handleChangeInfoManager(
        props.data.id,
        props.data.ManagerName,
        props.data.Gender,
        "",
        props.data.ManagerPhone,
        props.data.ManagerAddress,
        props.data.ManagerEmail,
        props.data.RoleId,
        imageUrl,
        fileName,
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
  }, [dispatch, imageUrl, fileName]);
  const onCropComplete = useCallback((_croppedArea, croppedAreaPixels) => {
    // setCroppedAreaPixels(croppedAreaPixels)
  }, []);
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
  // console.log("check image base 64: ", imageUrl);
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
        {/* {loadingUpdate && <AppLoader />} */}
        <div className={classes.changeThumbnailContainer}>
          <div className={classes.titleUpdateAvatar}>Update Avatar</div>
          <div className={classes.image}>
            <Cropper
              image={imageUrl ? imageUrl : props.avatar}
              crop={crop}
              zoom={zoom}
              aspect={3 / 3}
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
              // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              // beforeUpload={beforeUpload}
              onChange={handleChangeImage}
            >
              {uploadButton}
            </Upload>
          </div>
          <button className={classes.btn} onClick={handleOk}>
            Save
          </button>
        </div>
      </Modal>
    </>
  );
};
export default ChangeAvatar;
