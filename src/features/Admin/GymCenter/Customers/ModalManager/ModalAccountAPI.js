import axios from "../../../../../axios";
// import axios from 'axios'

const handleCreateNewCustomer = (
  fullName,
  password,
  email,
  phoneNumber,
  gender,
  dob,
  address,
  roleId,
  avatar,
  fileName,
  centerId,

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
    dob,
    address,
    roleId,
    avatar,
    fileName,
    centerId,

    id,
    ExternalId,
  }); // req.body.email, req.body.password //
};
const handleUpdateStaff = (
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
const handleDeleteStaff = (ExternalId, roleId, id) => {
  return axios.delete(`/api/admin/delete-account`, {
    data: { ExternalId: ExternalId, roleId: roleId, id },
  });
};
export { handleCreateNewCustomer, handleUpdateStaff, handleDeleteStaff };
