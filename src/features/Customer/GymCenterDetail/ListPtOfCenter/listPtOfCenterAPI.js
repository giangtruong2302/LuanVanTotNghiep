import axios from "../../../../axios";

const getPtOfCenter = (id, page) => {
    return axios.get(`/api/${id}/get-all-pt-center?page=${page}`);
};
export { getPtOfCenter };