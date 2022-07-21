import axios from "../../../axios";
const getAllBookingOfPT = (id, page) => {
    return axios.get(`/api/${id}/get-booking-of-pt?page=${page}`);
};
const getAcceptBooking = (Status, bookingId, CustomerId, CustomerName, ScheduleId, Price) => {
    return axios.put(`/api/staff/accept-booking`, { Status: Status, bookingId: bookingId, CustomerId: CustomerId, CustomerName: CustomerName, ScheduleId: ScheduleId, Price: Price });
};
const getCancelBooking = (Status, bookingId, ScheduleId) => {
    return axios.put(`/api/staff/cancel-booking`, { Status: Status, bookingId: bookingId, ScheduleId: ScheduleId });
};

const getDetailSchedule = (id) => {
    return axios.get(`/api/get-schedule-working-by-id?id=${id}`);
};
const getServiceDetail = (id) => {
    return axios.get(`/api/get-detail-service?id=${id}`);
};
export { getAllBookingOfPT, getAcceptBooking, getCancelBooking, getServiceDetail, getDetailSchedule }