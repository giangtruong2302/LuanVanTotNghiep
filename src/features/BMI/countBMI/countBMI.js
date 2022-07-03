import React, { useState } from "react";
import "./countBMI.scss";
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
const CountBMI = () => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal(event) {
        setIsOpen(true);
        event.preventDefault();
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';

    }

    function closeModal() {
        setIsOpen(false);
    }
    const [height, setHeight] = useState("")
    const [weight, setWeight] = useState("")

    const handleHeight = (event) => {
        setHeight(event.target.value)
        console.log("chieu cao", event.target.value)
    }
    const handleWeight = (event) => {
        setWeight(event.target.value)
        console.log("can nang", event.target.value)
    }
    let sum = parseInt(weight) / parseInt(height * 2);


    return (
        <div>
            <form className="formBMI">
                <label className="textHeight">Chiều cao (Đơn vị: m)</label>
                <input className="heightInput" type="text" onChange={(event) => handleHeight(event)}></input>
                <label className="textWeight">Cân nặng (Đơn vị: kg)</label>
                <input className="weightInput" type="text" onChange={(event) => handleWeight(event)} ></input>
                <button className="btnBMI" onClick={openModal} >Tính BMI</button>
            </form>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            ><div>Your BMI is :</div>
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{Math.round(sum * 100) / 100} </h2>
                {(sum < 18.5) ? <h3>Bạn hơi gầy</h3> : (18.5 < sum && sum < 25) ? <h3>Cân nặng bình thường</h3> : (25 < sum && sum < 30) ? <h3>Bạn bị thừa cân</h3> : <h3>Bạn bị béo phì</h3>}


            </Modal>
        </div>
    )
}
export default CountBMI