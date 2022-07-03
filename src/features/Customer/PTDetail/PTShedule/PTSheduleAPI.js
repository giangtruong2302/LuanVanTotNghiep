import axios from "../../../../axios";

const getTimeWorking = (id, page) => {
    return axios.get(`/api/${id}/get-schedule-working?page=${page}`);
};
export { getTimeWorking };