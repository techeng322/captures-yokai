export interface NotificationProps {
  message: string;
  type: "error" | "success";
  onClose: () => void;
  duration?: number;
}

export interface NotificationState {
  message: string;
  type: "error" | "success";
}
