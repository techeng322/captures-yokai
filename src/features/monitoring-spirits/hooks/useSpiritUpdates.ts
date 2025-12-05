import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Spirit, ThreatLevel } from "@/shared/types/spirit";
import { SpiritUpdate } from "@/shared/types/spirit-update";

const threatLevels: ThreatLevel[] = ["Low", "Medium", "High", "Critical"];

export function useSpiritUpdates() {
  const queryClient = useQueryClient();
  const previousThreatLevels = useRef<Map<string, ThreatLevel>>(new Map());

  useEffect(() => {
    const eventSource = new EventSource("/api/spirits/stream");
    const threatLevelsRef = previousThreatLevels;

    eventSource.onmessage = (event) => {
      try {
        const update: SpiritUpdate = JSON.parse(event.data);

        // Get previous threat level for comparison
        const previousThreatLevel = threatLevelsRef.current.get(update.id);

        // Update the spirit in the cache
        queryClient.setQueryData<Spirit[]>(["spirits"], (old) =>
          old?.map((spirit) => {
            if (spirit.id === update.id) {
              // Store previous threat level for animation
              if (
                previousThreatLevel &&
                previousThreatLevel !== update.threatLevel
              ) {
                // Trigger visual update by adding a data attribute
                setTimeout(() => {
                  const cardElement = document.querySelector(
                    `[data-spirit-id="${spirit.id}"]`
                  );
                  if (cardElement) {
                    cardElement.classList.add("threat-updated");
                    setTimeout(() => {
                      cardElement.classList.remove("threat-updated");
                    }, 1000);
                  }
                }, 0);
              }

              threatLevelsRef.current.set(update.id, update.threatLevel);

              return { ...spirit, threatLevel: update.threatLevel };
            }
            return spirit;
          })
        );

        // Dispatch custom event for UI updates
        window.dispatchEvent(
          new CustomEvent("spiritUpdated", {
            detail: {
              id: update.id,
              threatLevel: update.threatLevel,
              timestamp: update.timestamp,
            },
          })
        );
      } catch (error) {
        console.error("Failed to parse SSE message:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE error:", error);
      // Try to reconnect after a delay
      setTimeout(() => {
        eventSource.close();
      }, 1000);
    };

    return () => {
      eventSource.close();
      threatLevelsRef.current.clear();
    };
  }, [queryClient]);
}
