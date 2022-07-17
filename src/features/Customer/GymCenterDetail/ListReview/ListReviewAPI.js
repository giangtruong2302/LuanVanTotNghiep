import axios from "../../../../axios";

const getReview = (CenterId, page) => {
    return axios.get(`/api/admin/get-review-of-center?CenterId=${CenterId}&page=${page}`);
};
const getDetailCus = (id) => {
    return axios.get(`/api/get-detail-customer?id=${id}`);
};

export { getReview, getDetailCus }