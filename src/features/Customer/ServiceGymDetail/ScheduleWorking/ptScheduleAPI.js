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
const getCusDetail = (ExternalId) => {
    return axios.get(`/api/get-detail-customer-by-externalId?ExternalId=${ExternalId}`);
};
const getTimeById = (id) => {
    return axios.get(`/api/get-time-working-by-id?id=${id}`);
};
const getPtOfService = (ServiceId, page) => {
    return axios.get(`/api/get-staff-by-service?ServiceId=${ServiceId}&page=${page}`);
};
const getServiceOfPt = (StaffId, page) => {
    return axios.get(`/api/get-service-by-staff?StaffId=${StaffId}&page=${page}`);
};
export { getTimeWorking, createBooking, getDetailPT, getDetailService, getDisCount, getTimeById, getCusDetail, getPtOfService, getServiceOfPt };

