import axios from "../../../axios";

const getServiceGymDetail = (id) => {
    return axios.get(`/api/get-detail-service?id=${id}`);
};
export { getServiceGymDetail };