import axios from "../../../../axios";

const getAllGymCenter = (page) => {
    return axios.get(`/api/get-all-center?page=${page}`);
};
const createReview = (ratingPoint, reviewContent, CustomerId, CenterId) => {
    return axios.post(`/api/admin/create-new-review`, { ratingPoint: ratingPoint, reviewContent: reviewContent, CustomerId, CenterId });
};
export { getAllGymCenter, createReview };