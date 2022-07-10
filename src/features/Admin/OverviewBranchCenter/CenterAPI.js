import axios from "../../../axios";

const handleGetChartBooking = (CenterId, page) => {
  return axios.get(`/api/${CenterId}/get-booking-in-week?page=${page}`);
};
const handleGetChartBookingInMonth = (page) => {
  return axios.get(`/api/get-booking-in-month?page=${page}`);
};
export { handleGetChartBooking, handleGetChartBookingInMonth };
