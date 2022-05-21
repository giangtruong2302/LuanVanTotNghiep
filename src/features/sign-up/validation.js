import * as yup from "yup";

export const signupSchema = () => {
  return yup.object({
    email: yup.string().required("please enter email"),
    password: yup.string().required("please enter password"),
    firstName: yup.string().required("please enter your first name"),
    lastName: yup.string.required("please enter your last name"),
    phoneNumber: yup.string().required("please enter your phone number"),
    address: yup.string().required("please enter your address"),
  });
};
