import { z } from "zod";

export const ParamsSchema = z.object({
  id: z.string().min(1),
});

export type Params = z.infer<typeof ParamsSchema>;
