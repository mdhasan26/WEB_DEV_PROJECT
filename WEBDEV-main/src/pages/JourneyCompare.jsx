import React, { useState } from "react";
import {
  Scale,
  Clock,
  DollarSign,
  Leaf,
  TrendingUp,
  Bus,
  Train,
  Bike,
  Footprints,
  Car,
  Zap,
} from "lucide-react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { travelModes } from "../data/travelModes";
import {
  compareModes,
  formatDuration,
  formatCost,
  formatCO2,
  getConvenienceScore,
} from "../utils/calculations";
import styles from "./JourneyCompare.module.css";

const JourneyCompare = () => {
  const [distance, setDistance] = useState(10);
  const [mode1, setMode1] = useState("bus");
  const [mode2, setMode2] = useState("cycling");
  const [comparison, setComparison] = useState(null);

  const modeIcons = {
    bus: Bus,
    train: Train,
    cycling: Bike,
    walking: Footprints,
    car: Car,
    scooter: Zap,
  };

  const handleCompare = () => {
    const result = compareModes(mode1, mode2, distance);
    setComparison(result);
  };

  const getWinner = (factor) => {
    if (!comparison) return null;
    if (factor === "convenience") {
      return comparison[0].convenience >= comparison[1].convenience ? 0 : 1;
    }
    if (factor === "cost") {
      if (comparison[0].cost.average === comparison[1].cost.average)
        return null;
      return comparison[0].cost.average <= comparison[1].cost.average ? 0 : 1;
    }
    if (factor === "time") {
      return comparison[0].time <= comparison[1].time ? 0 : 1;
    }
    if (factor === "co2") {
      return comparison[0].co2 <= comparison[1].co2 ? 0 : 1;
    }
    return null;
  };

  return (
    <div className={styles.compare}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Compare Travel Modes</h1>
          <p>
            Compare different travel options to find the best choice for your
            journey
          </p>
        </div>

        <Card className={styles.inputCard}>
          <div className={styles.inputForm}>
            <div className={styles.inputGroup}>
              <label>Distance (km)</label>
              <input
                type="range"
                min="1"
                max="50"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className={styles.slider}
              />
              <span className={styles.sliderValue}>{distance} km</span>
            </div>

            <div className={styles.modeSelect}>
              <div className={styles.selectGroup}>
                <label>Mode 1</label>
                <select
                  value={mode1}
                  onChange={(e) => setMode1(e.target.value)}
                  className={styles.select}
                >
                  {travelModes.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <span className={styles.vs}>VS</span>

              <div className={styles.selectGroup}>
                <label>Mode 2</label>
                <select
                  value={mode2}
                  onChange={(e) => setMode2(e.target.value)}
                  className={styles.select}
                >
                  {travelModes.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Button icon={Scale} onClick={handleCompare}>
              Compare
            </Button>
          </div>
        </Card>

        {comparison && (
          <div className={styles.results}>
            <div className={styles.comparisonHeader}>
              <h2>{distance}km Journey Comparison</h2>
            </div>

            <div className={styles.comparisonGrid}>
              {comparison.map((item, index) => {
                const Icon = modeIcons[item.mode] || Bus;
                const modeData = travelModes.find((m) => m.id === item.mode);
                const winner = {
                  time: getWinner("time") === index,
                  cost: getWinner("cost") === index,
                  co2: getWinner("co2") === index,
                  convenience: getWinner("convenience") === index,
                };

                return (
                  <Card
                    key={index}
                    className={`${styles.modeCard} ${index === 0 ? styles.mode1 : styles.mode2}`}
                  >
                    <div className={styles.modeHeader}>
                      <div
                        className={styles.modeIcon}
                        style={{ background: modeData?.color }}
                      >
                        <Icon size={32} />
                      </div>
                      <h3>{modeData?.name}</h3>
                    </div>

                    <div className={styles.comparisonStats}>
                      <div
                        className={`${styles.statItem} ${winner.time ? styles.winner : ""}`}
                      >
                        <Clock size={20} />
                        <div className={styles.statContent}>
                          <span className={styles.statLabel}>Duration</span>
                          <span className={styles.statValue}>
                            {formatDuration(item.time)}
                          </span>
                        </div>
                        {winner.time && (
                          <span className={styles.winnerBadge}>Fastest</span>
                        )}
                      </div>

                      <div
                        className={`${styles.statItem} ${winner.cost ? styles.winner : ""}`}
                      >
                        <DollarSign size={20} />
                        <div className={styles.statContent}>
                          <span className={styles.statLabel}>Cost</span>
                          <span className={styles.statValue}>
                            {formatCost(item.cost.average)}
                          </span>
                        </div>
                        {winner.cost && (
                          <span className={styles.winnerBadge}>Cheapest</span>
                        )}
                      </div>

                      <div
                        className={`${styles.statItem} ${winner.co2 ? styles.winner : ""}`}
                      >
                        <Leaf size={20} />
                        <div className={styles.statContent}>
                          <span className={styles.statLabel}>CO₂</span>
                          <span className={styles.statValue}>
                            {formatCO2(item.co2)}
                          </span>
                        </div>
                        {winner.co2 && (
                          <span className={styles.winnerBadge}>Greenest</span>
                        )}
                      </div>

                      <div
                        className={`${styles.statItem} ${winner.convenience ? styles.winner : ""}`}
                      >
                        <TrendingUp size={20} />
                        <div className={styles.statContent}>
                          <span className={styles.statLabel}>Convenience</span>
                          <span className={styles.statValue}>
                            {item.convenience}/10
                          </span>
                        </div>
                        {winner.convenience && (
                          <span className={styles.winnerBadge}>Best</span>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Summary */}
            <Card className={styles.summaryCard}>
              <h3>Summary</h3>
              <div className={styles.summaryContent}>
                <div className={styles.summaryItem}>
                  <Clock size={18} />
                  <span>
                    {getWinner("time") !== null
                      ? `${travelModes.find((m) => m.id === comparison[getWinner("time")].mode)?.name} is faster`
                      : "Both modes have similar duration"}
                  </span>
                </div>
                <div className={styles.summaryItem}>
                  <DollarSign size={18} />
                  <span>
                    {getWinner("cost") !== null
                      ? `${travelModes.find((m) => m.id === comparison[getWinner("cost")].mode)?.name} is cheaper`
                      : "Both modes have similar cost"}
                  </span>
                </div>
                <div className={styles.summaryItem}>
                  <Leaf size={18} />
                  <span>
                    {getWinner("co2") !== null
                      ? `${travelModes.find((m) => m.id === comparison[getWinner("co2")].mode)?.name} is more eco-friendly`
                      : "Both modes have similar environmental impact"}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Quick Comparison Table */}
        <div className={styles.quickTable}>
          <h2>Quick Reference</h2>
          <table>
            <thead>
              <tr>
                <th>Mode</th>
                <th>Avg Cost</th>
                <th>Speed</th>
                <th>CO₂/km</th>
                <th>Best For</th>
              </tr>
            </thead>
            <tbody>
              {travelModes.map((mode) => (
                <tr key={mode.id}>
                  <td>
                    <div className={styles.tableMode}>
                      {React.createElement(modeIcons[mode.id] || Bus, {
                        size: 16,
                      })}
                      {mode.name}
                    </div>
                  </td>
                  <td>{mode.averageCost}</td>
                  <td>{mode.speed}</td>
                  <td>{formatCO2(mode.co2PerKm)}</td>
                  <td>{mode.benefits[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JourneyCompare;
