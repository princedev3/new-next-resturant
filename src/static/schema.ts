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

export const couponSchema = z.object({
  discount: z
    .string()
    .min(1, { message: "price is required" })
    .refine((val) => !isNaN(Number(val)), {
      message: "Price must be a valid number.",
    })
    .transform((val) => Number(val)),
  desc: z.string().min(1, { message: "desc is required" }),
});

export const gallerySchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  image: z
    .any()
    .refine((files) => files instanceof FileList || Array.isArray(files), {
      message: "Image must be an array of files.",
    }),
});

export const eventSchema = z.object({
  dob: z.date({
    required_error: "A date of bookig is required.",
  }),
  gallery: z.string({
    required_error: "Please select a dinning.",
  }),
  startTime: z
    .string()
    .min(1, "Start time is required")
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)"),
  endTime: z
    .string()
    .min(1, "Start time is required")
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)"),
});
