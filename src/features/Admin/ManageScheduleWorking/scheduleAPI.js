import axios from "../../../axios";

const getAllSchedule = (page) => {
  return axios.get(`/api/get-all-schedule?page=${page}`);
};
const getAllTimeWorking = (page) => {
  return axios.get(`/api/get-all-time-working?page=${page}`);
};
const getAllWorkingOfStaff = (StaffId, page) => {
  return axios.get(
    `/api/${StaffId}/get-schedule-working-of-staff?page=${page}`
  );
};
export { getAllSchedule, getAllTimeWorking, getAllWorkingOfStaff };
