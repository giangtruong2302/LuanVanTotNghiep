import axios from "../../axios";

const createUser = (id, email, password, fullName, avatar, fileName, isActive, userName, roleId, ExternalId, gender, dayOfBirth, phoneNumber, address, centerId) => {
    return axios.post(`/api/create-new-user`, { id: id, email: email, password: password, fullName: fullName, avatar: avatar, fileName: fileName, isActive: isActive, userName: userName, roleId: roleId, ExternalId: ExternalId, gender: gender, dayOfBirth: dayOfBirth, phoneNumber: phoneNumber, address: address, centerId: centerId });
};
const getAllGymCenter = (page) => {
    return axios.get(`/api/get-all-center?page=${page}`);
};
export { createUser, getAllGymCenter }