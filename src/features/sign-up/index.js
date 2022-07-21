import { Form, Input, Select, Upload, message } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signupSchema } from "./validation";
import "./signUp.scss";
import { values } from "lodash";
import { getAllGymCenter } from "./signUpAPI";
import { createUser } from "./signUpAPI"
import { ToastContainer, toast } from 'react-toastify';
const { Option } = Select;
const SignUp = () => {
  const options = {

    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [genderValue, setGenderValue] = useState()
  const [isSignUp, setIsSignUp] = useState(false);
  const [fileType, setFileType] = useState();
  const [fileSize, setFileSize] = useState();

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
  const [active, setActive] = useState(true);
  const [roleId, setRoleId] = useState("5");
  const [gender, setGender] = useState();
  const [centerId, setCenterId] = useState();

  const onFinish = (values) => {
    console.log("check values: ", values);
    createUser(Math.floor(Math.random() * 1000), values.email, values.password, values.fullName, imageUrl, fileName, active, values.username, roleId.toString(), Math.floor(Math.random() * 1000), gender, values.dayOfBirth, values.phonenumber, values.address, centerId).then((response) => {
      if (response.errCode === 0) {
        toast.success("Success", options)


        setTimeout(() => {
          navigate(`/login`);
        }, 4000);
      } else { toast.error("Fail", options) }



    })
  };
  const onHandleGenderValue = (value) => {
    console.log("value", value)
    setGender(value)
  }
  const onHandleCenterValue = (value) => {
    console.log("value", value)
    setCenterId(value)

  }
  const [loading, setLoading] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [fileName, setFileName] = useState();
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
  console.log(imageUrl)
  console.log(fileName)

  const uploadButton = (
    <div className="btnUpload">
      {loading ? <PictureOutlined /> : <PictureOutlined />}
      <div className="text">Change Image</div>
    </div>
  );
  const [allGymCenter, setAllGymCenter] = useState();
  const [noGymCenter, setNoGymCenter] = useState(false);
  const [, setGymCenterLoading] = useState(true);
  useEffect(() => {

    getAllGymCenter("1").then((response) => {

      if (response.centers.rows.length > 0) {
        setAllGymCenter(response.centers.rows);
        setNoGymCenter(false);
      } else {
        setNoGymCenter(true);
      }
    })
      .catch(() => {
        setNoGymCenter(true);
      })
      .finally(() => {
        setGymCenterLoading(false);
      });
  }, []);

  return (
    <div className={"wrapperSignUp"}>
      <div className={"signUpPage"}>

        <div className={"titlePageSignUp"}>



          <Form form={form} name="control-hooks" onFinish={onFinish}>
            <div className="emailPass">
              <div className="titleInputSignUp">Email :</div>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input className="inputField" />
              </Form.Item>
              <div className="titleInputSignUp">Password :</div>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input type="password" className="inputField" />
              </Form.Item>
            </div>
            <div className="titleInputSignUp"> Full Name :</div>
            <Form.Item
              name="fullName"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input className="inputField" />
            </Form.Item>
            <div className="titleInputSignUp"> Username :</div>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input className="inputField" />
            </Form.Item>
            <div className="titleInputSignUp"> Phone Number :</div>
            <Form.Item
              name="phonenumber"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input className="inputField" />
            </Form.Item>
            <div className="titleInputSignUp"> Address : </div>
            <Form.Item
              name="address"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input className="inputField" />
            </Form.Item>
            <div className="titleInputSignUp"> Day of birth : </div>
            <Form.Item
              name="dayOfBirth"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input className="inputField" placeholder="DD-MM-YYYY" />
            </Form.Item>
            <div className="titleInputSignUp"> Gender : </div>
            <Form.Item
              name="gender"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                className="selectgender"
                placeholder="Select your gender"
                onChange={onHandleGenderValue}
              >
                <Option value="true"  >Nam</Option>
                <Option value="false" >Nữ</Option>
              </Select>
            </Form.Item>
            <div className="titleInputSignUp"> Center : </div>
            <Form.Item
              name="center"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                className="selectgender"
                placeholder="Select your center"
                onChange={onHandleCenterValue}
              >
                {allGymCenter?.map((item, index) => {
                  return (
                    <Option value={item.id}>{item.CenterName}</Option>
                  )
                })}
              </Select>
            </Form.Item>
            <div className="titleInputSignUp"> Avatar: </div>
            <Form.Item
              name="image"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={true}
                beforeUpload={beforeUpload}
                onChange={handleChangeImage}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                {uploadButton}
              </Upload>
            </Form.Item>
            <div className={"btnContainer"}>
              <button
                className={"btnLogin"}
                htmlType="submit"
                style={{ cursor: "pointer" }}
              >
                Sign Up
              </button>
            </div>
          </Form>





        </div>
        <ToastContainer />
      </div>
    </div>
  );
};
export default SignUp;
