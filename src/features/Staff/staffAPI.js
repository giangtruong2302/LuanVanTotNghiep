import axios from "../../../axios";

const getPTDetail = (id) => {
    return axios.get(`/api/get-detail-pt?id=${id}`);
};


export { getPTDetail };