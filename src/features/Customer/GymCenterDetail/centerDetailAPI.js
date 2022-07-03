import axios from "../../../axios";

const getCenterDetail = (id) => {
    return axios.get(`/api/get-detail-center?id=${id}`);
};
export { getCenterDetail };