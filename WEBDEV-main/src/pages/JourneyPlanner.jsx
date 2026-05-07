import React, { useMemo, useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Leaf,
  DollarSign,
  ArrowRight,
  Save,
  RotateCcw,
} from "lucide-react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import {
  locations,
  getLocationById,
  getRoutesBetween,
} from "../data/locations";
import { travelModes } from "../data/travelModes";
import {
  formatDuration,
  formatCost,
  formatCO2,
  calculateCO2,
} from "../utils/calculations";
import { useApp } from "../context/AppContext";
import styles from "./JourneyPlanner.module.css";

const JourneyPlanner = () => {
  const { addSavedJourney, addActivity, state } = useApp();
  const [from, setFrom] = useState(() => {
    const savedFrom = window.localStorage.getItem("stm-planner-from");
    return savedFrom || "";
  });
  const [to, setTo] = useState(() => {
    const savedTo = window.localStorage.getItem("stm-planner-to");
    return savedTo || "";
  });
  const [mode, setMode] = useState(() => {
    const savedMode = window.localStorage.getItem("stm-planner-mode");
    return savedMode || "all";
  });
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const fromSuggestions = useMemo(() => {
    if (!from) return [];
    return locations
      .filter((loc) => loc.name.toLowerCase().includes(from.toLowerCase()))
      .filter((loc) => loc.name !== from)
      .slice(0, 5);
  }, [from]);

  const toSuggestions = useMemo(() => {
    if (!to) return [];
    return locations
      .filter((loc) => loc.name.toLowerCase().includes(to.toLowerCase()))
      .filter((loc) => loc.name !== to)
      .slice(0, 5);
  }, [to]);

  useEffect(() => {
    window.localStorage.setItem("stm-planner-from", from);
    window.localStorage.setItem("stm-planner-to", to);
    window.localStorage.setItem("stm-planner-mode", mode);
  }, [from, to, mode]);

  const handleSearch = () => {
    const fromLoc = locations.find((l) => l.name === from);
    const toLoc = locations.find((l) => l.name === to);

    if (!fromLoc || !toLoc) {
      setShowResults(false);
      return;
    }

    let routes = getRoutesBetween(fromLoc.id, toLoc.id);

    if (mode !== "all") {
      routes = routes.filter((r) => r.mode === mode);
    }

    // Add calculated routes for missing modes
    const modeList = mode === "all" ? travelModes.map((m) => m.id) : [mode];

    modeList.forEach((m) => {
      if (!routes.find((r) => r.mode === m)) {
        const distance = Math.random() * 10 + 2;
        routes.push({
          id: Date.now() + Math.random(),
          from: fromLoc.id,
          to: toLoc.id,
          mode: m,
          duration: Math.round(
            distance *
              (m === "walking"
                ? 15
                : m === "cycling"
                  ? 4
                  : m === "rail"
                    ? 2
                    : m === "car"
                      ? 3
                      : 4),
          ),
          cost:
            m === "walking"
              ? 0
              : m === "cycling"
                ? 0.02 * distance
                : 2.5 + 0.15 * distance,
          co2: calculateCO2(distance, m),
          transfers:
            m === "car" || m === "walking" ? 0 : Math.floor(Math.random() * 2),
        });
      }
    });

    setResults(routes.sort((a, b) => a.duration - b.duration));
    setShowResults(true);

    // Track activity
    addActivity({
      type: "search",
      from: fromLoc.name,
      to: toLoc.name,
      mode: mode,
    });
  };

  const handleSaveJourney = (route) => {
    const fromLoc = getLocationById(route.from);
    const toLoc = getLocationById(route.to);

    addSavedJourney({
      from: fromLoc.name,
      to: toLoc.name,
      mode: route.mode,
      duration: route.duration,
      cost: route.cost,
      co2: route.co2,
      date: new Date().toISOString(),
    });
  };

  const handleSwapLocations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const getModeIcon = (modeId) => {
    const mode = travelModes.find((m) => m.id === modeId);
    return mode?.color || "#64748B";
  };

  return (
    <div className={styles.planner}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Journey Planner</h1>
          <p>Plan your route by selecting start and end locations</p>
        </div>

        <Card className={styles.searchCard}>
          <div className={styles.searchForm}>
            <div className={styles.searchInputs}>
              <div className={styles.inputGroup}>
                <label>From</label>
                <div className={styles.autocomplete}>
                  <Input
                    icon={MapPin}
                    placeholder="Enter starting point"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  />
                  {fromSuggestions.length > 0 && (
                    <div className={styles.suggestions}>
                      {fromSuggestions.map((loc) => (
                        <button
                          key={loc.id}
                          onClick={() => {
                            setFrom(loc.name);
                          }}
                        >
                          <MapPin size={14} />
                          {loc.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                className={styles.swapBtn}
                onClick={handleSwapLocations}
                title="Swap locations"
              >
                <ArrowRight size={20} />
              </button>

              <div className={styles.inputGroup}>
                <label>To</label>
                <div className={styles.autocomplete}>
                  <Input
                    icon={MapPin}
                    placeholder="Enter destination"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  />
                  {toSuggestions.length > 0 && (
                    <div className={styles.suggestions}>
                      {toSuggestions.map((loc) => (
                        <button
                          key={loc.id}
                          onClick={() => {
                            setTo(loc.name);
                          }}
                        >
                          <MapPin size={14} />
                          {loc.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.filters}>
              <div className={styles.filterGroup}>
                <label>Preferred Mode</label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className={styles.select}
                >
                  <option value="all">All Modes</option>
                  {travelModes.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.filterActions}>
                <Button
                  variant="ghost"
                  icon={RotateCcw}
                  onClick={() => {
                    setFrom("");
                    setTo("");
                    setMode("all");
                    setResults([]);
                    setShowResults(false);
                    window.localStorage.removeItem("stm-planner-from");
                    window.localStorage.removeItem("stm-planner-to");
                    window.localStorage.removeItem("stm-planner-mode");
                  }}
                >
                  Reset
                </Button>
                <Button icon={ArrowRight} onClick={handleSearch}>
                  Find Routes
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {showResults && (
          <div className={styles.results}>
            <div className={styles.resultsHeader}>
              <h2>Available Routes</h2>
              <span>{results.length} options found</span>
            </div>

            <div className={styles.resultsList}>
              {results.map((route, index) => {
                const fromLoc = getLocationById(route.from);
                const toLoc = getLocationById(route.to);

                return (
                  <Card
                    key={route.id}
                    className={styles.routeCard}
                    hover
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className={styles.routeHeader}>
                      <div
                        className={styles.routeMode}
                        style={{ background: getModeIcon(route.mode) }}
                      >
                        {route.mode.charAt(0).toUpperCase()}
                      </div>
                      <div className={styles.routeInfo}>
                        <h3>{fromLoc.name}</h3>
                        <ArrowRight size={16} className={styles.routeArrow} />
                        <h3>{toLoc.name}</h3>
                      </div>
                      <div className={styles.routeActions}>
                        <button
                          className={styles.saveBtn}
                          onClick={() => handleSaveJourney(route)}
                          title="Save journey"
                        >
                          <Save size={18} />
                        </button>
                      </div>
                    </div>

                    <div className={styles.routeStats}>
                      <div className={styles.routeStat}>
                        <Clock size={16} />
                        <span className={styles.statValue}>
                          {formatDuration(route.duration)}
                        </span>
                        <span className={styles.statLabel}>Duration</span>
                      </div>
                      <div className={styles.routeStat}>
                        <DollarSign size={16} />
                        <span className={styles.statValue}>
                          {formatCost(route.cost)}
                        </span>
                        <span className={styles.statLabel}>Cost</span>
                      </div>
                      <div className={styles.routeStat}>
                        <Leaf size={16} />
                        <span className={styles.statValue}>
                          {formatCO2(route.co2)}
                        </span>
                        <span className={styles.statLabel}>CO₂</span>
                      </div>
                      {route.transfers > 0 && (
                        <div className={styles.routeStat}>
                          <span className={styles.transferBadge}>
                            {route.transfers} transfer
                            {route.transfers > 1 ? "s" : ""}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className={styles.routeFooter}>
                      <span className={styles.routeModeName}>
                        {travelModes.find((m) => m.id === route.mode)?.name}
                      </span>
                      {route.co2 === 0 && (
                        <span className={styles.ecoTag}>Zero Emissions</span>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {state.savedJourneys.length > 0 && !showResults && (
          <div className={styles.savedJourneys}>
            <h2>Your Saved Journeys</h2>
            <div className={styles.savedList}>
              {state.savedJourneys.slice(0, 3).map((journey, index) => (
                <Card key={index} className={styles.savedCard} hover>
                  <div className={styles.savedInfo}>
                    <span className={styles.savedRoute}>
                      {journey.from} → {journey.to}
                    </span>
                    <span className={styles.savedDetails}>
                      {journey.duration} min • {formatCost(journey.cost)}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JourneyPlanner;
