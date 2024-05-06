import * as z from 'zod';

export const QuestionsSchema = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(65),
  // Array of strings with a minimum of 1 tag and maximum of 3 tags; And, each tag should be a string with a minimum of 1 character and a maximum of 15 characters.
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});
