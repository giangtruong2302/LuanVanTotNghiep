import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./staff.scss";
import { Link } from "react-router-dom";
import { Form, Select, Button, message } from "antd";
import ListBooking from "./ListBooking/listBooking";
import ava from "../../assets/images/imgStaff/staff.png";
import Modal from "react-modal";
import { getPTDetail } from "./staffAPI";
import { useSelector } from "react-redux";
import moment from "moment";
import { createSchedule } from "./staffAPI";
import { getAllTimeWorking } from "./staffAPI";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import * as actions from "../../store/actions";
import { useDispatch } from "react-redux";
import NoneAvatar from "../../assets/images/logo/noneAvatar.jpg";
import { FormattedMessage } from "react-intl";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const options = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
const { Option } = Select;

const getArrDays = () => {
  let allDays = [];

  for (let i = 0; i < 7; i++) {
    let object = {};

    if (i === 0) {
      let ddMM = moment(new Date()).format("DD/MM");
      let today = `Hôm nay - ${ddMM}`;
      object.label = today;
    } else {
      let labelVi = moment(new Date()).add(i, "days").format("dddd - DD/MM");
      object.label = capitalizeFirstLetter(labelVi); // In hoa ký tự đầu tiên //
    }

    object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();

    allDays.push(object);
  }

  return allDays;
};

const Staff = () => {
  let subtitle;
  const navigate = useNavigate();
  const [ptDetail, setptDetail] = useState();
  const [noptDetail, setNoptDetail] = useState(false);
  const [, setptDetailLoading] = useState(true);
  const id = useParams();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalTimeWorkIsOpen, setModalTimeWorkIsOpen] = React.useState(false);
  const staffInfo = useSelector((state) => state.staff.staffInfo);
  const dispatch = useDispatch();
  const [status, setStatus] = useState(1);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  function closeModal() {
    setIsOpen(false);
  }
  function openModalTimeWork() {
    setModalTimeWorkIsOpen(true);
  }

  function afterOpenModalTimeWork() {
    subtitle.style.color = "#f00";
  }

  function closeModalTimeWork() {
    setModalTimeWorkIsOpen(false);
  }

  const handleDay = (e) => {
    console.log(e.target.value);
    setTimeStamp(e.target.value);
  };
  const handleChange = (value) => {
    console.log(value);
    setTimeId(value);
  };
  const handleCreateTimeWork = () => {
    createSchedule(
      timeStamp,
      staffInfo["AccountStaff.id"],
      timeId,
      status
    ).then((response) => {
      if (response.message.errCode === 0) {
        toast.success("Success", options);
      }
      if (response.message.errCode === 12) {
        message.warning(response.message.errMessage);
      } if (response.message.errCode === 1) {
        toast.error("Fail", options);
      }
    });
  };
  const [form] = Form.useForm();
  const [timeId, setTimeId] = useState();
  const [timeStamp, setTimeStamp] = useState();
  const [allTime, setAllTime] = useState();
  const [noAllTime, setNoAllTime] = useState(false);
  const [, setAllTimeLoading] = useState(true);
  const handleLogout = () => {
    dispatch(dispatch(actions.staffLogout()));
    navigate("/staff-login");
  };
  const onFinish = (values) => {
    console.log("check", values);
  };
  useEffect(() => {
    getAllTimeWorking("1")
      .then((response) => {
        if (response.time.rows.length > 0) {
          setAllTime(response.time.rows);
          setNoAllTime(false);
        } else {
          setNoAllTime(true);
        }
      })
      .catch(() => {
        setNoAllTime(true);
      })
      .finally(() => {
        setAllTimeLoading(false);
      });
  }, []);
  useEffect(() => {
    const arrDay = getArrDays();
    setAllDays(arrDay);
  }, []);
  const [allDays, setAllDays] = useState([]);

  useEffect(() => {
    if (staffInfo) {
      getPTDetail(staffInfo.ExternalId)
        .then((response) => {
          if (response.staffDetail) {
            setptDetail(response.staffDetail);
            setNoptDetail(false);
          } else {
            setNoptDetail(true);
          }
        })
        .catch(() => {
          setNoptDetail(true);
        })
        .finally(() => {
          setptDetailLoading(false);
        });
    } else {
      navigate(`/staff-login`);
    }
  }, []);
  return (
    <div className="StaffProfilePage">
      <div className="containerListPT">
        <div className="backToHome">
          <div className="backtoHome" onClick={handleLogout}>
            <ArrowLeft size={24} color=" #ffffff" weight="duotone" />
            <div className="textBackToHome">Logout</div>
          </div>
        </div>
        <div className="title">Page Staff Booking</div>
        <div className="titlePage">
          <div className="PTinfo">
            <img
              src={ptDetail?.StaffImage ? ptDetail?.StaffImage : NoneAvatar}
              className="imgPT"
            />
            <div className="PtName">
              <div className="welcomeCus">Welcome, {ptDetail?.StaffName} !</div>
              <div className="btnPT">
                {ptDetail?.RoleId === 4 ? (
                  <Link to={`/scanqr`}>
                    {" "}
                    <button className="btn-book">Scan QR</button>
                  </Link>
                ) : (
                  <Link to={`/pt-booking/`}>
                    {" "}
                    <button className="btn-book">Lịch booking</button>
                  </Link>
                )}
                <Link to={`/staff-info/${ptDetail?.id}`}>
                  {" "}
                  <button className="btn-book">Thông tin cá nhân</button>
                </Link>

                <button className="btn-book" onClick={openModal}>
                  Salary
                </button>
                {ptDetail?.RoleId === 3 ? (
                  <button className="btn-book" onClick={openModalTimeWork}>
                    Đăng ký lịch làm
                  </button>
                ) : (
                  ""
                )}
                <Modal
                  isOpen={modalIsOpen}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <div>Your Salary is :</div>
                  <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                    {ptDetail?.SalaryId === 1 ? "5.000.000VNĐ" : "4.000.000VNĐ"}{" "}
                  </h2>
                </Modal>

                <Modal
                  isOpen={modalTimeWorkIsOpen}
                  onAfterOpen={afterOpenModalTimeWork}
                  onRequestClose={closeModalTimeWork}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <h2>Đăng ký lịch làm </h2>
                  <div ref={(_subtitle) => (subtitle = _subtitle)}>
                    <Form
                      form={form}
                      name="control-hooks"
                      className="formCus"
                      onFinish={onFinish}
                    >
                      <label>Chọn ngày</label>
                      <p>
                        {" "}
                        <select onChange={handleDay}>
                          {allDays && allDays.length > 0
                            ? allDays.map((item, index) => {
                              return (
                                <option key={index} value={item.value}>
                                  {item.label}
                                </option>
                              );
                            })
                            : ""}
                        </select>
                      </p>

                      <label>Chọn giờ</label>
                      <p>
                        {" "}
                        <Select
                          defaultValue="SelecTime"
                          style={{
                            width: 120,
                          }}
                          onChange={handleChange}
                        >
                          {allTime?.map((item, index) => {
                            return (
                              <Option value={item.id}>
                                {item.StartTime.substring(0, 5)} -{" "}
                                {item.EndTime.substring(0, 5)}
                              </Option>
                            );
                          })}
                        </Select>
                      </p>
                      <Button onClick={handleCreateTimeWork}> Tạo lịch</Button>
                    </Form>
                  </div>
                </Modal>
              </div>
            </div>
          </div>

          <ListBooking />
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};
export default Staff;
