import React from "react";
import {
  Bus,
  Train,
  Bike,
  Footprints,
  Car,
  Zap,
  Clock,
  Leaf,
  DollarSign,
  Gauge,
} from "lucide-react";
import Card from "../components/common/Card";
import { travelModes } from "../data/travelModes";
import { formatCost, formatCO2 } from "../utils/calculations";
import styles from "./TravelModes.module.css";

const iconMap = {
  Bus,
  Train,
  Bike,
  Footprints,
  Car,
  Zap,
};

const TravelModes = () => {
  return (
    <div className={styles.travelModes}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Travel Modes</h1>
          <p>
            Explore different ways to get around St Mary's. Each mode has its
            own benefits and considerations.
          </p>
        </div>

        <div className={styles.grid}>
          {travelModes.map((mode, index) => {
            const Icon = iconMap[mode.icon] || Bus;
            return (
              <Card
                key={mode.id}
                className={styles.modeCard}
                hover
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={styles.modeHeader}>
                  <div
                    className={styles.modeIcon}
                    style={{ background: mode.color }}
                  >
                    <Icon size={28} />
                  </div>
                  <h2 className={styles.modeName}>{mode.name}</h2>
                </div>

                <p className={styles.modeDescription}>{mode.description}</p>

                <div className={styles.modeStats}>
                  <div className={styles.stat}>
                    <DollarSign size={16} />
                    <span>{mode.averageCost}</span>
                  </div>
                  <div className={styles.stat}>
                    <Gauge size={16} />
                    <span>{mode.speed}</span>
                  </div>
                  <div className={styles.stat}>
                    <Leaf size={16} />
                    <span>{formatCO2(mode.co2PerKm)}/km</span>
                  </div>
                </div>

                <div className={styles.modeDetails}>
                  <div className={styles.detailSection}>
                    <h3>Benefits</h3>
                    <ul>
                      {mode.benefits.map((benefit, i) => (
                        <li key={i}>
                          <span className={styles.checkIcon}>✓</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.detailSection}>
                    <h3>Limitations</h3>
                    <ul>
                      {mode.limitations.map((limitation, i) => (
                        <li key={i}>
                          <span className={styles.xIcon}>×</span>
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={styles.modeFooter}>
                  <div
                    className={styles.ecoBadge}
                    style={{
                      background:
                        mode.co2PerKm === 0
                          ? "rgba(16, 185, 129, 0.1)"
                          : mode.co2PerKm < 0.1
                            ? "rgba(34, 197, 94, 0.1)"
                            : "rgba(239, 68, 68, 0.1)",
                      color:
                        mode.co2PerKm === 0
                          ? "#10B981"
                          : mode.co2PerKm < 0.1
                            ? "#22C55E"
                            : "#EF4444",
                    }}
                  >
                    <Leaf size={14} />
                    {mode.co2PerKm === 0
                      ? "Zero Emissions"
                      : mode.co2PerKm < 0.1
                        ? "Low Impact"
                        : "Higher Impact"}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className={styles.comparison}>
          <h2>Quick Comparison</h2>
          <div className={styles.comparisonTable}>
            <table>
              <thead>
                <tr>
                  <th>Mode</th>
                  <th>Avg Cost</th>
                  <th>Speed</th>
                  <th>CO₂/km</th>
                  <th>Eco Score</th>
                </tr>
              </thead>
              <tbody>
                {travelModes.map((mode) => (
                  <tr key={mode.id}>
                    <td>
                      <div className={styles.tableMode}>
                        <div
                          className={styles.tableIcon}
                          style={{ background: mode.color }}
                        >
                          {React.createElement(iconMap[mode.icon] || Bus, {
                            size: 16,
                          })}
                        </div>
                        {mode.name}
                      </div>
                    </td>
                    <td>{mode.averageCost}</td>
                    <td>{mode.speed}</td>
                    <td>{formatCO2(mode.co2PerKm)}</td>
                    <td>
                      <div className={styles.ecoBar}>
                        <div
                          className={styles.ecoFill}
                          style={{
                            width: `${(1 - mode.co2PerKm / 0.2) * 100}%`,
                            background:
                              mode.co2PerKm === 0
                                ? "#10B981"
                                : mode.co2PerKm < 0.1
                                  ? "#22C55E"
                                  : "#F59E0B",
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelModes;
