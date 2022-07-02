import axios from "../../../../axios";

const getAllService = (ServiceName, page) => {
  return axios.get(
    `/api/get-all-service?ServiceName=${ServiceName}&page=${page}`
  );
};
export { getAllService };
