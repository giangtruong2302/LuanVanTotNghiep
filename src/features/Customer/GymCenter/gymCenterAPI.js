import axios from "../../../axios";

const getAllGymCenter = (page) => {
    return axios.get(`/api/get-all-center-active?page=${page}`);
};
const getCenterByName = (centerName) => {
    return axios.get(`/api/get-center-by-name?centerName=${centerName}`)
}
export { getAllGymCenter, getCenterByName };