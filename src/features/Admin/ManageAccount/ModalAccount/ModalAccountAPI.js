import axios from "../../../../axios";
// import axios from 'axios'

const handleCreateNewAcount = (
  email,
  password,
  fullName,
  avatar,
  fileName,
  isActive,
  userName,
  roleId,
  ExternalId
) => {
  // console.log("first", userEmail, userPassword);
  return axios.post(`/api/create-new-user`, {
    email,
    password,
    fullName,
    avatar,
    fileName,
    isActive,
    userName,
    roleId,
    ExternalId,
  }); // req.body.email, req.body.password //
};
const handleUpdateNewAcount = (
  email,
  password,
  fullName,
  avatar,
  fileName,
  // isActive,
  userName,
  roleId,
  ExternalId,
  id
) => {
  // console.log("first", userEmail, userPassword);
  return axios.put(`/api/admin/update-account`, {
    email,
    password,
    fullName,
    avatar,
    fileName,
    // isActive,
    userName,
    roleId,
    ExternalId,
    id,
  }); // req.body.email, req.body.password //
};

export { handleCreateNewAcount, handleUpdateNewAcount };
