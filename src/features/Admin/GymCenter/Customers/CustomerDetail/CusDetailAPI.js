import axios from "../../../../../axios";

const handleGetDetailCustomer = (id) => {
  return axios.get(`/api/get-detail-customer?id=${id}`);
};
const handleGetBookingOfCustomer = (CustomerId, page) => {
  return axios.get(`/api/${CustomerId}/get-booking-of-customer?page=${page}`);
};
export { handleGetDetailCustomer, handleGetBookingOfCustomer };
