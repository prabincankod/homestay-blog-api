import { z } from "zod";

export const CreateImage = z.object({
  alt: z.string(),
  url: z.string(),
  article: z.number().optional(),
  category: z.number().optional(),
});
