import { ThreatLevel } from "../types/spirit";

export const threatLevelColors: Record<ThreatLevel, string> = {
  Low: "#4ade80",
  Medium: "#fbbf24",
  High: "#f97316",
  Critical: "#ef4444",
};

export const threatLevelGlowColors: Record<ThreatLevel, string> = {
  Low: "rgba(74, 222, 128, 0.3)",
  Medium: "rgba(251, 191, 36, 0.3)",
  High: "rgba(249, 115, 22, 0.3)",
  Critical: "rgba(239, 68, 68, 0.5)",
};

const threatLevelValues: Record<ThreatLevel, number> = {
  Low: 1,
  Medium: 2,
  High: 3,
  Critical: 4,
};

export function getThreatLevelPercentage(level: ThreatLevel): number {
  return (threatLevelValues[level] / 4) * 100;
}

export function getThreatLevelColor(level: ThreatLevel): string {
  return threatLevelColors[level];
}

export function getThreatLevelGlow(level: ThreatLevel): string {
  return threatLevelGlowColors[level];
}
