import { title } from "node:process";
import { prisma } from "../config/prisma-client.config";
import { Blog, Prisma } from "../generated/prisma/client";
import type { GetAllBlogParameter, UpdateBlog } from "../types/blog.types";
import { off } from "node:cluster";

export const blogService = {
  //? CREATE BLOG
  async createBlog({
    authorId,
    title,
    blogBody,
  }: Omit<Blog, "id" | "createdAt" | "updatedAt" | "deletedAt">) {
    const newBlog = await prisma.blog.create({
      data: { authorId, title, blogBody },
    });

    return newBlog;
  },

  async updateBlog({ blogId, newData }: UpdateBlog) {
    const updatedBlog = await prisma.blog.update({
      where: { id: blogId },
      data: newData,
    });

    return updatedBlog;
  },

  //? UPDATE/DELETE BLOG VALIDATION
  async updateBlogValidation(blogId: string, authorId: string) {
    const blogDetails = await prisma.blog.findFirst({ where: { id: blogId } });

    // invalid id
    if (!blogDetails) {
      throw new Error("Invalid blog id");
    }

    if (blogDetails.authorId !== authorId) {
      throw new Error(
        "Invalid credential details, only author can update the blog",
      );
    }
  },

  //? GET BLOG BY ID
  async getBlogById(blogId: string) {
    const blogDetails = await prisma.blog.findFirst({ where: { id: blogId } });

    // invalid id
    if (!blogDetails) {
      throw new Error("Invalid blog id");
    }

    return blogDetails;
  },

  //? GET ALL BLOG
  async getAllBlog({ page, limit, search }: GetAllBlogParameter) {
    const offset = (page - 1) * limit;

    const where: Prisma.BlogWhereInput = {
      deletedAt: null,
    };

    //Search by title / blogBody

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { blogBody: { contains: search, mode: "insensitive" } },
      ];
    }

    const allBlog = await prisma.blog.findMany({
      take: limit,
      skip: offset,
      where,
      select: {
        id: true,
        author: { select: { firstName: true, lastName: true } },
        title: true,
        blogBody: true,
      },
    });

    const totalData = await prisma.blog.count({ where });

    return {
      allBlog,
      totalData,
      currentPage: page,
      totalPage: Math.ceil(totalData / limit),
    };
  },
};
