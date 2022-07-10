import axios from "../../axios";

const getPTDetail = (id) => {
    return axios.get(`/api/get-detail-pt?id=${id}`);
};

const createSchedule = (DayWork, StaffId, TimeId) => {
    return axios.post(`/api/create-schedule-working?DayWork`, { DayWork: DayWork, StaffId: StaffId, TimeId: TimeId });
};
const getAllTimeWorking = (page) => {
    return axios.get(`/api/get-all-time-working?page=${page}`);
};
export { getPTDetail, createSchedule, getAllTimeWorking };