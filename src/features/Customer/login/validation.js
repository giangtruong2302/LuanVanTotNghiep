import * as yup from "yup";

export const loginSchema = () => {
  return yup.object({
    email: yup.string().required("Please enter email"),
    password: yup.string().required("Please enter password"),
  });
};
