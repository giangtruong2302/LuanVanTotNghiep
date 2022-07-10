import axios from "../../../axios";

const getAllSchedule = (page) => {
  return axios.get(`/api/get-all-schedule?page=${page}`);
};
const getAllTimeWorking = (page) => {
  return axios.get(`/api/get-all-time-working?page=${page}`);
};
const getAllWorkingOfStaff = (StaffId, page) => {
  return axios.get(
    `/api/${StaffId}/get-schedule-working-of-staff?page=${page}`
  );
};
const handleGetAllOrder = (page) => {
  return axios.get(`/api/admin/get-all-order?page=${page}`);
};
const handleGetDetailBookingOfCustomer = (CustomerId) => {
  return axios.get(`/api/${CustomerId}/get-detail-booking-of-customer`);
};
const handleGetDetailDiscount = (id) => {
  return axios.get(`/api/get-discount-detail?id=${id}`);
};
const handleGetDetailService = (id) => {
  return axios.get(`/api/get-detail-service?id=${id}`);
};
export {
  handleGetDetailService,
  handleGetDetailDiscount,
  getAllSchedule,
  getAllTimeWorking,
  getAllWorkingOfStaff,
  handleGetAllOrder,
  handleGetDetailBookingOfCustomer,
};
