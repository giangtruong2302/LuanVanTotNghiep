import axios from "../../../axios";

const handleGetInfoManager = (id) => {
  return axios.get(`/api/get-detail-manager?ExternalId=${id}`);
};
export { handleGetInfoManager };
