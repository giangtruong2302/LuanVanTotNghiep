import axios from "../../../axios";

const getAllCenter = (CenterName, page) => {
  return axios.get(`/api/get-all-center?CenterName=${CenterName}&page=${page}`);
};
const getDetailTime = (id) => {
  return axios.get(`/api/get-all-time-working?id=${id}`);
};
export { getAllCenter, getDetailTime };
