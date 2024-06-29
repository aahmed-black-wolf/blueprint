import { z } from 'zod';

export const LoginSchema = z.object({
  userName: z.string().min(2),
  password: z.string().min(8),
});

export const inputsFields = [
  { name: "userName", type: "text", label: "user_name" },
  { name: "password", type: "password", label: "password" },
];

export type LoginSchemaType = z.infer<typeof LoginSchema>;
