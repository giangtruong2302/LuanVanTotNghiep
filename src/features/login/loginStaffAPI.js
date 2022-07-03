import axios from "../../axios";
// import axios from 'axios'

const handleLoginStaffAPI = (userEmail, userPassword) => {
    // console.log("first", userEmail, userPassword);
    return axios.post(`/api/staff-login`, {
        email: userEmail,
        password: userPassword,
    }); // req.body.email, req.body.password //
};

export { handleLoginStaffAPI };