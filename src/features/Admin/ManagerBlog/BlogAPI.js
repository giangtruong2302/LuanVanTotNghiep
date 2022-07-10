import axios from "../../../axios";
const handleGetAllBlog = (page) => {
  return axios.get(`/api/admin/get-all-blog?page=${page}`);
};
export default handleGetAllBlog;
