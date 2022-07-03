import axios from "../../../axios";

const getAllStaff = (page) => {
    return axios.get(`/api/get-all-pt?page=${page}`);
};
export { getAllStaff };