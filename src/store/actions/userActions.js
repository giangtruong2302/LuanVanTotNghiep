import actionTypes from './actionTypes';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

export const userLoginSuccess = (userInfo) => ({

    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo
})
export const staffLoginSuccess = (staffInfo) => ({

    type: actionTypes.STAFF_LOGIN_SUCCESS,
    staffInfo: staffInfo
})
export const cusLoginSuccess = (cusInfo) => ({

    type: actionTypes.CUS_LOGIN_SUCCESS,
    cusInfo: cusInfo
})

export const testRedux = () => {
    alert("Ok");

}
export const cusLoginFail = () => ({
    type: actionTypes.CUS_LOGIN_FAIL
})
export const staffLoginFail = () => ({
    type: actionTypes.STAFF_LOGIN_FAIL
})
export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})
export const staffLogout = () => ({
    type: actionTypes.STAFF_LOGOUT
})
export const cusLogout = () => ({
    type: actionTypes.CUS_LOGOUT
})