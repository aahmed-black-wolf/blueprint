import { z } from 'zod';

export const RegisterSchema = z
  .object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    userName: z.string().min(2),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const inputsFields = [
  { name: "firstName", type: "text", label: "first_name" },
  { name: "lastName", type: "text", label: "last_name" },
  { name: "email", type: "email", label: "email" },
  { name: "userName", type: "text", label: "user_name" },
  { name: "password", type: "password", label: "password" },
  { name: "confirmPassword", type: "password", label: "confirm_password" },
];

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
