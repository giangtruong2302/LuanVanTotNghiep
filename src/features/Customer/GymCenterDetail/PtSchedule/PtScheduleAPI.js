import axios from "../../../../axios";

const getTimeWorking = (StaffId, DayWork, page) => {
    return axios.get(`/api/${StaffId}/get-schedule-working?page=${page}&DayWork=${DayWork}`);
};
const createBooking = (CustomerId, PTId, CustomerName, PTName, CenterId, ServiceId, StartTime, EndTime, Status, IdDisCount, Price, ScheduleId) => {
    return axios.post(`/api/create-booking/create-new-booking`, { CustomerId: CustomerId, PTId: PTId, CustomerName: CustomerName, PTName: PTName, CenterId: CenterId, ServiceId: ServiceId, StartTime: StartTime, EndTime: EndTime, Status: Status, IdDisCount: IdDisCount, Price: Price, ScheduleId: ScheduleId });
};
const getDetailPT = (id) => {
    return axios.get(`/api/get-detail-pt?id=${id}`);
};
const getDetailService = (id) => {
    return axios.get(`/api/get-detail-service?id=${id}`);
};
const getDisCount = (id) => {
    return axios.get(`/api/get-discount-detail?id=${id}`);
};
export { getTimeWorking, createBooking, getDetailPT, getDetailService, getDisCount };

