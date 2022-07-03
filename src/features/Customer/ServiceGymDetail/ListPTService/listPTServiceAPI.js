import axios from "../../../../axios";

const getPtOfService = (id, page) => {
    return axios.get(`/api/${id}/get-all-pt-center?page=${page}`);
};
export { getPtOfService };