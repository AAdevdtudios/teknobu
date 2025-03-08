import { z } from "zod";

export const emailSchema = z.string().email();

export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[@$!%*?&]/,
    "Password must contain at least one special character (@$!%*?&)"
  );

export const nameSchema = z
  .string()
  .min(5, "Must be at least 5 characters long")
  .max(20, "Too Long");

export const registerSchema = z.object({
  email: emailSchema,
  fullname: nameSchema,
  password: passwordSchema,
});
export type TRegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type TLoginUser = z.infer<typeof loginSchema>;
