import axios from "../../../../axios";

const getCusBooking = (id, page) => {
    return axios.get(`/api/${id}/get-booking-of-customer?page=${page}`);
};
const getOrder = (bookingId) => {
    return axios.get(`/api/get-detail-order?bookingId=${bookingId}`);
};
const getServiceDetail = (id) => {
    return axios.get(`/api/get-detail-service?id=${id}`);
};
export { getCusBooking, getOrder, getServiceDetail };