import axios from "../../../axios";

const getAllService = (page) => {
    return axios.get(`/api/get-all-service?page=${page}`);
};
const getAllStaff = (page) => {
    return axios.get(`/api/get-all-pt?page=${page}`);
};
const getAllGymCenter = (page) => {
    return axios.get(`/api/get-all-center?page=${page}`);
};
export { getAllService, getAllStaff, getAllGymCenter };