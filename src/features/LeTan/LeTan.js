import React from "react";
import "./LeTan.scss";
import { Link } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
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
const LeTan = () => {
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

        <div className="LeTanProfileBg">

            <div className="containerListLeTan">
                Page Staff Lễ Tân
                <div className="titlePage">
                    <div className="LeTaninfo">
                        <img src={ava} className="imgLeTan" />
                        <div className="LeTanName">
                            Welcome, Nguyễn Nhật Huy !
                            <div className="btnLeTan">
                                <Link to="/scanqr" className="btnScan" >Scan</Link>
                                <button className="btnSalary" onClick={openModal}>Salary</button>
                                <Modal
                                    isOpen={modalIsOpen}
                                    onAfterOpen={afterOpenModal}
                                    onRequestClose={closeModal}
                                    style={customStyles}
                                    contentLabel="Example Modal"
                                ><div>Your Salary is :</div>
                                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>4.000.000 VND </h2>



                                </Modal>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
export default LeTan;