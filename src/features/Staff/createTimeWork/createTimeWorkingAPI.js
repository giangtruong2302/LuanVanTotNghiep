import axios from "../../../axios";

const createSchedule = (DayWork, StaffId, TimeId) => {
    return axios.post(`/api/create-schedule-working?DayWork`, { DayWork: DayWork, StaffId: StaffId, TimeId: TimeId });
};
const getAllTimeWorking = (page) => {
    return axios.get(`/api/get-all-time-working?page=${page}`);
};

export { createSchedule, getAllTimeWorking };