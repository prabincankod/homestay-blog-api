import { z } from "zod";

export const CreateImage = z.object({
  alt: z.string(),
  url: z.string(),
  article: z.array(z.number()).optional(),
  category: z.array(z.number()).optional(),
});
