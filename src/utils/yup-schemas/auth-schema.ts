import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("Email is invalid.").required("Email is required."),
  password: yup.string().required("Password is required."),
});

export const registerSchema = yup.object({
  name: yup.string().required(""),
  email: yup.string().email("Email is invalid!").required("Email is required."),
  password: yup.string().required("Password is required."),
  confirm_password: yup
    .string()
    .required("Password is required.")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
