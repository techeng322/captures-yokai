'use client'

import { useState, useMemo } from 'react'
import { useSpirits } from '@/features/monitoring-spirits/hooks/useSpirits'
import { useCaptureSpirit } from '@/features/capture-spirit/hooks/useCaptureSpirit'
import { useSpiritUpdates } from '@/features/monitoring-spirits/hooks/useSpiritUpdates'
import { SpiritCard } from '@/shared/ui/SpiritCard/SpiritCard'
import { Notification } from '@/shared/ui/Notification/Notification'
import { ThreatLevel } from '@/shared/types/spirit'
import styles from './page.module.scss'

interface NotificationState {
  message: string
  type: 'error' | 'success'
}

export default function MonitoringPage() {
  const { data: spirits, isLoading, error } = useSpirits()
  const captureMutation = useCaptureSpirit()
  const [notification, setNotification] = useState<NotificationState | null>(
    null
  )
  const [capturingId, setCapturingId] = useState<string | null>(null)

  // Set up real-time updates
  useSpiritUpdates()

  const statistics = useMemo(() => {
    if (!spirits) return null

    const active = spirits.filter((s) => s.status === 'Active').length
    const caught = spirits.filter((s) => s.status === 'Caught').length
    const threatLevels = spirits.reduce(
      (acc, spirit) => {
        acc[spirit.threatLevel] = (acc[spirit.threatLevel] || 0) + 1
        return acc
      },
      {} as Record<ThreatLevel, number>
    )

    return {
      total: spirits.length,
      active,
      caught,
      threatLevels,
    }
  }, [spirits])

  const handleCapture = async (id: string) => {
    setCapturingId(id)
    try {
      await captureMutation.mutateAsync(id)
      setNotification({
        message: 'Spirit captured successfully!',
        type: 'success',
      })
    } catch (err) {
      setNotification({
        message:
          err instanceof Error ? err.message : 'Failed to capture spirit',
        type: 'error',
      })
    } finally {
      setCapturingId(null)
    }
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <div className={styles.loading}>Scanning for spiritual anomalies...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>⚠</div>
          <div className={styles.error}>
            <h2>Connection Error</h2>
            <p>Error loading spirits: {error.message}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>
              <span className={styles.titleIcon}>👹</span>
              Yokai Monitoring Dashboard
            </h1>
            <p className={styles.subtitle}>
              Real-time spiritual energy anomaly detection across Tokyo
            </p>
          </div>
          <div className={styles.statusIndicator}>
            <span className={styles.statusDot}></span>
            <span className={styles.statusText}>Live</span>
          </div>
        </div>
      </header>

      {statistics && (
        <div className={styles.statistics}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📊</div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{statistics.total}</div>
              <div className={styles.statLabel}>Total Anomalies</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>⚡</div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{statistics.active}</div>
              <div className={styles.statLabel}>Active Spirits</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>✓</div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{statistics.caught}</div>
              <div className={styles.statLabel}>Captured</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>🔥</div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                {statistics.threatLevels.Critical || 0}
              </div>
              <div className={styles.statLabel}>Critical Threats</div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>🎴</span>
          Anomaly List
        </h2>
        <span className={styles.sectionCount}>
          {spirits?.length || 0} spirits detected
        </span>
      </div>

      <div className={styles.grid}>
        {spirits?.map((spirit) => (
          <SpiritCard
            key={spirit.id}
            spirit={spirit}
            onCapture={handleCapture}
            isCapturing={capturingId === spirit.id}
          />
        ))}
      </div>

      {spirits && spirits.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🔍</div>
          <h3 className={styles.emptyTitle}>No Anomalies Detected</h3>
          <p className={styles.emptyText}>
            The spiritual energy levels are stable. No yokai spirits detected at
            this time.
          </p>
        </div>
      )}

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  )
}

