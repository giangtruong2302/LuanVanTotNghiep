import axios from "../../../axios";
const getPTDetail = (ExternalId) => {
    return axios.get(`/api/get-detail-staff-by-external?ExternalId=${ExternalId}`);
};
const updateStaffDetail = (id, ExternalId, fullName, email, avatar, fileName, phoneNumber, Gender, address, roleId, dob, centerId, salaryId) => {
    return axios.put(`/api/admin/update-account`, { id: id, ExternalId: ExternalId, fullName: fullName, email: email, avatar: avatar, fileName: fileName, phoneNumber: phoneNumber, Gender: Gender, address: address, roleId: roleId, dob, centerId: centerId, salaryId: salaryId });
};
export { getPTDetail, updateStaffDetail }