import axios from "../../../axios";
const getPTDetail = (id) => {
    return axios.get(`/api/get-detail-pt?id=${id}`);
};
const updateStaffDetail = (id, fullName, email, phoneNumber, Gender, DayOfBirth, address, roleId, avatar, centerId, salaryId) => {
    return axios.put(`/api/update-staff`, { id: id, fullName: fullName, email: email, phoneNumber: phoneNumber, Gender: Gender, DayOfBirth: DayOfBirth, address: address, roleId: roleId, avatar: avatar, centerId: centerId, salaryId: salaryId });
};
export { getPTDetail, updateStaffDetail }