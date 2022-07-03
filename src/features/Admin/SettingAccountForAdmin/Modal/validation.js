import * as yup from "yup";

export const ChangePasswordSchema = () => {
  return yup.object({
    oldPassword: yup.string().required("Please enter your current password"),
    password: yup.string().required("Please enter your new password"),
    password2: yup.string().required("Please enter confirm password"),
  });
};
export const ChangeDetailSchema = () => {
  return yup.object({
    firstName: yup.string().required("Please enter your first name"),
    lastName: yup.string().required("Please enter your last name"),
    gender: yup.string().required("Please select gender "),
    dob: yup.string().required("Please enter your date of birth"),
    address: yup.string().required("Please enter your address"),
  });
};
