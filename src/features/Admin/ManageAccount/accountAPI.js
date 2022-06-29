import axios from "../../../axios";

const getAllAccount = (page) => {
  return axios.get(`/api/admin/get-all-account?page=${page}`);
};
export { getAllAccount };
