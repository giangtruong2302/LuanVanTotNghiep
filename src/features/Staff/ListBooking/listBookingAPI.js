import axios from "../../../axios";
const getAllBookingOfPT = (id, page) => {
    return axios.get(`/api/${id}/get-booking-of-pt?page=${page}`);
};
const getAcceptBooking = (Status, bookingId, CustomerId, CustomerName, StaffId, amount) => {
    return axios.put(`/api/staff/accept-booking`, { Status: Status, bookingId: bookingId, CustomerId: CustomerId, CustomerName: CustomerName, StaffId: StaffId, amount: amount });
};
const getCancelBooking = (Status, bookingId) => {
    return axios.put(`/api/staff/cancel-booking`, { Status: Status, bookingId: bookingId });
};
export { getAllBookingOfPT, getAcceptBooking, getCancelBooking }