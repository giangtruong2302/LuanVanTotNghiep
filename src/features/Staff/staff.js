import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./staff.scss";
import { Link } from "react-router-dom";
import { Form, Select, Button } from "antd"
import ListBooking from "./ListBooking/listBooking";
import ava from "../../assets/images/imgStaff/staff.png";
import Modal from 'react-modal';
import { getPtDetail } from "../Customer/PTDetail/PtDetailAPI";
import { useSelector } from "react-redux";
import moment from "moment";
import { createSchedule } from "./staffAPI";
import { getAllTimeWorking } from "./staffAPI";
import { ToastContainer, toast } from 'react-toastify';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',

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
            let labelVi = moment(new Date())
                .add(i, "days")
                .format("dddd - DD/MM");
            object.label = capitalizeFirstLetter(labelVi); // In hoa ký tự đầu tiên //
        }


        object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();

        allDays.push(object);
    }

    return allDays;
};


const Staff = () => {
    let subtitle;
    const navigate = useNavigate()
    const [ptDetail, setptDetail] = useState();
    const [noptDetail, setNoptDetail] = useState(false);
    const [, setptDetailLoading] = useState(true);
    const id = useParams();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalTimeWorkIsOpen, setModalTimeWorkIsOpen] = React.useState(false);
    const staffInfo = useSelector((state) => state.staff.staffInfo);
    console.log('staffInfo', staffInfo)
    console.log("check staff info: ", staffInfo["AccountStaff.id"]);
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';

    }

    function closeModal() {
        setIsOpen(false);
    }
    function openModalTimeWork() {
        setModalTimeWorkIsOpen(true);
    }

    function afterOpenModalTimeWork() {
        subtitle.style.color = '#f00';

    }

    function closeModalTimeWork() {
        setModalTimeWorkIsOpen(false);
    }

    const handleDay = (e) => {
        console.log(e.target.value)
        setTimeStamp(e.target.value)
    }
    const handleChange = (value) => {
        console.log(value);
        setTimeId(value)
    };
    const handleCreateTimeWork = () => {
        createSchedule(timeStamp, staffInfo["AccountStaff.id"], timeId).then((response) => {
            if (response.message.errCode === 0) {
                toast.success("Success", options)

            } else { toast.error("Fail", options) }



        })
    }
    const [form] = Form.useForm();
    const [timeId, setTimeId] = useState();
    const [timeStamp, setTimeStamp] = useState();
    const [allTime, setAllTime] = useState();
    const [noAllTime, setNoAllTime] = useState(false);
    const [, setAllTimeLoading] = useState(true);
    const onFinish = (values) => {

        console.log('check', values)


    };
    useEffect(() => {

        getAllTimeWorking("1").then((response) => {

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
        console.log("ssssss", staffInfo)
        if (staffInfo) {
            getPtDetail(staffInfo["AccountStaff.id"]).then((response) => {
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
        }
        else { navigate("/staff-login") }

    }, []);
    return (

        <div className="PTProfileBg1">

            <div className="containerListPT">
                Page Staff Booking
                <div className="titlePage">
                    <div className="PTinfo">
                        <img src={ava} className="imgPT" />
                        <div className="PtName">
                            Welcome, {ptDetail?.StaffName} !
                            <div className="btnPT">


                                {(staffInfo["roleId"] === 4 ?
                                    <Link to={`/scanqr`}> <button className="btnBook">Scan QR</button></Link>
                                    :
                                    <Link to={`/pt-booking/`}> <button className="btnBook">Lịch booking</button></Link>
                                )}
                                <Link to={`/staff-info/${ptDetail?.id}`}> <button className="btnInfo">Thông tin cá nhân</button></Link>


                                <button className="btnSalary" onClick={openModal}>Salary</button>
                                {(staffInfo["roleId"] === 3 ?
                                    <button className="btnSalary" onClick={openModalTimeWork}>Đăng ký lịch làm</button>
                                    : "")}
                                <Modal
                                    isOpen={modalIsOpen}
                                    onAfterOpen={afterOpenModal}
                                    onRequestClose={closeModal}
                                    style={customStyles}
                                    contentLabel="Example Modal"
                                ><div>Your Salary is :</div>
                                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{(ptDetail?.SalaryId === 1) ? "5.000.000VNĐ" : "4.000.000VNĐ"} </h2>



                                </Modal>

                                <Modal

                                    isOpen={modalTimeWorkIsOpen}
                                    onAfterOpen={afterOpenModalTimeWork}
                                    onRequestClose={closeModalTimeWork}
                                    style={customStyles}
                                    contentLabel="Example Modal"
                                ><h1>Form đăng ký lịch làm </h1>
                                    <div ref={(_subtitle) => (subtitle = _subtitle)}>
                                        <Form form={form} name="control-hooks" className="formCus" onFinish={onFinish}>
                                            <select onChange={handleDay}  >
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
                                            <Select
                                                defaultValue="SelecTime"
                                                style={{
                                                    width: 120,
                                                }}
                                                onChange={handleChange}
                                            >
                                                {allTime?.map((item, index) => {
                                                    return (
                                                        <Option value={item.id} >{item.TimeWork}</Option>


                                                    )
                                                })}

                                            </Select>
                                            <Button onClick={handleCreateTimeWork}> Tạo lịch</Button>
                                        </Form>
                                    </div>



                                </Modal>
                            </div>
                        </div>
                    </div>
                    {(staffInfo["roleId"] === 3 ?
                        <ListBooking /> : "")}
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};
export default Staff;