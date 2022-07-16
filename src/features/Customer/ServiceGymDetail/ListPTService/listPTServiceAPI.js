import axios from "../../../../axios";

const getPtOfService = (ServiceId, page) => {
    return axios.get(`/api/get-staff-by-service?ServiceId=${ServiceId}&page=${page}`);
};

const getPtDetail = (id) => {
    return axios.get(`/api/get-detail-pt?id=${id}`);
};
export { getPtOfService, getPtDetail };