import axios from "../../../axios";
const handleGetDetailManager = (ExternalId) => {
  return axios.get(`/api/get-detail-manager?ExternalId=${ExternalId}`);
};
const handleGetDetailCenter = (CenterId) => {
  return axios.get(`/api/get-detail-center?id=${CenterId}`);
};
export { handleGetDetailManager, handleGetDetailCenter };
