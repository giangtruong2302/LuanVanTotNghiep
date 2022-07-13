import axios from "../../../axios";
const getAllBookingOfPT = (id, page) => {
    return axios.get(`/api/${id}/get-booking-of-pt?page=${page}`);
};
const getAcceptBooking = (Status, bookingId, CustomerId, CustomerName, ScheduleId, Price) => {
    return axios.put(`/api/staff/accept-booking`, { Status: Status, bookingId: bookingId, CustomerId: CustomerId, CustomerName: CustomerName, ScheduleId: ScheduleId, Price: Price });
};
const getCancelBooking = (Status, bookingId) => {
    return axios.put(`/api/staff/cancel-booking`, { Status: Status, bookingId: bookingId });
};
export { getAllBookingOfPT, getAcceptBooking, getCancelBooking }