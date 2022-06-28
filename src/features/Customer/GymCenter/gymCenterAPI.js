import axios from "../../../axios";

const getAllGymCenter = (page) => {
    return axios.get(`/api/get-all-center?page=${page}`);
};
export { getAllGymCenter };