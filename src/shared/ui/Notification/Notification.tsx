import { NotificationProps } from "@/shared/types/notification";
import { useNotificationAutoClose } from "./hooks/useNotificationAutoClose";
import styles from "./Notification.module.scss";

export function Notification({
  message,
  type,
  onClose,
  duration = 3000,
}: NotificationProps) {
  useNotificationAutoClose({ onClose, duration });

  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <span className={styles.message}>{message}</span>
      <button className={styles.closeButton} onClick={onClose}>
        ×
      </button>
    </div>
  );
}
