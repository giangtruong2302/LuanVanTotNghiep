import axios from "../../../../axios";

const getAllStaffOfCenter = (CenterId, page) => {
  return axios.get(`/api/merchant/${CenterId}/staff-center?page=${page}`);
};
export { getAllStaffOfCenter };
