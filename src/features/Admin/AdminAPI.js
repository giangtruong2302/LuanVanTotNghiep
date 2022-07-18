import axios from "../../axios";

const getAllCenter = (page) => {
  return axios.get(`/api/get-all-center?page=${page}`);
};
const getAllCenterActive = (page) => {
  return axios.get(`/api/get-all-center-active?page=${page}`);
};
const getDetailCenter = (id) => {
  return axios.get(`/api/get-detail-center?id=${id}`);
};
const getBookingPending = (Status) => {
  return axios.get(`/api/get-booking-pending?Status=${Status}`);
};
const getBookingSchedule = (Status) => {
  return axios.get(`/api/get-booking-schedule?Status=${Status}`);
};
const getBookingCancel = (Status) => {
  return axios.get(`/api/get-booking-cancel?Status=${Status}`);
};
const handleGetAllStaff = (page) => {
  return axios.get(`/api/get-all-staff?page=${page}`);
};
export {
  getAllCenter,
  handleGetAllStaff,
  getDetailCenter,
  getBookingPending,
  getBookingSchedule,
  getBookingCancel,
  getAllCenterActive,
};
