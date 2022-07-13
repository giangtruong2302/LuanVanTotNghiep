import * as yup from "yup";

export const signupSchema = () => {
  return yup.object({
    email: yup.string().required("please enter email"),
    password: yup.string().required("please enter password"),
    fullName: yup.string().required("please enter your full name"),
    username: yup.string.required("please enter your user name"),
    phoneNumber: yup.string().required("please enter your phone number"),
    address: yup.string().required("please enter your address"),
    gender: yup.string().required("choose your address"),
    center: yup.string().required("choose your center"),
    avatar: yup.string().required("choose your avatar"),
  });
};
