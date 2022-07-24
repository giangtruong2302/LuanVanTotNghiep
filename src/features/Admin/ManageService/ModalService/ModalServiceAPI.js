import axios from "../../../../axios";
// import axios from 'axios'

const handleCreateNewService = (
  ServiceName,
  WorkDuration,
  Price,
  ServiceImage,
  fileName,
  CourseRoute,
  idDiscount
) => {
  // console.log("first", userEmail, userPassword);
  return axios.post(`/api/create-new-service`, {
    ServiceName,
    WorkDuration,
    Price,
    ServiceImage,
    fileName,
    CourseRoute,
    idDiscount,
  });
};
const handleUpdateService = (
  id,
  ServiceName,
  WorkDuration,
  Price,
  ServiceImage,
  fileName,
  CourseRoute,
  idDiscount
) => {
  return axios.put(`/api/update-service`, {
    id: id,
    ServiceName: ServiceName,
    WorkDuration: WorkDuration,
    Price: Price,
    ServiceImage: ServiceImage,
    fileName,
    CourseRoute,
    idDiscount,
  });
};
const handleDeleteService = (id) => {
  return axios.delete(`/api/delete-service`, { data: { id: id } });
};
const handleGetAllDiscountRate = (page, DiscountRate) => {
  return axios.get(
    `/api/admin/get-all-discount?DiscountRate=${DiscountRate}&page=${page}`
  );
};
export {
  handleCreateNewService,
  handleUpdateService,
  handleDeleteService,
  handleGetAllDiscountRate,
};
