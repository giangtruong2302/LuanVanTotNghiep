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
const handleCreateNewDiscount = (DiscountRate) => {
  return axios.post(`/api/admin/create-new-discount-rate`, { DiscountRate });
};
const handleUpdateDiscount = (id, DiscountRate) => {
  return axios.put(`/api/admin-update-discount`, { id, DiscountRate });
};
const handleDeleteDiscount = (id) => {
  return axios.delete(`/api/admin-delete-discount`, { data: { id: id } });
};
const handleCreateNewSalary = (Salary) => {
  return axios.post(`/api/admin/create-new-salary`, { Salary });
};
const handleUpdateSalary = (id, Salary) => {
  return axios.put(`/api/admin/update-salary-rate`, { id, Salary });
};
const handleDeleteSalary = (id) => {
  return axios.delete(`/api/admin/delete-salary`, { data: { id: id } });
};

export {
  handleCreateNewSalary,
  handleUpdateSalary,
  handleDeleteSalary,
  handleCreateNewService,
  handleUpdateService,
  handleDeleteService,
  handleCreateNewDiscount,
  handleUpdateDiscount,
  handleDeleteDiscount,
};
