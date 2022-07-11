import * as yup from "yup";

export const ChangePasswordSchema = () => {
  return yup.object({
    oldPassword: yup.string().required("Please enter your current password"),
    password: yup.string().required("Please enter your new password"),
    password2: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password confirm must match ")
      .required("Confirm password must match password"),
  });
};
export const ChangeDetailSchema = () => {
  return yup.object({
    name: yup.string().required("Please enter your name"),
    email: yup.string().required("Please enter your email"),
    phoneNumber: yup.string().required("Please enter your phoneNumber"),
    gender: yup.string().required("Please select your gender"),
    address: yup.string().required("Please enter your address"),
  });
};
