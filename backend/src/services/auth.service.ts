import { prisma } from "../config/prisma-client.config";
import { CreateUserPayload } from "../dto/auth.dto";
import { Prisma } from "../generated/prisma/client";
import { AppError } from "../utils/AppError";
import { handlePrismaError } from "../utils/prismaErrorHandler";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

export const authServices = {
  //? CREATE USER
  async register({
    firstName,
    lastName,
    email,
    role,
    password,
  }: CreateUserPayload) {
    try {
      // 1) Normalisasi email (lowercase) sebelum cek duplikat
      const lowerCaseEmail = email.toLowerCase().trim();

      // 2. Cek apakah email sudah terdaftar
      const existing = await prisma.user.findUnique({
        where: { email: lowerCaseEmail },
      });

      if (existing) {
        throw new AppError(409, "Email has been registered");
      }

      // 3. Hash password — ini proses ASYNC yang butuh waktu (bcrypt sengaja lambat)
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email: lowerCaseEmail,
          role,
          password: hashedPassword,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          createdAt: true,
        },
      });

      return user;
    } catch (error) {
      handlePrismaError(error);
    }
  },

  //? GET ALL USER
  async getAllUser({
    page,
    limit,
    search,
  }: {
    page: number;
    limit: number;
    search: string;
  }) {
    try {
      const offset = (page - 1) * limit;

      const where: Prisma.UserWhereInput = {
        deletedAt: null,
      };

      if (search) {
        where.OR = [
          { firstName: { contains: search, mode: "insensitive" } },
          { lastName: { contains: search, mode: "insensitive" } },
          { id: { contains: search, mode: "insensitive" } },
        ];
      }

      const user = await prisma.user.findMany({
        take: limit,
        skip: offset,
        where,
      });

      const totalData = await prisma.user.count({
        where,
      });

      return { user, totalData, totalPage: Math.ceil(totalData / limit) };
    } catch (error) {
      handlePrismaError(error);
    }
  },

  //? LOGIN
  async userLogin({ email, password }: { email: string; password: string }) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: email,
          password: password,
        },
      });

      if (!user) {
        throw new Error("Invalid credentials");
      }

      return user;
    } catch (error) {
      handlePrismaError(error);
    }
  },
};
