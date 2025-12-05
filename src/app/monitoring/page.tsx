"use client";

import { useSpirits } from "@/features/monitoring-spirits/hooks/useSpirits";
import { useSpiritUpdates } from "@/features/monitoring-spirits/hooks/useSpiritUpdates";
import { useMonitoringStatistics } from "@/features/monitoring-spirits/hooks/useMonitoringStatistics";
import { useConnectionStatus } from "@/features/monitoring-spirits/hooks/useConnectionStatus";
import { useCaptureHandler } from "@/features/monitoring-spirits/hooks/useCaptureHandler";
import { SpiritCard } from "@/shared/ui/SpiritCard/SpiritCard";
import { Notification } from "@/shared/ui/Notification/Notification";
import styles from "./page.module.scss";

export default function MonitoringPage() {
  const { data: spirits, isLoading, error } = useSpirits();
  const statistics = useMonitoringStatistics(spirits);
  const { isConnected, lastUpdateTime } = useConnectionStatus();
  const { capturingId, notification, handleCapture, clearNotification } =
    useCaptureHandler();

  // Set up real-time updates
  useSpiritUpdates();

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <div className={styles.loading}>
            Scanning for spiritual anomalies...
          </div>
        </div>
      </div>
    );
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
    );
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
            <div>
              <span
                className={`${styles.statusDot} ${isConnected ? styles.connected : styles.disconnected}`}
              ></span>
              <span className={styles.statusText}>
                {isConnected ? "Live" : "Disconnected"}
              </span>
            </div>
            {lastUpdateTime && (
              <span className={styles.lastUpdate}>
                Updated{" "}
                {Math.floor((Date.now() - lastUpdateTime.getTime()) / 1000)}s
                ago
              </span>
            )}
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
          onClose={clearNotification}
        />
      )}
    </div>
  );
}
