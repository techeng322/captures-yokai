import { Spirit, ThreatLevel } from '@/shared/types/spirit'
import styles from './SpiritCard.module.scss'

interface SpiritCardProps {
  spirit: Spirit
  onCapture: (id: string) => void
  isCapturing?: boolean
}

const threatLevelColors: Record<ThreatLevel, string> = {
  Low: '#4ade80',
  Medium: '#fbbf24',
  High: '#f97316',
  Critical: '#ef4444',
}

const threatLevelGlowColors: Record<ThreatLevel, string> = {
  Low: 'rgba(74, 222, 128, 0.3)',
  Medium: 'rgba(251, 191, 36, 0.3)',
  High: 'rgba(249, 115, 22, 0.3)',
  Critical: 'rgba(239, 68, 68, 0.5)',
}

const threatLevelValues: Record<ThreatLevel, number> = {
  Low: 1,
  Medium: 2,
  High: 3,
  Critical: 4,
}

const getThreatLevelPercentage = (level: ThreatLevel): number => {
  return (threatLevelValues[level] / 4) * 100
}

export function SpiritCard({ spirit, onCapture, isCapturing }: SpiritCardProps) {
  const threatColor = threatLevelColors[spirit.threatLevel]
  const threatGlow = threatLevelGlowColors[spirit.threatLevel]
  const threatPercentage = getThreatLevelPercentage(spirit.threatLevel)
  const isActive = spirit.status === 'Active'
  const isCaught = spirit.status === 'Caught'

  return (
    <div
      className={`${styles.card} ${isCaught ? styles.caught : ''}`}
      style={{
        '--threat-color': threatColor,
        '--threat-glow': threatGlow,
      } as React.CSSProperties}
    >
      {/* Threat Level Indicator Bar */}
      <div className={styles.threatBar}>
        <div
          className={styles.threatBarFill}
          style={{
            width: `${threatPercentage}%`,
            backgroundColor: threatColor,
            boxShadow: `0 0 20px ${threatGlow}`,
          }}
        />
      </div>

      <div className={styles.header}>
        <div className={styles.nameSection}>
          <h3 className={styles.name}>{spirit.name}</h3>
          <span className={styles.spiritType}>Yokai Spirit</span>
        </div>
        <div
          className={styles.threatBadge}
          style={{
            backgroundColor: threatColor,
            boxShadow: `0 0 15px ${threatGlow}`,
          }}
        >
          <span className={styles.threatIcon}>⚠</span>
          {spirit.threatLevel}
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.infoRow}>
          <div className={styles.info}>
            <div className={styles.infoIcon}>📍</div>
            <div className={styles.infoContent}>
              <span className={styles.label}>Location</span>
              <span className={styles.value}>{spirit.location}</span>
            </div>
          </div>
        </div>

        <div className={styles.infoRow}>
          <div className={styles.info}>
            <div className={styles.infoIcon}>⚡</div>
            <div className={styles.infoContent}>
              <span className={styles.label}>Status</span>
              <span
                className={`${styles.statusBadge} ${
                  isActive ? styles.active : styles.caught
                }`}
              >
                {isActive ? '●' : '✓'} {spirit.status}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.threatDetails}>
          <div className={styles.threatInfo}>
            <span className={styles.threatLabel}>Threat Assessment</span>
            <div className={styles.threatMeter}>
              <div
                className={styles.threatMeterFill}
                style={{
                  width: `${threatPercentage}%`,
                  backgroundColor: threatColor,
                }}
              />
            </div>
            <span className={styles.threatValue}>{threatPercentage}%</span>
          </div>
        </div>
      </div>

      {isActive && (
        <div className={styles.footer}>
          <button
            className={styles.captureButton}
            onClick={() => onCapture(spirit.id)}
            disabled={isCapturing}
          >
            {isCapturing ? (
              <>
                <span className={styles.buttonIcon}>⟳</span>
                <span>Capturing...</span>
              </>
            ) : (
              <>
                <span className={styles.buttonIcon}>🎯</span>
                <span>Capture Spirit</span>
              </>
            )}
          </button>
        </div>
      )}

      {isCaught && (
        <div className={styles.footer}>
          <div className={styles.capturedBadge}>
            <span className={styles.capturedIcon}>✓</span>
            <span>Spirit Captured</span>
          </div>
        </div>
      )}
    </div>
  )
}

