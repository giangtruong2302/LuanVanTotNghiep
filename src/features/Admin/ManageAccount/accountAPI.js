import axios from "../../../axios";

const getAllAccount = (fullName, page) => {
  return axios.get(
    `/api/admin/get-all-account?fullName=${fullName}&page=${page}`
  );
};
export { getAllAccount };
