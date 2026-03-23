import * as yup from "yup";

export const createBlogSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(10, "Title must contains 10 characters")
    .max(100, "Title is too long"),
  blogBody: yup
    .string()
    .required("Blog body is required")
    .min(50, "Blog body must contains 20 characters")
    .max(5000, "Blog body is too long"),
});
