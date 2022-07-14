import axios from "../../../axios";

const checkEmail = (email) => {
    return axios.post(`/api/auth-email-in-db`, {
        email: email,
    });
};

const changePass = (email, newPassword) => {
    return axios.put(`/api/change-password-when-auth`, {
        email: email,
        newPassword: newPassword,
    });
};
export { checkEmail, changePass }
