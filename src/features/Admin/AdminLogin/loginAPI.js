import axios from "../../../axios";
// import axios from 'axios'

const handleLoginAPI = (userEmail, userPassword) => {
  // console.log("first", userEmail, userPassword);
  return axios.post(`/api/admin-login`, {
    email: userEmail,
    password: userPassword,
  }); // req.body.email, req.body.password //
};

export { handleLoginAPI };
