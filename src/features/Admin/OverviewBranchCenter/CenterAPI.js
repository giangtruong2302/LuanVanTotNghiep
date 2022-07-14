import axios from "../../../axios";

const handleGetChartBooking = (CenterId, page) => {
  return axios.get(`/api/${CenterId}/get-booking-in-week?page=${page}`);
};
const handleGetChartBookingInMonth = (page) => {
  return axios.get(`/api/get-booking-in-month?page=${page}`);
};
const handleGetBookingOfCenter = (CenterId, name, page) => {
  return axios.get(
    `/api/merchant/${CenterId}/get-all-booking-of-center?page=${page}&name=${name}`
  );
};
const handleGet5ReviewNew = (CenterId) => {
  return axios.get(`/api/admin/get-5-review-newest?CenterId=${CenterId}`);
};
export {
  handleGetChartBooking,
  handleGet5ReviewNew,
  handleGetChartBookingInMonth,
  handleGetBookingOfCenter,
};
