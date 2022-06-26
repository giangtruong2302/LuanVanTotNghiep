import React from "react";
import "./staff.scss";
import { Link } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import ListBooking from "./ListBooking/listBooking";
import ava from "../../assets/images/imgStaff/staff.png";
import Modal from 'react-modal';

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
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';

    }

    function closeModal() {
        setIsOpen(false);
    }
    return (

        <div className="PTProfileBg">

            <div className="containerListPT">
                Page Staff Booking
                <div className="titlePage">
                    <div className="PTinfo">
                        <img src={ava} className="imgPT" />
                        <div className="PtName">
                            Welcome, Nguyễn Nhật Huy !
                            <div className="btnPT">
                                <button className="btnScan">Scan</button>


                                <Link to={{ pathname: '/pt-booking' }}> <button className="btnBook">Lịch booking</button></Link>



                                <button className="btnSalary" onClick={openModal}>Salary</button>
                                <Modal
                                    isOpen={modalIsOpen}
                                    onAfterOpen={afterOpenModal}
                                    onRequestClose={closeModal}
                                    style={customStyles}
                                    contentLabel="Example Modal"
                                ><div>Your Salary is :</div>
                                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>5.000.000 VND </h2>



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