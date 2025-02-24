import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(5, {
    message: "password must be more than 5",
  }),
});

export const LoginSchema = RegisterSchema.pick({ email: true, password: true });

export const emailVerification = z.object({
  token: z.string().min(2, { message: "most  be more than 5 character long" }),
});
export const passwordVerification = z.object({
  password: z
    .string()
    .min(2, { message: "most  be more than 5 character long" }),
});

export const productSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  desc: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  price: z
    .string()
    .min(1, { message: "Price is required" })
    .refine((val) => !isNaN(Number(val)), {
      message: "Price must be a valid number.",
    })
    .transform((val) => Number(val)),
  available: z.boolean(),
  image: z
    .any()
    .refine((files) => files instanceof FileList || Array.isArray(files), {
      message: "Image must be an array of files.",
    }),
});
