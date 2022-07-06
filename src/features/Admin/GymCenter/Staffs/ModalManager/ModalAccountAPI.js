import axios from "../../../../../axios";
// import axios from 'axios'

const handleCreateNewAcount = (
  email,
  password,
  fullName,

  isActive,
  userName,
  roleId
) => {
  // console.log("first", userEmail, userPassword);
  return axios.post(`/api/create-new-user`, {
    email,
    password,
    fullName,

    isActive,
    userName,
    roleId,
  }); // req.body.email, req.body.password //
};

export { handleCreateNewAcount };
