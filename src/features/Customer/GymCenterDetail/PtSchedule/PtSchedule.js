import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import "./ptSchedule.scss";
import moment from "moment";
import { LANGUAGES } from "../../../../utils/constant";
import { useSelector } from "react-redux";
import { getTimeWorking } from "./PtScheduleAPI";
import { Form, Input, Select, Button, DatePicker } from 'antd';
import { createBooking } from "./PtScheduleAPI";
import { loginSchema } from "./validation";
import Modal from 'react-modal';
import { getAllGymCenter } from "../../GymCenter/gymCenterAPI";
import { getPtOfCenter } from "../ListPtOfCenter/listPtOfCenterAPI";
import { getAllService } from "../../ServiceGym/ServiceAPI";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDetailPT } from "./PtScheduleAPI";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDetailService } from "./PtScheduleAPI";
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '65%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',

    },
};
const { Option } = Select;
const PTShedule = (props) => {
    const notify = () => toast.success('Wow so easy!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });;
    const [startDate, setStartDate] = useState(new Date());
    const cusInfo = useSelector((state) => state.cus.cusInfo);
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#000';

    }

    function closeModal() {
        setIsOpen(false);
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

    const [allService, setAllService] = useState();
    const [noService, setNoService] = useState(false);
    const [, setServiceLoading] = useState(true);


    useEffect(() => {
        getTimeWorking(props.ptId, 1).then((response) => {
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
    }, []);
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

    useEffect(() => {

        getAllService(1).then((response) => {

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
    const [form] = Form.useForm();
    const [status, setStatus] = useState("PENDING")
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [centerId, setCenterId] = useState();
    const [detailService, setDetailService] = useState();
    const [nodetailService, setNoDetailService] = useState(false);
    const [, setDetailServiceLoading] = useState(true);
    const onHandleServiceId = (value) => {
        getDetailService(value).then((response) => {

            if (response.serviceDetail) {

                setDetailService(response.serviceDetail);
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
    }
    const onHandleCenterId = (value) => {
        getPtOfCenter(value, 1).then((response) => {

            if (response.ptOfCenter.rows) {
                console.log(response.ptOfCenter)

                setPtOfCenter(response.ptOfCenter.rows);
                setNoPtOfCenter(false);
            } else {
                setNoPtOfCenter(true);
            }
        })
            .catch(() => {
                setNoPtOfCenter(true);
            })
            .finally(() => {
                setPtOfCenterLoading(false);
            });
    };
    const onHandlePTId = (value) => {

        getDetailPT(value).then((response) => {
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

    };
    const onChangeStartTime = (date, dateString) => {

        setStartTime(date._d)

    };

    const onChangeEndTime = (date, dateString) => {

        setEndTime(date)
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
    const [messRes, setMessRes] = useState("");
    //dateToTimeStamp
    // var myDate = "7-7-2022";
    // const date = new Date(myDate);
    // const timestampSeconds = Math.floor(date.getTime() / 1000);
    //TimeStampToString
    // let timestamp = 1657126800000

    // var date = new Date(timestamp);
    const handleDate = (e) => {
        // console.log(timestampSeconds);

        // console.log(date.getDate() +
        //     "/" + (date.getMonth() + 1) +
        //     "/" + date.getFullYear());

        console.log(e.target.value)


    }

    const onFinish = (values) => {
        createBooking(cusInfo["AccountCustomer.id"], parseInt(values.pt), cusInfo["fullName"], "", values.center, values.service, startTime, endTime, status).then((response) => {
            if (response.message.errCode === 0) {
                toast.success("Success", options)

            } else {

                toast.error("Fail", options);
            }

        })



        startTime.setMonth(startTime.getMonth() - 3);
        console.log('time', moment(startTime).format("DD-MM-YYYY H:mm A"));


    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <>
            <div className="doctor-schedule-container">
                <div className="all-schedule" >
                    <select onChange={handleDate} >
                        {allDays && allDays.length > 0
                            ? allDays.map((item, index) => {
                                return (
                                    <option key={index} value={item.value} >
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
                                {timeDetail && timeDetail.length > 0 ?
                                    (
                                        timeDetail?.map((item, index) => {
                                            return (
                                                <button className={"btn-vie"} onClick={openModal}>{item.TimeWork}</button>
                                            )
                                        })
                                    ) :
                                    (
                                        "n/a"
                                    )
                                }
                            </div>
                            <Modal
                                isOpen={modalIsOpen}
                                onAfterOpen={afterOpenModal}
                                onRequestClose={closeModal}
                                style={customStyles}
                                contentLabel="Example Modal"
                            ><h1>Form đăng ký</h1>
                                <div ref={(_subtitle) => (subtitle = _subtitle)}>
                                    <Form form={form} name="control-hooks" onFinish={onFinish}>
                                        Email :
                                        <Form.Item
                                            name="email"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        Ngày bắt đầu :
                                        <Form.Item
                                            name="StartTime"

                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <DatePicker format={"DD-MM-YYYY"} onChange={onChangeStartTime} />
                                        </Form.Item>
                                        Ngày kết thúc :
                                        <Form.Item
                                            name="EndTime"

                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <DatePicker format={"DD-MM-YYYY"} onChange={onChangeEndTime} />
                                        </Form.Item>
                                        Center :
                                        <Form.Item
                                            name="center"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}


                                        >
                                            <Select
                                                placeholder="Select a center"
                                                onChange={onHandleCenterId}
                                            >
                                                {allGymCenter?.map((item, index) => {
                                                    return (
                                                        <>
                                                            <Option value={item.id} >{item.CenterName}</Option>

                                                        </>
                                                    )
                                                })}
                                            </Select>
                                        </Form.Item>
                                        PT :
                                        <Form.Item
                                            name="pt"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Select
                                                placeholder="Select your PT"
                                                onChange={onHandlePTId}
                                            >
                                                {PtOfCenter?.map((item, index) => {
                                                    return (
                                                        <>
                                                            <Option value={item.id}> {item.StaffName}</Option>

                                                        </>
                                                    )
                                                })}
                                            </Select>
                                        </Form.Item>
                                        Service :
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
                                            >  {allService?.map((item, index) => {
                                                return (<>
                                                    <Option value={item.id}>{item.ServiceName}</Option>

                                                </>
                                                )
                                            })}
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            name="price"
                                            label="Giá"

                                        >
                                            {detailService?.Price}
                                        </Form.Item>
                                        <div>

                                            <ToastContainer
                                                position="top-right"
                                                autoClose={5000}
                                                hideProgressBar={false}
                                                newestOnTop={false}
                                                closeOnClick
                                                rtl={false}
                                                pauseOnFocusLoss
                                                draggable
                                                pauseOnHover
                                            />

                                            <ToastContainer />
                                        </div>

                                        <Button type="primary" htmlType="submit" >
                                            Submit
                                        </Button>
                                        <Button htmlType="button" onClick={onReset}>
                                            Reset
                                        </Button>
                                    </Form>


                                </div>


                            </Modal>



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
