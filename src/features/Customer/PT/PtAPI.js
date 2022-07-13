import axios from "../../../axios";

const getAllStaff = (page) => {
    return axios.get(`/api/get-all-pt?page=${page}`);
};
const getStaffByName = (staffName) => {
    return axios.get(`/api/get-staff-by-name?staffName=${staffName}`);
};

export { getAllStaff, getStaffByName };