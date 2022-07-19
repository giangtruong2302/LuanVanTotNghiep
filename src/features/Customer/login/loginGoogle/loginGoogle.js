
import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import { checkEmail } from '../../RecoveryPass/RecoveryPassAPI';
import { createUser } from '../../../sign-up/signUpAPI';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLoginUserAPI } from "../loginUserAPI";
import * as actions from "../../../../store/actions";
import { message } from "antd";




const Google = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [active, setActive] = useState(true)
    const [gender, setGender] = useState(true)
    const [roleId, setRoleId] = useState(5)
    const [centerId, setCenterId] = useState(1)

    const onSuccess = (res) => {
        console.log('Login success', res.profileObj);
        checkEmail(res.profileObj.email).then((response) => {
            if (response.errorCode === 1) {
                createUser(Math.floor(Math.random() * 1000), res.profileObj.email, "", res.profileObj.name, res.profileObj.imageUrl, "", active, "", roleId.toString(), Math.floor(Math.random() * 1000), gender, "", "", "", centerId).then((response) => {
                    if (response.errCode === 0) {
                        try {
                            handleLoginUserAPI(res.profileObj.email, "")
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
            else {
                try {
                    handleLoginUserAPI(res.profileObj.email, "")
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
    const onFailure = (res) => {
        console.log('Login fail', res);
    }
    return (
        <div>

            <GoogleLogin
                clientId="486606115670-ad2l3creiud9omp5aklv6b2749gi3hk4.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
            />

        </div>
    )



}
export default Google;