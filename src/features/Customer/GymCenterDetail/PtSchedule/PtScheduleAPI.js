import axios from "../../../../axios";

const getTimeWorking = (StaffId, page) => {
    return axios.get(`/api/${StaffId}/get-schedule-working?page=${page}`);
};
const createBooking = (CustomerId, PTId, CustomerName, PTName, CenterId, ServiceId, StartTime, EndTime, Status) => {
    return axios.post(`/api/create-booking/create-new-booking`, { CustomerId: CustomerId, PTId: PTId, CustomerName: CustomerName, PTName: PTName, CenterId: CenterId, ServiceId: ServiceId, StartTime: StartTime, EndTime: EndTime, Status: Status });
};
const getDetailPT = (id) => {
    return axios.get(`/api/get-detail-pt?id=${id}`);
};
const getDetailService = (id) => {
    return axios.get(`/api/get-detail-service?id=${id}`);
};
export { getTimeWorking, createBooking, getDetailPT, getDetailService };

