import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  MapPin,
  Leaf,
  Target,
  Activity,
  Plus,
  Trash2,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { useApp } from "../context/AppContext";
import {
  formatCost,
  formatCO2,
  getIntelligentRecommendations,
} from "../utils/calculations";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { state, removeSavedJourney } = useApp();
  const navigate = useNavigate();

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  };

  const timeOfDay = getTimeOfDay();

  // Generate mock data for charts
  const weeklyData = [
    { day: "Mon", distance: 8, co2: 0.5 },
    { day: "Tue", distance: 12, co2: 0.8 },
    { day: "Wed", distance: 6, co2: 0.4 },
    { day: "Thu", distance: 15, co2: 1.0 },
    { day: "Fri", distance: 10, co2: 0.7 },
    { day: "Sat", distance: 4, co2: 0.3 },
    { day: "Sun", distance: 5, co2: 0.3 },
  ];

  const modeDistribution = [
    { name: "Bus", value: 35, color: "#3B82F6" },
    { name: "Rail", value: 25, color: "#8B5CF6" },
    { name: "Cycle", value: 20, color: "#10B981" },
    { name: "Walk", value: 15, color: "#F59E0B" },
    { name: "Car", value: 5, color: "#EF4444" },
  ];

  const monthlyTrend = [
    { month: "Jan", journeys: 45, distance: 320 },
    { month: "Feb", journeys: 52, distance: 380 },
    { month: "Mar", journeys: 48, distance: 350 },
    { month: "Apr", journeys: 60, distance: 420 },
  ];

  const getGreeting = () => {
    if (timeOfDay === "morning") return "Good morning! Start your day right 🚴";
    if (timeOfDay === "afternoon") return "Good afternoon! Keep moving 💪";
    return "Good evening! Plan your tomorrow 🌙";
  };

  const recommendationOptions = getIntelligentRecommendations(
    state.behavior,
    timeOfDay,
  );
  const recommendation =
    recommendationOptions[0] ||
    (timeOfDay === "morning"
      ? { mode: "cycling", reason: "Good for a commute" }
      : timeOfDay === "afternoon"
        ? { mode: "bus", reason: "Useful for longer trips" }
        : { mode: "walking", reason: "Good for a short unwind" });

  return (
    <div className={styles.dashboard}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1>Your Dashboard</h1>
            <p>{getGreeting()}</p>
          </div>
          <div className={styles.quickStats}>
            <div className={styles.quickStat}>
              <span className={styles.statValue}>
                {state.savedJourneys.length}
              </span>
              <span className={styles.statLabel}>Saved Journeys</span>
            </div>
            <div className={styles.quickStat}>
              <span className={styles.statValue}>
                {state.sustainability.totalDistance || 0}
              </span>
              <span className={styles.statLabel}>km Travelled</span>
            </div>
            <div className={styles.quickStat}>
              <span className={styles.statValue}>
                {state.sustainability.totalCO2Saved || 0}
              </span>
              <span className={styles.statLabel}>kg CO₂ Saved</span>
            </div>
          </div>
        </div>

        {/* Recommendation Card */}
        <Card className={styles.recommendationCard}>
          <div className={styles.recommendationContent}>
            <div className={styles.recommendationIcon}>
              <Target size={24} />
            </div>
            <div className={styles.recommendationText}>
              <h3>Today's Recommendation</h3>
              <p>{recommendation.reason}</p>
            </div>
            <Button
              variant="secondary"
              size="small"
              onClick={() => navigate("/planner")}
            >
              Plan {recommendation.mode}
            </Button>
          </div>
        </Card>

        <div className={styles.grid}>
          {/* Weekly Activity */}
          <Card className={styles.chartCard}>
            <div className={styles.cardHeader}>
              <h2>Weekly Activity</h2>
              <span className={styles.cardSubtitle}>
                Distance travelled this week
              </span>
            </div>
            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "#fff",
                      border: "1px solid #E2E8F0",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="distance"
                    fill="#0D9488"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Mode Distribution */}
          <Card className={styles.chartCard}>
            <div className={styles.cardHeader}>
              <h2>Travel Mode Distribution</h2>
              <span className={styles.cardSubtitle}>Your preferred modes</span>
            </div>
            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={modeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {modeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className={styles.legend}>
                {modeDistribution.map((item, index) => (
                  <div key={index} className={styles.legendItem}>
                    <span
                      className={styles.legendColor}
                      style={{ background: item.color }}
                    ></span>
                    <span>{item.name}</span>
                    <span className={styles.legendValue}>{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Monthly Trend */}
          <Card className={styles.chartCard}>
            <div className={styles.cardHeader}>
              <h2>Monthly Trend</h2>
              <span className={styles.cardSubtitle}>Journeys over time</span>
            </div>
            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "#fff",
                      border: "1px solid #E2E8F0",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="journeys"
                    stroke="#0D9488"
                    strokeWidth={2}
                    dot={{ fill: "#0D9488", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Sustainability Score */}
          <Card className={styles.scoreCard}>
            <div className={styles.cardHeader}>
              <h2>Sustainability Score</h2>
            </div>
            <div className={styles.scoreCircle}>
              <svg viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#0D9488"
                  strokeWidth="8"
                  strokeDasharray="283"
                  strokeDashoffset="70"
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className={styles.scoreValue}>
                <span>75</span>
                <small>/100</small>
              </div>
            </div>
            <div className={styles.scoreDetails}>
              <div className={styles.scoreItem}>
                <span>Goal Progress</span>
                <span className={styles.scoreItemValue}>80%</span>
              </div>
              <div className={styles.scoreItem}>
                <span>CO₂ Saved</span>
                <span className={styles.scoreItemValue}>+15kg</span>
              </div>
              <div className={styles.scoreItem}>
                <span>Consistency</span>
                <span className={styles.scoreItemValue}>Good</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Saved Journeys */}
        <div className={styles.savedSection}>
          <div className={styles.sectionHeader}>
            <h2>Saved Journeys</h2>
            <Button variant="ghost" size="small" icon={Plus}>
              Add New
            </Button>
          </div>
          {state.savedJourneys.length > 0 ? (
            <div className={styles.savedGrid}>
              {state.savedJourneys.map((journey, index) => (
                <Card key={index} className={styles.savedCard} hover>
                  <div className={styles.savedHeader}>
                    <div className={styles.savedIcon}>
                      <MapPin size={18} />
                    </div>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => removeSavedJourney(journey.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className={styles.savedContent}>
                    <h3>{journey.from}</h3>
                    <span className={styles.savedArrow}>→</span>
                    <h3>{journey.to}</h3>
                  </div>
                  <div className={styles.savedStats}>
                    <span>
                      <Clock size={14} /> {journey.duration} min
                    </span>
                    <span>
                      <MapPin size={14} /> {formatCost(journey.cost)}
                    </span>
                    <span>
                      <Leaf size={14} /> {formatCO2(journey.co2)}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className={styles.emptyCard}>
              <MapPin size={48} className={styles.emptyIcon} />
              <h3>No saved journeys yet</h3>
              <p>
                Plan a journey and save it to access quickly from your
                dashboard.
              </p>
              <Button onClick={() => navigate("/planner")}>
                Plan a Journey
              </Button>
            </Card>
          )}
        </div>

        {/* Recent Activity */}
        {state.recentActivity.length > 0 && (
          <div className={styles.activitySection}>
            <h2>Recent Activity</h2>
            <div className={styles.activityList}>
              {state.recentActivity.slice(0, 5).map((activity, index) => (
                <div key={index} className={styles.activityItem}>
                  <div className={styles.activityIcon}>
                    <Activity size={16} />
                  </div>
                  <div className={styles.activityContent}>
                    <span className={styles.activityType}>
                      {activity.type === "search" ? "Searched route" : "Viewed"}
                    </span>
                    <span className={styles.activityDetails}>
                      {activity.from} → {activity.to}
                    </span>
                  </div>
                  <span className={styles.activityTime}>
                    {new Date(activity.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
