import * as yup from "yup";

export const CreateServiceSchema = () => {
  return yup.object({
    ServiceName: yup.string().required("Please enter your full name"),
    WorkDuration: yup.string().required("Please enter your user name"),
    Price: yup.string().required("Please enter your email"),
    // phoneNumber: yup
    //   .string()
    //   .required("Please enter your phone number")
    //   .max(10, "Phone number is not valid")
    //   .matches(
    //     /^[2-9]{1}[0-9]{2}[0-9]{3}[0-9]{4}$/,
    //     "Phone number is not valid"
    //   ),
    // roleId: yup.string().required("Please select role of account "),
    // dob: yup.string().required("Please enter your date of birth"),
    // address: yup.string().required("Please enter your address"),

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
