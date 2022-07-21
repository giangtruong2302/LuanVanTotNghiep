import React, { useState, useRef } from "react";
import { Form, Button, Input } from "antd";
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import { changePass } from "./RecoveryPassAPI";
import { checkEmail } from "./RecoveryPassAPI";
import { useNavigate } from "react-router-dom";
import './RecoveryPass.scss'
const customStyles = {
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        right: '74%',
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
const RecoveryPass = () => {
    const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [code, setCode] = useState()
    let subtitle;
    const [emailCus, setEmailCus] = useState()
    function openModal() {
        setIsOpen(true);
    }


    function afterOpenModal() {
        subtitle.style.color = '#000';

    }

    function closeModal() {
        setIsOpen(false);
    }

    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log(values.email)
        checkEmail(values.email).then((response) => {
            if (response.errorCode === 0) {
                setEmailCus(values.email)
                setIsOpen(true);
                var resultRamdom = "";
                var characters =
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                var charactersLength = characters.length;
                for (var i = 0; i < 6; i++) {
                    resultRamdom += characters.charAt(
                        Math.floor(Math.random() * charactersLength)
                    );
                }
                setCode(resultRamdom)
                emailjs
                    .send(
                        "service_pyrvchu",
                        "template_aofxrf3",
                        {
                            to_name: values.email,
                            from_name: "GH GYM",
                            makeid: resultRamdom,
                        },
                        "g0XxAHxUoGToRxsZq"
                    )


            } if (response.errorCode === 1) {
                toast.error("Email not exist", options);

            }
        })
    };
    console.log("code", code)
    const onFinishEmail = (values) => {
        console.log("form code", values.code)
        if (values.code === code) {
            changePass(emailCus, values.password).then((response) => {
                if (response = "OK") {

                    setIsOpen(false)
                    toast.success("Success", options)

                }

            })
        }
        else { toast.error("Wrong code", options); }





    }






    return (
        <>
            <div className="wrapRecovery">
                <div className="formEmail">
                    <div className="titleForm">Form reset Password</div>
                    <Form ref={form} name="control-hooks" className="formCus" onFinish={onFinish} >

                        <div className="titleInput">Nhập Email nhận mã xác nhận :</div>
                        <Form.Item
                            name="email"

                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input type="email" name="user_email" />
                        </Form.Item>




                        <Button type="primary" htmlType="submit"  >
                            Gửi mã
                        </Button>

                    </Form>
                </div>
                <Modal

                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                ><h1>Form sửa thông tin</h1>
                    <div ref={(_subtitle) => (subtitle = _subtitle)}>
                        <Form form={form} name="control-hooks" className="formCus" onFinish={onFinishEmail}>
                            <label>Check mail vừa nhập để nhận mã xác nhận</label>
                            <br></br>
                            Mã xác nhận:
                            <Form.Item
                                name="code"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            Password mới :
                            <Form.Item
                                name="password"

                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input type="password" />
                            </Form.Item>



                            <Button type="primary" htmlType="submit" >
                                Change Password
                            </Button>

                        </Form>
                    </div>



                </Modal>
                <ToastContainer />
            </div>
        </>
    )
}
export default RecoveryPass;