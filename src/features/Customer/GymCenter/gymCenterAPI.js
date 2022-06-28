import axios from "axios";

const getAllGymCenter = (page) => {
    return axios.get(`http://localhost:3003/api/get-all-center?page=${page}`);
};
export { getAllGymCenter };