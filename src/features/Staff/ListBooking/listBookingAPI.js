import axios from "../../../axios";
const getAllBookingOfPT = (id, page) => {
    return axios.get(`/api/${id}/get-booking-of-pt?page=${page}`);
};
const getAcceptBooking = (Status, bookingId, ScheduleId) => {
    return axios.put(`/api/staff/accept-booking`, { Status: Status, bookingId: bookingId, ScheduleId: ScheduleId });
};
const getCancelBooking = (Status, bookingId) => {
    return axios.put(`/api/staff/cancel-booking`, { Status: Status, bookingId: bookingId });
};
export { getAllBookingOfPT, getAcceptBooking, getCancelBooking }