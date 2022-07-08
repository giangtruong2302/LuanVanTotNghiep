import axios from "../../../../../axios";

const handleGetAllReviewOfCenter = (CenterId, page) => {
  return axios.get(
    `/api/admin/get-review-of-center?CenterId=${CenterId}&page=${page}`
  );
};
export { handleGetAllReviewOfCenter };
