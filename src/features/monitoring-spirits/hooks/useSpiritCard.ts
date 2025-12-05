import { useEffect, useState } from "react";
import { UseSpiritCardProps } from "@/shared/types/monitoring";
import { ThreatLevel } from "@/shared/types/spirit";

export function useSpiritCard({ spiritId, threatLevel }: UseSpiritCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [previousThreatLevel, setPreviousThreatLevel] =
    useState<ThreatLevel | null>(null);

  useEffect(() => {
    const handleUpdate = (event: CustomEvent) => {
      if (event.detail.id === spiritId) {
        setIsUpdating(true);
        setTimeout(() => setIsUpdating(false), 1500);
      }
    };

    window.addEventListener("spiritUpdated", handleUpdate as EventListener);
    return () => {
      window.removeEventListener(
        "spiritUpdated",
        handleUpdate as EventListener
      );
    };
  }, [spiritId]);

  useEffect(() => {
    if (previousThreatLevel && previousThreatLevel !== threatLevel) {
      setIsUpdating(true);
      setTimeout(() => setIsUpdating(false), 1500);
    }
    setPreviousThreatLevel(threatLevel);
  }, [threatLevel, previousThreatLevel]);

  return { isUpdating };
}
