import { z } from 'zod';

export const CommentSchema = z.object({
  comment: z.string().min(10).max(500),
});
export type CommentsType = z.infer<typeof CommentSchema>;
