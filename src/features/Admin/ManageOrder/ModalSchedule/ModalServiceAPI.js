import axios from "../../../../axios";
// import axios from 'axios'

const handleCreateNewService = (
  ServiceName,
  WorkDuration,
  Price,
  ServiceImage,
  fileName
) => {
  // console.log("first", userEmail, userPassword);
  return axios.post(`/api/create-new-service`, {
    ServiceName,
    WorkDuration,
    Price,
    ServiceImage,
    fileName,
  });
};
const handleUpdateService = (
  id,
  ServiceName,
  WorkDuration,
  Price,
  ServiceImage,
  fileName
) => {
  return axios.put(`/api/update-service`, {
    id: id,
    ServiceName: ServiceName,
    WorkDuration: WorkDuration,
    Price: Price,
    ServiceImage: ServiceImage,
    fileName,
  });
};
const handleDeleteService = (id) => {
  return axios.delete(`/api/delete-service`, { data: { id: id } });
};
export { handleCreateNewService, handleUpdateService, handleDeleteService };
