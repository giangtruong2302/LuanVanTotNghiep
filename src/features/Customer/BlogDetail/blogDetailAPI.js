import axios from "../../../axios";

const getBlogDetail = (id) => {
    return axios.get(`/api/get-detail-blog?id=${id}`);
};


export { getBlogDetail };