import { useEffect, useState } from "react";
import { UseConnectionStatusReturn } from "@/shared/types/monitoring";

export function useConnectionStatus(): UseConnectionStatusReturn {
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);
  const [updateCount, setUpdateCount] = useState(0);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const handleSpiritUpdate = (event: CustomEvent) => {
      setLastUpdateTime(new Date(event.detail.timestamp));
      setUpdateCount((prev) => prev + 1);
      setIsConnected(true);
    };

    window.addEventListener(
      "spiritUpdated",
      handleSpiritUpdate as EventListener
    );

    return () => {
      window.removeEventListener(
        "spiritUpdated",
        handleSpiritUpdate as EventListener
      );
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastUpdateTime) {
        const timeSinceUpdate = Date.now() - lastUpdateTime.getTime();
        setIsConnected(timeSinceUpdate < 10000); // Consider disconnected if no update in 10 seconds
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastUpdateTime]);

  return { isConnected, lastUpdateTime, updateCount };
}
