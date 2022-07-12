import axios from "../../../axios";

const getAllCenter = (CenterName, page) => {
  return axios.get(`/api/get-all-center?CenterName=${CenterName}&page=${page}`);
};
export { getAllCenter };
