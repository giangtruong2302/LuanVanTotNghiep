import * as yup from "yup";

export const CreateBlogSchema = () => {
  return yup.object({
    title: yup.string().required("Please enter your full name"),
    content: yup.string().required("Please enter your user name"),

    // phoneNumber: yup
    //   .string()
    //   .required("Please enter your phone number")
    //   .max(10, "Phone number is not valid")
    //   .matches(
    //     /^[2-9]{1}[0-9]{2}[0-9]{3}[0-9]{4}$/,
    //     "Phone number is not valid"
    //   ),
    // managerId: yup.string().required("Please select role of account "),
    // dob: yup.string().required("Please enter your date of birth"),
    // address: yup.string().required("Please enter your address"),
    centerId: yup.string().required("Please enter your email"),
  });
};
