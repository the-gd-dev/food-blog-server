import yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("Email is invalid!").required("Email is required."),
  password: yup.string().required("Email is required."),
});
