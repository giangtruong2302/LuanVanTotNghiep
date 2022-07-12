import * as yup from "yup";

export const CreateCenterSchema = () => {
  return yup.object({
    CenterName: yup.string().required("Please enter your full name"),
    CenterAddress: yup.string().required("Please enter your user name"),
    CenterPhoneNumber: yup.string().required("Please enter your email"),
    ManagerId: yup.string().required("Please enter your email"),
  });
};
