import axios from "../../../axios";
// import axios from 'axios'

const handleLoginUserAPI = (userEmail, userPassword) => {
    // console.log("first", userEmail, userPassword);
    return axios.post(`/api/user-login`, {
        email: userEmail,
        password: userPassword,
    }); // req.body.email, req.body.password //
};

export { handleLoginUserAPI };