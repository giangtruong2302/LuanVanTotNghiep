import axios from "../../../axios";

const getAllManager = (ManagerName, page) => {
  return axios.get(
    `/api/get-all-manager?ManagerName=${ManagerName}&page=${page}`
  );
};
export { getAllManager };
