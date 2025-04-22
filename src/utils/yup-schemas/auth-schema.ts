import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("Email is invalid.").required("Email is required."),
  password: yup
    .string()
    .min(6, "Password should be more than 6 characters.")
    .required("Password is required."),
});

export const registerSchema = yup.object({
  name: yup.string().required(""),
  email: yup.string().email("Email is invalid!").required("Email is required."),
  password: yup
    .string()
    .min(6, "Password should be more than 6 characters.")
    .required("Password is required."),
  confirm_password: yup
    .string()
    .min(6, "Password should be more than 6 characters.")
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Password is required."),
});
