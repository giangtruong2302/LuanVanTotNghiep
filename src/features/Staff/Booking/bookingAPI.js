import axios from "../../../axios";
const getBookingDetail = (id, page) => {
    return axios.get(`/api/${id}/get-booking-of-pt?page=${page}`);
};
export { getBookingDetail }