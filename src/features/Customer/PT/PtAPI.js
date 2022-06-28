import axios from "../../../axios";

const getAllStaff = (page) => {
    return axios.get(`/api/get-all-staff?page=${page}`);
};
export { getAllStaff };