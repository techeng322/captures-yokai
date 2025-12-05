import { ThreatLevel, Spirit } from "./spirit";
import { NotificationState } from "./notification";

export interface Statistics {
  total: number;
  active: number;
  caught: number;
  threatLevels: Record<ThreatLevel, number>;
}

export interface UseConnectionStatusReturn {
  isConnected: boolean;
  lastUpdateTime: Date | null;
  updateCount: number;
}

export interface UseSpiritCardProps {
  spiritId: string;
  threatLevel: ThreatLevel;
}

export interface UseCaptureHandlerReturn {
  capturingId: string | null;
  notification: NotificationState | null;
  handleCapture: (id: string) => Promise<void>;
  clearNotification: () => void;
}
