import axios from "../../../axios";

const getAllBlog = (page) => {
    return axios.get(`/api/admin/get-all-blog?page=${page}`);
};


export { getAllBlog };