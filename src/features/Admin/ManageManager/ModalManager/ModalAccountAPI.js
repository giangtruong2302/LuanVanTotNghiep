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
  centerId,
  salaryId
) => {
  // console.log("first", userEmail, userPassword);
  return axios.post(`/api/create-new-manager`, {
    fullName,
    password,
    email,
    phoneNumber,
    gender,
    address,
    roleId,
    centerId,
    salaryId,
  }); // req.body.email, req.body.password //
};

export { handleCreateNewManager };
