import { useEffect } from "react";
import { UseNotificationAutoCloseProps } from "@/shared/types/notification-hook";

export function useNotificationAutoClose({
  onClose,
  duration = 3000,
}: UseNotificationAutoCloseProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);
}
