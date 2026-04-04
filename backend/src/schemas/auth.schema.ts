import * as z from "zod";

const RoleEnum = z.enum(["AUTHOR", "ADMIN"]);

export const signupSchema = z.object({
  body: z
    .object({
      firstName: z
        .string()
        .min(2, "First name at least has 2 characters")
        .max(30, "Maximum first name is 30 character"),
      lastName: z
        .string()
        .min(2, "First name at least has 2 characters")
        .max(30, "Maximum first name is 30 character"),
      email: z
        .email({ message: "Email is not valid" })
        .max(100, "Email is too long"),
      password: z
        .string()
        .min(8, "Password at least has 8 characters")
        // Contoh regex: Harus ada huruf besar, kecil, dan angka
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          "Password must contain capital, lower case, dan numbers",
        ),
      confirmPassword: z.string(),
      role: RoleEnum.default("AUTHOR").optional(),
    })
    .refine((data) => data.confirmPassword === data.password, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }),
});

export type signupBody = z.infer<typeof signupSchema>["body"];
