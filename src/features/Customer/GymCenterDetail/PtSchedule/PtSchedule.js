import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import "./ptSchedule.scss";
import moment from "moment";
import { LANGUAGES } from "../../../../utils/constant";
import { useSelector } from "react-redux";
import { getCusDetail, getServiceOfPt, getTimeWorking } from "./PtScheduleAPI";
import { Form, Input, Select, Button, DatePicker } from "antd";
import { createBooking } from "./PtScheduleAPI";
import { loginSchema } from "./validation";
import Modal from "react-modal";
import { getAllGymCenter } from "../../GymCenter/gymCenterAPI";
import { getPtOfCenter } from "../ListPtOfCenter/listPtOfCenterAPI";
import { getAllService } from "../../ServiceGym/ServiceAPI";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDetailPT } from "./PtScheduleAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDetailService } from "./PtScheduleAPI";
import { getDisCount } from "./PtScheduleAPI";
import { getCenterDetail } from "../centerDetailAPI";

import ButtonSchedule from "./btnSchedule";
import { isVisible } from "@testing-library/user-event/dist/utils";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "65%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const { Option } = Select;
const PTShedule = (props) => {
  const notify = () =>
    toast.success("Wow so easy!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const [scheduleId, setScheduleId] = useState();
  const cusInfo = useSelector((state) => state.cus.cusInfo);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [secondMonth, SetSecondMonth] = useState("2629743000");
  const [centerDetail, setCenterDetail] = useState();
  const [nocenterDetail, setNoCenterDetail] = useState(false);
  const [, setCenterDetailLoading] = useState(true);
  const [centerName, setCenterName] = useState();
  const [serviceOfPt, setServiceOfPt] = useState();
  const [noServiceOfPt, setNoServiceOfPt] = useState(false);
  const [, setServiceOfPtLoading] = useState(true);
  const [statusPage, setStatusPage] = useState("");
  function openModal(e) {
    if (!cusInfo) {
      toast.error("Chức năng cần đăng nhập", options);
    } else {
      setIsOpen(true);
      setScheduleId(e.target.value);
      getCusDetail(cusInfo["ExternalId"]).then((response) => {
        if (response.cusDetail) {
          setCusDetail(response.cusDetail);
          setNoCusDetail(false);
        } else {
          setNoCusDetail(true);
        }
      })
        .catch(() => {
          setNoCusDetail(true);
        })
        .finally(() => {
          setCusDetailLoading(false);
        });
      getCenterDetail(props.centerId)
        .then((response) => {
          if (response.centerDetail) {
            setCenterName(response.centerDetail.CenterName);
            setCenterDetail(response.centerDetail);
            setNoCenterDetail(false);
          } else {
            setNoCenterDetail(true);
          }
        })
        .catch(() => {
          setNoCenterDetail(true);
        })
        .finally(() => {
          setCenterDetailLoading(false);
        });

      getServiceOfPt(props.ptId, 1)
        .then((response) => {
          if (response.services.rows.length > 0) {
            setServiceOfPt(response.services.rows);

            setNoServiceOfPt(false);
          } else {
            setNoServiceOfPt(true);
          }
        })
        .catch(() => {
          setNoServiceOfPt(true);
        })
        .finally(() => {
          setServiceOfPtLoading(false);
        });
    }

  }


  function afterOpenModal() {
    subtitle.style.color = "#000";
  }

  function closeModal() {
    setIsOpen(false);
    setStatusPage(Date.now())
  }
  let subtitle;
  const language = useSelector((state) => state.app.language);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const getArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Hôm nay - ${ddMM}`;
          object.label = today;
        } else {
          let labelVi = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
          object.label = capitalizeFirstLetter(labelVi); // In hoa ký tự đầu tiên //
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Today - ${ddMM}`;
          object.label = today;
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("dddd - DD/MM");
        }
      }

      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();

      allDays.push(object);
    }

    return allDays;
  };
  const [allDays, setAllDays] = useState([]);
  console.log(language);

  useEffect(() => {
    const arrDay = getArrDays(language);
    setAllDays(arrDay);
  }, []);
  const [ptDetail, setptDetail] = useState();
  const [noptDetail, setNoptDetail] = useState(false);
  const [, setptDetailLoading] = useState(true);
  const [timeDetail, setTimeDetail] = useState();
  const [noTimeDetail, setNoTimeDetail] = useState(false);
  const [, setTimeDetailLoading] = useState(true);
  const [allGymCenter, setAllGymCenter] = useState();
  const [noGymCenter, setNoGymCenter] = useState(false);
  const [, setGymCenterLoading] = useState(true);
  const [PtOfCenter, setPtOfCenter] = useState();
  const [noPtOfCenter, setNoPtOfCenter] = useState(false);
  const [, setPtOfCenterLoading] = useState(true);
  const [dayWork, setDayWork] = useState();
  const [allService, setAllService] = useState();
  const [noService, setNoService] = useState(false);
  const [, setServiceLoading] = useState(true);
  const [form] = Form.useForm();
  const [status, setStatus] = useState("");
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [centerId, setCenterId] = useState();
  const [detailService, setDetailService] = useState();
  const [nodetailService, setNoDetailService] = useState(false);
  const [, setDetailServiceLoading] = useState(true);
  const [discount, setDiscount] = useState();
  const [nodetailDiscount, setNoDetailDiscount] = useState(false);
  const [, setDetailDiscountLoading] = useState(true);
  const [priceDiscount, setPriceDiscount] = useState();
  const [cusDetail, setCusDetail] = useState();
  const [noCusDetail, setNoCusDetail] = useState(false);
  const [, setCusDetailLoading] = useState(true);
  useEffect(() => {
    getAllGymCenter("1")
      .then((response) => {
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

  useEffect(() => {
    getAllService("", 1)
      .then((response) => {
        if (response.services.rows.length > 0) {
          setAllService(response.services.rows);
          setNoService(false);
        } else {
          setNoService(true);
        }
      })
      .catch(() => {
        setNoService(true);
      })
      .finally(() => {
        setServiceLoading(false);
      });
  }, []);
  const [idDiscount, setIdDiscount] = useState();
  const onHandleServiceId = (value) => {
    console.log("daywork", value);
    getDetailService(value)
      .then((response) => {
        setIdDiscount(response.serviceDetail.idDiscount)
        setEndTime(
          parseInt(dayWork) +
          parseInt(secondMonth) *
          parseInt(response.serviceDetail.WorkDuration)
        );
        if (response.serviceDetail) {
          getDisCount(response.serviceDetail.idDiscount)
            .then((response) => {
              if (response.discount) {
                setDiscount(response.discount.DiscountRate);
                setNoDetailDiscount(false);
              } else {
                setNoDetailDiscount(true);
              }
            })
            .catch(() => {
              setNoDetailDiscount(true);
            })
            .finally(() => {
              setDetailDiscountLoading(false);
            });
          setDetailService(response.serviceDetail);
          setPriceDiscount(response.serviceDetail.Price);
          setNoDetailService(false);
        } else {
          setNoDetailService(true);
        }
      })
      .catch(() => {
        setNoDetailService(true);
      })
      .finally(() => {
        setDetailServiceLoading(false);
      });
  };

  const handleShowModalBooking = (isVisible) => {
    setIsOpen(isVisible);
  };


  const options = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  var now = new Date; // now

  now.setHours(0);   // set hours to 0
  now.setMinutes(0); // set minutes to 0
  now.setSeconds(0); // set seconds to 0

  var startOfDay = Math.floor(now / 1000);
  const [timeStampToday, setTimeStampToday] = useState(startOfDay * 1000)

  useEffect(() => {

    getTimeWorking(props.ptId, timeStampToday, 1)
      .then((response) => {

        if (response.ScheduleWorking.rows) {
          setTimeDetail(response.ScheduleWorking.rows);
          setDayWork(timeStampToday);
          setNoTimeDetail(false);

        } else {
          setNoTimeDetail(true);
        }
      })
      .catch(() => {
        setTimeDetail(true);
      })
      .finally(() => {
        setTimeDetailLoading(false);
      });
  }, [statusPage]);
  // useEffect(() => {
  //   getCusDetail(cusInfo["ExternalId"]).then((response) => {
  //     if (response.cusDetail) {
  //       setCusDetail(response.cusDetail);
  //       setNoCusDetail(false);
  //     } else {
  //       setNoCusDetail(true);
  //     }
  //   })
  //     .catch(() => {
  //       setNoCusDetail(true);
  //     })
  //     .finally(() => {
  //       setCusDetailLoading(false);
  //     });
  // }, []);

  const handleDate = (e) => {
    console.log("timestamp", e.target.value);

    getTimeWorking(props.ptId, e.target.value, 1)
      .then((response) => {
        setDayWork(e.target.value);

        if (response.ScheduleWorking.rows) {
          setTimeDetail(response.ScheduleWorking.rows);
          setNoTimeDetail(false);
          getTimeWorking(props.ptId, e.target.value, 1)
            .then((response) => {
              setDayWork(e.target.value);

              if (response.ScheduleWorking.rows) {
                setTimeDetail(response.ScheduleWorking.rows);
                setNoTimeDetail(false);
              } else {
                setNoTimeDetail(true);
              }
            })
            .catch(() => {
              setTimeDetail(true);
            })
            .finally(() => {
              setTimeDetailLoading(false);
            });
        } else {
          setNoTimeDetail(true);
        }
      })
      .catch(() => {
        setTimeDetail(true);
      })
      .finally(() => {
        setTimeDetailLoading(false);
      });
  };

  const onFinish = (values) => {
    createBooking(
      cusDetail?.id,
      props.ptId,
      cusInfo["fullName"],
      props.ptName,
      props.centerId,
      values.service,
      moment(
        new Intl.DateTimeFormat("en-Us", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(dayWork)
      ).format("YYYY-MM-DD"),
      moment(
        new Intl.DateTimeFormat("en-Us", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(endTime)
      ).format("YYYY-MM-DD"),
      status,
      idDiscount,
      priceDiscount - (priceDiscount * discount) / 100,
      scheduleId
    ).then((response) => {
      if (response.message.errCode === 0) {
        toast.success("Success", options);
      } else {
        toast.error("Fail", options);
      }
    });
  };

  const onReset = () => {
    form.resetFields();

  };

  return (
    <>
      <div className="doctor-schedule-container">
        <div className="all-schedule">
          <select onChange={handleDate}>
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
        </div>
        {/* In thời gian  */}
        <div className="all-available-time">
          <div className="text-calendar">
            <i className="fas fa-calendar-alt">
              <span>
                <FormattedMessage id="patient.detail-doctor.schedule" />
              </span>
            </i>
          </div>
          <div className="time-content">
            <>
              <div className="time-content-btns">
                {timeDetail && timeDetail.length > 0
                  ? timeDetail?.map((item, index) => {
                    return (
                      <div>
                        <ButtonSchedule
                          data={item}
                          // onClick={(e) => openModal(e)}


                          open={openModal}
                          handleShowModalBooking={handleShowModalBooking}
                        />
                      </div>
                    );
                  })
                  : <FormattedMessage id="patient.detail-doctor.no-schedule" />}
              </div>
              {modalIsOpen && (
                <Modal
                  isOpen={modalIsOpen}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <h1><FormattedMessage id="form-booking.title-form" /></h1>
                  <div ref={(_subtitle) => (subtitle = _subtitle)}>
                    <Form form={form} name="control-hooks" onFinish={onFinish}>
                      <FormattedMessage id="form-booking.email" />
                      <Form.Item
                        name="email"

                      >
                        <Input defaultValue={cusInfo["email"]} />
                      </Form.Item>
                      <FormattedMessage id="form-booking.startTime" /> :{" "}
                      {new Intl.DateTimeFormat("vi-VN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }).format(dayWork)}
                      <br></br>
                      <FormattedMessage id="form-booking.service" /> :
                      <Form.Item
                        name="service"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Select
                          placeholder="Select a service"
                          onChange={onHandleServiceId}
                        >
                          {" "}
                          {serviceOfPt?.map((item, index) => {
                            return (
                              <>
                                <Option value={item.id}>
                                  {item.ServiceName}
                                </Option>
                              </>
                            );
                          })}
                        </Select>
                      </Form.Item>
                      <p><FormattedMessage id="form-booking.center" /> : {centerName}</p>
                      <p><FormattedMessage id="form-booking.pt" /> : {props.ptName}</p>
                      <p>
                        {" "}
                        <FormattedMessage id="form-booking.endTime" /> :{" "}
                        {new Intl.DateTimeFormat("vi-VN", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        }).format(endTime)}
                      </p>
                      <p><FormattedMessage id="form-booking.discount" /> : {discount} %</p>
                      <Form.Item name="price">
                        <FormattedMessage id="form-booking.price" /> :
                        {priceDiscount - (priceDiscount * discount) / 100
                          ? priceDiscount -
                          (priceDiscount * discount) / 100 +
                          " VND"
                          : "0 VND"}
                      </Form.Item>
                      <Form.Item name="discount"></Form.Item>
                      <div>



                      </div>
                      <Button type="primary" htmlType="submit">
                        <FormattedMessage id="form-booking.submit" />
                      </Button>

                    </Form>
                  </div>
                </Modal>
              )}
              <ToastContainer />
              <div className="book-free">
                <span>
                  <FormattedMessage id="patient.detail-doctor.choose" />
                  <i className="far fa-hand-point-up"></i>
                  <FormattedMessage id="patient.detail-doctor.Book-free" />
                </span>
              </div>
            </>
            {/* {allAvalableTime && allAvalableTime.length > 0 ? (

            ) : (
              <div className="no-schedule">
                <FormattedMessage id="patient.detail-doctor.no-schedule" />
              </div>
            )} */}
          </div>
        </div>

      </div>
    </>
  );
};
export default PTShedule;
