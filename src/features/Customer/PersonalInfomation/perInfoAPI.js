import axios from "../../../axios";

const getCusDetail = (id) => {
    return axios.get(`/api/get-detail-customer?id=${id}`);
};

const updateCusDetail = (id, fullName, Gender, DayOfBirth, phoneNumber, address, email, roleId, avatar, centerId) => {
    return axios.put(`/api/update-customer`, { id: id, fullName: fullName, Gender: Gender, DayOfBirth: DayOfBirth, phoneNumber: phoneNumber, address: address, email: email, roleId: roleId, avatar: avatar, centerId: centerId });
};
export { getCusDetail, updateCusDetail };