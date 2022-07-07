import axios from "../../../../axios";
// import axios from 'axios'

const handleCreateNewManager = (
  fullName,
  password,
  email,
  phoneNumber,
  gender,
  address,
  roleId,
  avatar,
  fileName,
  centerId,
  salaryId,
  id,
  ExternalId
) => {
  // console.log("first", userEmail, userPassword);
  return axios.post(`/api/create-new-user`, {
    fullName,
    password,
    email,
    phoneNumber,
    gender,
    address,
    roleId,
    avatar,
    fileName,
    centerId,
    salaryId,
    id,
    ExternalId,
  }); // req.body.email, req.body.password //
};
const handleUpdateManager = (
  fullName,
  // password,
  email,
  phoneNumber,
  gender,
  address,
  roleId,
  avatar,
  fileName,
  centerId,
  salaryId,
  id,
  ExternalId
) => {
  // console.log("first", userEmail, userPassword);
  return axios.put(`/api/admin/update-account`, {
    fullName,
    // password,
    email,
    phoneNumber,
    gender,
    address,
    roleId,
    avatar,
    fileName,
    centerId,
    salaryId,
    id,
    ExternalId,
  }); // req.body.email, req.body.password //
};
const handleDeleteManager = (ExternalId, roleId) => {
  return axios.delete(`/api/admin/delete-account`, {
    data: { ExternalId: ExternalId, roleId: roleId },
  });
};
export { handleCreateNewManager, handleUpdateManager, handleDeleteManager };
