import { useState } from "react";
import { useCaptureSpirit } from "@/features/capture-spirit/hooks/useCaptureSpirit";
import { UseCaptureHandlerReturn } from "@/shared/types/monitoring";
import { NotificationState } from "@/shared/types/notification";

export function useCaptureHandler(): UseCaptureHandlerReturn {
  const captureMutation = useCaptureSpirit();
  const [notification, setNotification] = useState<NotificationState | null>(
    null
  );
  const [capturingId, setCapturingId] = useState<string | null>(null);

  const handleCapture = async (id: string) => {
    setCapturingId(id);
    try {
      await captureMutation.mutateAsync(id);
      setNotification({
        message: "Spirit captured successfully!",
        type: "success",
      });
    } catch (err) {
      setNotification({
        message:
          err instanceof Error ? err.message : "Failed to capture spirit",
        type: "error",
      });
    } finally {
      setCapturingId(null);
    }
  };

  return {
    capturingId,
    notification,
    handleCapture,
    clearNotification: () => setNotification(null),
  };
}
