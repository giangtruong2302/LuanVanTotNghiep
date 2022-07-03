import axios from "../../../axios";

const getAllService = (page) => {
    return axios.get(`/api/get-all-service?page=${page}`);
};
export { getAllService };