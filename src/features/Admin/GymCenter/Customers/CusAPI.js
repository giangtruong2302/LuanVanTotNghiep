import axios from "../../../../axios";

const getAllCustomerOfCenter = (CenterId, page) => {
  return axios.get(`/api/merchant/${CenterId}/customer-center?page=${page}`);
};
export { getAllCustomerOfCenter };
