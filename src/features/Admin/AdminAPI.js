import axios from "../../axios";

const getAllCenter = (page) => {
  return axios.get(`/api/get-all-center?page=${page}`);
};
export { getAllCenter };
