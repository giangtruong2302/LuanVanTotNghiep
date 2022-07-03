import axios from "../../../axios";

const getPtDetail = (id) => {
    return axios.get(`/api/get-detail-pt?id=${id}`);
};
export { getPtDetail };