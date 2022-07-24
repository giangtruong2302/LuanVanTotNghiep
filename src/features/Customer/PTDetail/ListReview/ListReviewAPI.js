import axios from "../../../../axios";

const getReviewOfPt = (StaffId, page) => {
    return axios.get(`/api/admin/get-review-of-pt?StaffId=${StaffId}&page=${page}`);
};
const getDetailCus = (id) => {
    return axios.get(`/api/get-detail-customer?id=${id}`);
};

export { getReviewOfPt, getDetailCus }