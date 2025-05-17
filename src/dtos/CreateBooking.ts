import { z } from "zod";

export const CreateBooking = z.object({
  identifier: z.string(),
  packageIdentifier: z.string().optional(),
  name: z.string(),
  email: z.string().optional(),
  phone: z.string(),
  address: z.string(),
  country: z.string().optional(),
  totalPeople: z.number(),
  stayDuration: z.number(),
});