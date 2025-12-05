import { z } from "zod";

export const ThreatLevelSchema = z.enum(["Low", "Medium", "High", "Critical"]);

export const SpiritStatusSchema = z.enum(["Active", "Caught"]);

export const SpiritSchema = z.object({
  id: z.string(),
  name: z.string(),
  threatLevel: ThreatLevelSchema,
  location: z.string(),
  status: SpiritStatusSchema,
});

export type ThreatLevel = z.infer<typeof ThreatLevelSchema>;
export type SpiritStatus = z.infer<typeof SpiritStatusSchema>;
export type Spirit = z.infer<typeof SpiritSchema>;
