import * as yup from "yup";

export const CreateServiceSchema = () => {
  return yup.object({
    ServiceName: yup.string().required("Please enter service name"),
    WorkDuration: yup
      .string()
      .required("Please enter work duration of service"),
    Price: yup.string().required("Please enter price of service"),
    idDiscount: yup.string().required("please choose discount rate"),
  });
};
