import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must contains 8 characters")
    .max(30, "Password is too long"),
});
