import { z } from "zod";

export const CreateArticle = z.object({
  title: z.string(),
  slug: z.string(),
  keywords: z.array(z.string()).optional()
});
