import * as yup from "yup";

export const CreateManagerSchema = () => {
  return yup.object({
    email: yup.string().required("Please enter your email"),
    password: yup.string().required("Please enter your password"),
    name: yup.string().required("Please enter your manager name"),
    phoneNumber: yup
      .string()
      .required("Please enter your phone number")
      .max(10, "Phone number is not valid"),
    gender: yup.string().required("Please enter select gender"),
    address: yup.string().required("Please enter your address"),
    roleId: yup.string().required("Please select role of account "),
    centerId: yup.string().required("Please select center "),
    salaryId: yup.string().required("Please select salary rate "),
    // dob: yup.string().required("Please enter your date of birth"),

    // password: yup
    //   .string()
    //   .required("Please enter your password")
    //   .matches(
    //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}/,
    //     "Password must have special character, capital character,normal character and more than 8 character "
    //   ),
    // password2: yup
    //   .string()
    //   .oneOf([yup.ref("password"), null], "Password confirm must match ")
    //   .required("Confirm password must match password"),
  });
};
export const UpdateManagerSchema = () => {
  return yup.object({
    email: yup.string().required("Please enter your email"),
    // password: yup.string().required("Please enter your password"),
    name: yup.string().required("Please enter your manager name"),
    phoneNumber: yup
      .string()
      .required("Please enter your phone number")
      .max(10, "Phone number is not valid"),
    gender: yup.string().required("Please enter select gender"),
    address: yup.string().required("Please enter your address"),
    roleId: yup.string().required("Please select role of account "),
    centerId: yup.string().required("Please select center "),
    salaryId: yup.string().required("Please select salary rate "),
  });
};
