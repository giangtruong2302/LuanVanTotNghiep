import axios from "../../../../../axios";

const handleGetAllReviewOfCenter = (CenterId, page) => {
  return axios.get(
    `/api/admin/get-review-of-center?CenterId=${CenterId}&page=${page}`
  );
};
const handleHideReview = (id, Status) => {
  return axios.put(`/api/admin/hide-review`, { id, Status });
};
export { handleGetAllReviewOfCenter, handleHideReview };
