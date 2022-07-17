import axios from "../../../../../axios";

const getAllScheduleByWeek = (StartTime, EndTime) => {
  return axios.get(
    `/api/get-all-schedule-by-week?StartTime=${StartTime}&EndTime=${EndTime}`
  );
};
const getAllTimeWorking = (page) => {
  return axios.get(`/api/get-all-time-working?page=${page}`);
};
const getAllWorkingOfStaff = (StaffId, page) => {
  return axios.get(
    `/api/${StaffId}/get-schedule-working-of-staff?page=${page}`
  );
};
export { getAllScheduleByWeek, getAllTimeWorking, getAllWorkingOfStaff };
