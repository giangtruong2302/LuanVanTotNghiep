import * as yup from "yup";

export const loginSchema = () => {
    return yup.object({
        name: yup.string().required("Please enter name"),
        email: yup.string().required("Please enter email"),
        phoneNumber: yup.string().required("Please enter phone number"),
        center: yup.string().required("Please choose center"),
        pt: yup.string().required("Please choose pt"),
        service: yup.string().required("Please choose service"),
    });
};
