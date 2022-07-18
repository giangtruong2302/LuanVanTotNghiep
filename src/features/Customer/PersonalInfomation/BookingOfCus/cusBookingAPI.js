import axios from "../../../../axios";

const getCusBooking = (id, page) => {
    return axios.get(`/api/${id}/get-booking-of-customer?page=${page}`);
};
const getOrder = (bookingId) => {
    return axios.get(`/api/get-detail-order?bookingId=${bookingId}`);
};

export { getCusBooking, getOrder };