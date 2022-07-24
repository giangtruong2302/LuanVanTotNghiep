import axios from "../../../axios";

const getPtDetail = (id) => {
    return axios.get(`/api/get-detail-pt?id=${id}`);
};
const getCenterDetail = (id) => {
    return axios.get(`/api/get-detail-center?id=${id}`);
};
export { getPtDetail, getCenterDetail };