import axios from "../../../../axios";

const getAllCustomerOfCenter = (CenterId, page) => {
  return axios.get(`/api/merchant/${CenterId}/customer-center?page=${page}`);
};
const getAllCustomerOfSystem = (page) => {
  return axios.get(`/api/get-all-customer?page=${page}`);
};
export { getAllCustomerOfCenter, getAllCustomerOfSystem };
