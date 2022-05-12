import actionTypes from "./actionTypes";
// import {
//     getAllCodeService, getAllUsers,
//     deleteUserService, editUserService, getTopDoctorHomeService, getTAllDoctors, saveDetailDoctorService,
//     getAllSpecialty, getAllClinic
// } from "../../services/userService";
// import { createNewUserService } from "../../services/userService";
import { toast } from "react-toastify";

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

// Get data từ API trong file actions redux //
// export const fetchGenderStart = (dispatch, getState) => {
//     return async (dispatch, getState) => {
//         try {

//             dispatch({
//                 type: actionTypes.FETCH_GENDER_START
//             })

//             let res = await getAllCodeService("GENDER");
//             if (res && res.errCode == 0) {
//                 dispatch(fetchGenderSUCCESS(res.data)); // fire action
//             } else {
//                 dispatch(fetchGenderFAILED());
//             }
//         } catch (e) {
//             dispatch(fetchGenderFAILED());
//             console.log(e);
//         }
//     }

// }

// export const fetchGenderSUCCESS = (genderData) => ({
//     type: actionTypes.FETCH_GENDER_SUCCESS,
//     data: genderData
// })

// export const fetchGenderFAILED = () => ({
//     type: actionTypes.FETCH_GENDER_FAILED
// })

// // POSITION //

// export const fetchPositionSUCCESS = (positionData) => ({
//     type: actionTypes.FETCH_POSITION_SUCCESS,
//     data: positionData
// })

// export const fetchPositionFAILED = () => ({
//     type: actionTypes.FETCH_POSITION_FAILED
// })

// // ROLE //

// export const fetchRoleSUCCESS = (roleData) => ({
//     type: actionTypes.FETCH_ROLE_SUCCESS,
//     data: roleData
// })

// export const fetchRoleFAILED = () => ({
//     type: actionTypes.FETCH_ROLE_FAILED
// })

// export const fetchPositionStart = (dispatch, getState) => {
//     return async (dispatch, getState) => {
//         try {

//             let res = await getAllCodeService("POSITION");
//             if (res && res.errCode == 0) {
//                 dispatch(fetchPositionSUCCESS(res.data)); // fire action
//             } else {
//                 dispatch(fetchPositionFAILED());
//             }
//         } catch (e) {
//             dispatch(fetchPositionFAILED());
//             console.log(e);
//         }
//     }

// }
// export const fetchRoleStart = (dispatch, getState) => {
//     return async (dispatch, getState) => {
//         try {

//             let res = await getAllCodeService("ROLE");
//             if (res && res.errCode == 0) {
//                 dispatch(fetchRoleSUCCESS(res.data)); // fire action
//             } else {
//                 dispatch(fetchRoleFAILED());
//             }
//         } catch (e) {
//             dispatch(fetchRoleFAILED());
//             console.log(e);
//         }
//     }

// }

// export const createNewUser = (data) => {
//     return async (dispatch, getState) => {
//         try {
//             if (!data) {
//                 alert("Undefine");
//                 return
//             }

//             let res = await createNewUserService(data);
//             if (res && res.errCode == 0) {
//                 toast.success("Create a new user succeed");
//                 dispatch(saveUserSuccess()); // fire action
//                 dispatch(fetchUserStart());
//             } else {
//                 dispatch(saveUserFailed());
//             }
//         } catch (e) {
//             dispatch(saveUserFailed());
//             console.log(e);
//         }
//     }
// }

// export const saveUserSuccess = () => ({
//     type: 'CREATE_USER_SUCCESS'
// })

// export const saveUserFailed = () => ({
//     type: 'CREATE_USER_FAILED'
// })

// export const fetchUserStart = () => {
//     return async (dispatch, getState) => {
//         try {

//             let res = await getAllUsers("ALL");

//             if (res && res.errCode == 0) {
//                 dispatch(fetchAllUserSUCCESS(res.user.reverse())); // fire action // sort user //
//             } else {
//                 dispatch(fetchAllUserFAILED());
//             }
//         } catch (e) {
//             dispatch(fetchAllUserFAILED());
//             console.log(e);
//         }
//     }

// }

// export const fetchAllUserSUCCESS = (data) => ({
//     type: actionTypes.FETCH_ALL_USERS_SUCCESS,
//     users: data
// })

// export const fetchAllUserFAILED = () => ({
//     type: actionTypes.FETCH_ALL_USERS_FAILED,
// })

// export const deleteAUser = (userId) => {
//     return async (dispatch, getState) => {
//         try {

//             let res = await deleteUserService(userId);
//             if (res && res.errCode == 0) {
//                 toast.success("Delete the user succeed");
//                 dispatch(saveUserSuccess()); // fire action
//                 dispatch(fetchUserStart());
//             } else {
//                 toast.error("Delete the user failed");
//                 dispatch(saveUserFailed());
//             }
//         } catch (e) {
//             dispatch(saveUserFailed());
//             console.log(e);
//         }
//     }
// }

