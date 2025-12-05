import { useEffect } from 'react'
import styles from './Notification.module.scss'

interface NotificationProps {
  message: string
  type: 'error' | 'success'
  onClose: () => void
  duration?: number
}

export function Notification({
  message,
  type,
  onClose,
  duration = 3000,
}: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <span className={styles.message}>{message}</span>
      <button className={styles.closeButton} onClick={onClose}>
        ×
      </button>
    </div>
  )
}

