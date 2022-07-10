import axios from "../../../../../axios";

const handleGetDetailStaff = (id) => {
  return axios.get(`/api/get-detail-pt?id=${id}`);
};
const handleGetBookingOfStaff = (StaffId, page) => {
  return axios.get(`/api/${StaffId}/get-booking-of-pt?page=${page}`);
};
export { handleGetDetailStaff, handleGetBookingOfStaff };
