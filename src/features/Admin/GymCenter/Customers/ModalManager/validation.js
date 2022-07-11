import * as yup from "yup";

export const CreateCustomerSchema = () => {
  return yup.object({
    email: yup.string().required("Please enter your email"),
    name: yup.string().required("Please enter your staff name"),
    password: yup.string().required("Please enter your password"),
    phoneNumber: yup
      .string()
      .required("Please enter your phone number")
      .max(10, "Phone number is not valid"),
    gender: yup.string().required("Please select gender"),
    dob: yup.string().required("Please enter your date of birth"),
    address: yup.string().required("Please enter your address"),
    roleId: yup.string().required("Please select role of account "),
    centerId: yup.string().required("Please select center id "),
  });
};
export const UpdateCustomerSchema = () => {
  return yup.object({
    email: yup.string().required("Please enter your email"),
    name: yup.string().required("Please enter your staff name"),
    // password: yup.string().required("Please enter your password"),
    phoneNumber: yup
      .string()
      .required("Please enter your phone number")
      .max(10, "Phone number is not valid"),
    gender: yup.string().required("Please select gender"),
    dob: yup.string().required("Please enter your date of birth"),
    address: yup.string().required("Please enter your address"),
    centerId: yup.string().required("Please select center id "),
  });
};
