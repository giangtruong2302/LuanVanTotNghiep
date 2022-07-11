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
const updateStaffDetail = (id, ExternalId, fullName, email, avatar, fileName, phoneNumber, Gender, address, roleId, dob, centerId, salaryId) => {
    return axios.put(`/api/admin/update-account`, { id: id, ExternalId: ExternalId, fullName: fullName, email: email, avatar: avatar, fileName: fileName, phoneNumber: phoneNumber, Gender: Gender, address: address, roleId: roleId, dob, centerId: centerId, salaryId: salaryId });
};
export { getPTDetail, createSchedule, getAllTimeWorking, updateStaffDetail };