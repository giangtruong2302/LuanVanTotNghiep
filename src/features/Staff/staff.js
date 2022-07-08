import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./staff.scss";
import { Link } from "react-router-dom";

import ListBooking from "./ListBooking/listBooking";
import ava from "../../assets/images/imgStaff/staff.png";
import Modal from 'react-modal';
import { getPtDetail } from "../Customer/PTDetail/PtDetailAPI";
import { useSelector } from "react-redux";
import { message } from "antd";


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
const Staff = () => {
    let subtitle;
    const [ptDetail, setptDetail] = useState();
    const [noptDetail, setNoptDetail] = useState(false);
    const [, setptDetailLoading] = useState(true);
    const id = useParams();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const staffInfo = useSelector((state) => state.staff.staffInfo);
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


    useEffect(() => {
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
                                <Link to={`/create-timeworking`}> <button className="btnInfo">Đăng ký lịch làm</button></Link>
                                <Modal
                                    isOpen={modalIsOpen}
                                    onAfterOpen={afterOpenModal}
                                    onRequestClose={closeModal}
                                    style={customStyles}
                                    contentLabel="Example Modal"
                                ><div>Your Salary is :</div>
                                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{(ptDetail?.SalaryId === 1) ? "5.000.000VNĐ" : "4.000.000VNĐ"} </h2>



                                </Modal>

                            </div>
                        </div>
                    </div>
                    <ListBooking />
                </div>
            </div>
        </div>
    );
};
export default Staff;