import { SpiritCardProps } from "@/shared/types/spirit-card";
import { useSpiritCard } from "@/features/monitoring-spirits/hooks/useSpiritCard";
import {
  getThreatLevelColor,
  getThreatLevelGlow,
  getThreatLevelPercentage,
} from "@/shared/lib/threat-level";
import styles from "./SpiritCard.module.scss";

export function SpiritCard({
  spirit,
  onCapture,
  isCapturing,
}: SpiritCardProps) {
  const { isUpdating } = useSpiritCard({
    spiritId: spirit.id,
    threatLevel: spirit.threatLevel,
  });

  const threatColor = getThreatLevelColor(spirit.threatLevel);
  const threatGlow = getThreatLevelGlow(spirit.threatLevel);
  const threatPercentage = getThreatLevelPercentage(spirit.threatLevel);
  const isActive = spirit.status === "Active";
  const isCaught = spirit.status === "Caught";

  return (
    <div
      data-spirit-id={spirit.id}
      className={`${styles.card} ${isCaught ? styles.caught : ""} ${isUpdating ? styles.updating : ""}`}
      style={
        {
          "--threat-color": threatColor,
          "--threat-glow": threatGlow,
        } as React.CSSProperties
      }
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
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "6px",
          }}
        >
          {isUpdating && <span className={styles.updateBadge}>UPDATED</span>}
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
                {isActive ? "●" : "✓"} {spirit.status}
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
  );
}
