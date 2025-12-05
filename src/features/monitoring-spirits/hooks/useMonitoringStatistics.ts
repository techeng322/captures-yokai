import { useMemo } from "react";
import { Spirit, ThreatLevel } from "@/shared/types/spirit";
import { Statistics } from "@/shared/types/monitoring";

export function useMonitoringStatistics(
  spirits: Spirit[] | undefined
): Statistics | null {
  return useMemo(() => {
    if (!spirits) return null;

    const active = spirits.filter((s) => s.status === "Active").length;
    const caught = spirits.filter((s) => s.status === "Caught").length;
    const threatLevels = spirits.reduce(
      (acc, spirit) => {
        acc[spirit.threatLevel] = (acc[spirit.threatLevel] || 0) + 1;
        return acc;
      },
      {} as Record<ThreatLevel, number>
    );

    return {
      total: spirits.length,
      active,
      caught,
      threatLevels,
    };
  }, [spirits]);
}
