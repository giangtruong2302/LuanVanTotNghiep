import axios from "../../../../axios";

const getCusBooking = (id, page) => {
    return axios.get(`/api/${id}/get-booking-of-customer?page=${page}`);
};


export { getCusBooking };