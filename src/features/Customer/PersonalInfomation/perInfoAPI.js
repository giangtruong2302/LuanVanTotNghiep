import axios from "../../../axios";

const getCusDetail = (ExternalId) => {
    return axios.get(`/api/get-detail-customer-by-externalId?ExternalId=${ExternalId}`);
};

const updateCusDetail = (id, ExternalId, fullName, gender, dob, phoneNumber, address, roleId, avatar, fileName, email, centerId) => {
    return axios.put(`/api/admin/update-account`, { id: id, ExternalId: ExternalId, fullName: fullName, gender: gender, dob: dob, phoneNumber: phoneNumber, address: address, roleId: roleId, avatar: avatar, fileName: fileName, email: email, centerId: centerId });
};
const getAllGymCenter = (page) => {
    return axios.get(`/api/get-all-center-active?page=${page}`);
};
const createReview = (ratingPoint, reviewContent, CustomerId, CenterId, Status, StaffId) => {
    return axios.post(`/api/admin/create-new-review`, { ratingPoint: ratingPoint, reviewContent: reviewContent, CustomerId: CustomerId, CenterId: CenterId, Status: Status, StaffId });
};
export { getCusDetail, updateCusDetail, getAllGymCenter, createReview };