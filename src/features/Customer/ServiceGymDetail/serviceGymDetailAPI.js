import axios from "../../../axios";

const getServiceGymDetail = (ServiceId) => {
    return axios.get(`/api/get-detail-service?ServiceId=${ServiceId}`);
};
export { getServiceGymDetail };