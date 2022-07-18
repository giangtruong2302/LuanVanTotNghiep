import axios from "../../../axios";

const getAllService = (ServiceName, page) => {
  return axios.get(
    `/api/get-all-service?ServiceName=${ServiceName}&page=${page}`
  );
};
const getAllDiscount = (DiscountRate, page) => {
  return axios.get(
    `/api/admin/get-all-discount?page=${page}&DiscountRate=${DiscountRate}`
  );
};
export { getAllService, getAllDiscount };