// export const deleteUserSucceess = () => ({
//     type: actionTypes.DELETE_USER_SUCCESS
// })

// export const deleteUserFailed = () => ({
//     type: actionTypes.FETCH_ALL_USERS_FAILED
// })

// export const editNewUser = (data) => {
//     return async (dispatch, getState) => {
//         try {
//             if (!data) {
//                 alert("Undefine");
//                 return
//             }

//             let res = await editUserService(data);
//             if (res && res.errorCode === 0) {
//                 toast.success("Update user succeed");
//                 dispatch(editUserSuccess()); // fire action
//                 dispatch(fetchUserStart());
//             } else {
//                 dispatch(editUserFailed());
//             }
//         } catch (e) {
//             dispatch(editUserFailed());
//             console.log(e);
//         }
//     }
// }

// export const editUserSuccess = () => ({
//     type: actionTypes.EDIT_USER_SUCCESS
// })

// export const editUserFailed = () => ({
//     type: actionTypes.EDIT_USER_FAILED
// })

// export const fetchTopDoctors = () => {
//     return async (dispatch, getState) => {
//         try {
//             let res = await getTopDoctorHomeService('10');
//             if (res && res.errCode === 0) {
//                 dispatch({
//                     type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
//                     data: res.data
//                 })
//             } else {
//                 dispatch({
//                     type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
//                 })
//             }
//         } catch (e) {
//             console.log('FETCH_TOP_DOCTOR_FAILED', e);
//             dispatch({
//                 type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
//             })
//         }
//     }
// }

// export const fetchAllDoctors = () => {
//     return async (dispatch, getState) => {
//         try {
//             let res = await getTAllDoctors();
//             if (res && res.errCode === 0) {
//                 dispatch({
//                     type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
//                     dataDr: res.data
//                 })
//             } else {
//                 dispatch({
//                     type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
//                 })
//             }
//         } catch (e) {
//             console.log('FETCH_ALL_DOCTOR_FAILED', e);
//             dispatch({
//                 type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
//             })
//         }
//     }
// }

// export const saveDetailDoctor = (data) => {
//     return async (dispatch, getState) => {
//         try {
//             console.log(data);
//             let res = await saveDetailDoctorService(data);
//             if (res && res.errCode === 0) {
//                 toast.success("Save infor doctor succeed");
//                 dispatch({
//                     type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,

//                 })
//             } else {
//                 dispatch({
//                     type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
//                 })
//             }
//         } catch (e) {
//             toast.error("Save infor doctor error");
//             console.log('SAVE_DETAIL_DOCTOR_FAILED', e);
//             dispatch({
//                 type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
//             })
//         }
//     }
// }

// export const fetchAllScheduleTime = () => {
//     return async (dispatch, getState) => {
//         try {
//             let res = await getAllCodeService("TIME");
//             if (res && res.errCode === 0) {
//                 dispatch({
//                     type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
//                     dataTime: res.data
//                 })
//             } else {
//                 dispatch({
//                     type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
//                 })
//             }
//         } catch (e) {
//             console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED', e);
//             dispatch({
//                 type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
//             })
//         }
//     }
// }

// export const getAllRequiredDoctorInfor = () => {
//     return async (dispatch, getState) => {
//         try {

//             dispatch({
//                 type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START
//             })

//             let resPrice = await getAllCodeService("PRICE");
//             let resPayment = await getAllCodeService("PAYMENT");
//             let resProvince = await getAllCodeService("PROVINCE");
//             let resSpecialty = await getAllSpecialty();
//             let resClinic = await getAllClinic();

//             if (resPrice && resPrice.errCode == 0
//                 && resPayment && resPayment.errCode == 0
//                 && resProvince && resProvince.errCode == 0
//                 && resSpecialty && resSpecialty.errCode === 0
//                 && resClinic && resClinic.errCode === 0) {
//                 let data = {
//                     resPrice: resPrice.data,
//                     resPayment: resPayment.data,
//                     resProvince: resProvince.data,
//                     resSpecialty: resSpecialty.data,
//                     resClinic: resClinic.data
//                 }
//                 dispatch(fetchRequiredDoctorInforSUCCESS(data)); // fire action
//             } else {
//                 dispatch(fetchRequiredDoctorInforFAILED());
//             }
//         } catch (e) {
//             dispatch(fetchRequiredDoctorInforFAILED());
//             console.log(e);
//         }
//     }

// }

// export const fetchRequiredDoctorInforSUCCESS = (allRequiredData) => ({
//     type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
//     data: allRequiredData
// })

// export const fetchRequiredDoctorInforFAILED = () => ({
//     type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED
// })
