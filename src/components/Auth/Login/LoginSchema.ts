import { z } from 'zod';

export const LoginSchema = z.object({
  userName: z.string().min(2),
  password: z.string().min(8),
});

export const inputsFields = [
  { name: "userName", type: "text", label: "User Name" },
  { name: "password", type: "password", label: "Password" },
];

export type LoginSchemaType = z.infer<typeof LoginSchema>;
