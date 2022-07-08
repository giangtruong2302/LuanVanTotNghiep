import axios from "../../../axios";

const handleGetChartBooking = (CenterId, page) => {
  return axios.get(`/api/${CenterId}/get-booking-in-week?page=${page}`);
};
export { handleGetChartBooking };
