import axios from "../../../../axios";

const handleChangeInfoManager = (
  id,
  fullName,
  Gender,
  dob,
  phoneNumber,
  address,
  email,
  roleId,
  avatar,
  fileName,
  centerId,
  salaryId,
  ExternalId
) => {
  return axios.put(`/api/admin/update-account`, {
    id,
    fullName,
    Gender,
    dob,
    phoneNumber,
    address,
    email,
    roleId,
    avatar,
    fileName,
    centerId,
    salaryId,
    ExternalId,
  });
};
const handleChangePassword = (
  oldPassword,
  newPassword,
  confirmPassword,
  id
) => {
  return axios.put(`/api/change-password`, {
    oldPassword,
    newPassword,
    confirmPassword,
    id,
  });
};
export { handleChangeInfoManager, handleChangePassword };
