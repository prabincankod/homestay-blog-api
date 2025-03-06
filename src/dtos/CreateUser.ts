import { z } from "zod";

export const CreateUser = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});
