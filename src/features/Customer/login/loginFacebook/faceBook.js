import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import './faceBook.scss'
import { checkEmail } from '../../RecoveryPass/RecoveryPassAPI';
import { createUser } from '../../../sign-up/signUpAPI';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLoginUserAPI } from "../loginUserAPI";
import * as actions from "../../../../store/actions";
import { message } from "antd";


const Facebook = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [active, setActive] = useState(true)
    const [gender, setGender] = useState(true)
    const [roleId, setRoleId] = useState(5)
    const [centerId, setCenterId] = useState(1)
    const [emailRes, setEmail] = useState()
    const [fullName, setFullName] = useState()
    const responseFacebook = (res) => {

        if (res.email) {
            checkEmail(res.email).then((response) => {

                if (response.errorCode === 1) {

                    createUser(Math.floor(Math.random() * 1000), res.email, "", res.name, "", "", active, "", roleId.toString(), Math.floor(Math.random() * 1000), gender, "", "", "", centerId).then((response) => {
                        console.log("emailRes: ", res.email)
                        if (response.errCode === 0) {
                            try {
                                handleLoginUserAPI(res.email, "")
                                    .then((res) => {

                                        if (res.errorCode === 0) {
                                            const dataCus = res.data;
                                            dispatch(dispatch(actions.cusLoginSuccess(dataCus)));
                                            navigate(`/`);
                                        } else {
                                            message.error("login fail");
                                        }

                                    })

                            } catch (error) {
                                console.log(error);
                            }
                        }
                    })
                }
                if (response.errorCode === 0) {
                    try {
                        handleLoginUserAPI(res.email, "")
                            .then((res) => {

                                if (res.errorCode === 0) {
                                    const dataCus = res.data;
                                    dispatch(dispatch(actions.cusLoginSuccess(dataCus)));
                                    navigate(`/`);
                                } else {
                                    message.error("login fail");
                                }

                            })

                    } catch (error) {
                        console.log(error);
                    }
                }
            })
        }

    }
    return (
        <div>

            <FacebookLogin
                appId="5564700986882792"

                fields="name,email,picture"
                callback={responseFacebook}
                cssClass="my-facebook-button-class"
                icon="fa-brands fa-facebook"
            />,
        </div>
    )



}
export default Facebook;