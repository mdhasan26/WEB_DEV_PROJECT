import React, { useState } from "react";
import { DollarSign, MapPin, Calculator, Info, ArrowRight } from "lucide-react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { travelModes, costFactors } from "../data/travelModes";
import { calculateCost, formatCost } from "../utils/calculations";
import styles from "./FareEstimator.module.css";

const FareEstimator = () => {
  const [distance, setDistance] = useState(10);
  const [mode, setMode] = useState("bus");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const handleCalculate = () => {
    const cost = calculateCost(distance, mode);
    setResult({ distance, mode, cost });

    // Add to history
    const newEntry = {
      id: Date.now(),
      distance,
      mode,
      cost,
      timestamp: new Date().toISOString(),
    };
    setHistory([newEntry, ...history.slice(0, 4)]);
  };

  const getModeColor = (modeId) => {
    const mode = travelModes.find((m) => m.id === modeId);
    return mode?.color || "#64748B";
  };

  return (
    <div className={styles.estimator}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Fare Estimator</h1>
          <p>
            Estimate the cost of your journey based on distance and travel mode
          </p>
        </div>

        <div className={styles.grid}>
          {/* Input Section */}
          <Card className={styles.inputCard}>
            <h2>Calculate Your Fare</h2>

            <div className={styles.inputGroup}>
              <label>Distance (km)</label>
              <div className={styles.sliderWrapper}>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className={styles.slider}
                />
                <div className={styles.sliderLabels}>
                  <span>1 km</span>
                  <span className={styles.sliderValue}>{distance} km</span>
                  <span>50 km</span>
                </div>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Travel Mode</label>
              <div className={styles.modeGrid}>
                {travelModes.map((m) => (
                  <button
                    key={m.id}
                    className={`${styles.modeBtn} ${mode === m.id ? styles.active : ""}`}
                    onClick={() => setMode(m.id)}
                    style={{
                      borderColor: mode === m.id ? m.color : "transparent",
                      background:
                        mode === m.id ? `${m.color}15` : "transparent",
                    }}
                  >
                    <span
                      className={styles.modeColor}
                      style={{ background: m.color }}
                    />
                    {m.name}
                  </button>
                ))}
              </div>
            </div>

            <Button icon={Calculator} onClick={handleCalculate} fullWidth>
              Calculate Fare
            </Button>
          </Card>

          {/* Result Section */}
          <Card className={styles.resultCard}>
            <h2>Estimated Cost</h2>

            {result ? (
              <div className={styles.resultContent}>
                <div className={styles.resultMain}>
                  <span className={styles.resultRange}>
                    {formatCost(result.cost.min)} -{" "}
                    {formatCost(result.cost.max)}
                  </span>
                  <span className={styles.resultAverage}>
                    Average: {formatCost(result.cost.average)}
                  </span>
                </div>

                <div className={styles.resultDetails}>
                  <div className={styles.resultItem}>
                    <MapPin size={18} />
                    <span>Distance</span>
                    <strong>{result.distance} km</strong>
                  </div>
                  <div className={styles.resultItem}>
                    <DollarSign size={18} />
                    <span>Base Fare</span>
                    <strong>
                      £{costFactors[result.mode]?.base.toFixed(2) || "0.00"}
                    </strong>
                  </div>
                  <div className={styles.resultItem}>
                    <Calculator size={18} />
                    <span>Per km</span>
                    <strong>
                      £{costFactors[result.mode]?.perKm.toFixed(2) || "0.00"}
                    </strong>
                  </div>
                </div>

                <div className={styles.resultNote}>
                  <Info size={16} />
                  <span>
                    This is an estimate. Actual fares may vary based on operator
                    and time.
                  </span>
                </div>
              </div>
            ) : (
              <div className={styles.emptyResult}>
                <DollarSign size={48} />
                <p>Enter distance and select a mode to calculate your fare</p>
              </div>
            )}
          </Card>
        </div>

        {/* Cost Comparison */}
        <Card className={styles.comparisonCard}>
          <h2>Cost Comparison Across Modes</h2>
          <p className={styles.comparisonSubtitle}>
            Estimated cost for {distance}km journey
          </p>

          <div className={styles.comparisonGrid}>
            {travelModes.map((m) => {
              const cost = calculateCost(distance, m.id);
              return (
                <div
                  key={m.id}
                  className={`${styles.comparisonItem} ${mode === m.id ? styles.highlight : ""}`}
                  onClick={() => setMode(m.id)}
                >
                  <div className={styles.comparisonHeader}>
                    <span
                      className={styles.comparisonColor}
                      style={{ background: m.color }}
                    />
                    <span className={styles.comparisonMode}>{m.name}</span>
                  </div>
                  <span className={styles.comparisonCost}>
                    {formatCost(cost.average)}
                  </span>
                  <div className={styles.comparisonBar}>
                    <div
                      style={{
                        width: `${(cost.average / 15) * 100}%`,
                        background: m.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* History */}
        {history.length > 0 && (
          <Card className={styles.historyCard}>
            <h2>Recent Estimates</h2>
            <div className={styles.historyList}>
              {history.map((item, index) => {
                const modeData = travelModes.find((m) => m.id === item.mode);
                return (
                  <div key={item.id} className={styles.historyItem}>
                    <span
                      className={styles.historyColor}
                      style={{ background: modeData?.color }}
                    />
                    <div className={styles.historyInfo}>
                      <span>
                        {item.distance} km • {modeData?.name}
                      </span>
                      <span>{formatCost(item.cost.average)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FareEstimator;
