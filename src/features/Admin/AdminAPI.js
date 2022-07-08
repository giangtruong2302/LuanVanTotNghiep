import axios from "../../axios";

const getAllCenter = (page) => {
  return axios.get(`/api/get-all-center?page=${page}`);
};
const getDetailCenter = (id) => {
  return axios.get(`/api/get-detail-center?id=${id}`);
};
export { getAllCenter, getDetailCenter };
