import { ThreatLevel } from "./spirit";

export interface SpiritUpdate {
  id: string;
  threatLevel: ThreatLevel;
  timestamp: number;
}
