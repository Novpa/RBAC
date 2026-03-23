import type { BlogType } from "../types/blogTypes";
import axiosInstance from "../api/axiosInstance";

export const createBlog = async (values: BlogType) => {
  try {
    const res = await axiosInstance.post("/blog/new", {
      title: values.title,
      blogBody: values.blogBody,
    });

    console.log("create blog response", res);
  } catch (error) {
    console.log(error);
  }
};
