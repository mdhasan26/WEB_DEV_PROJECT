import React, { useState, useEffect } from "react";
import {
  Leaf,
  TrendingUp,
  Target,
  Award,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Plus,
  Trophy,
  Flame,
  Zap,
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
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  Legend,
  Pie,
  Cell,
} from "recharts";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { useApp } from "../context/AppContext";
import { formatCO2 } from "../utils/calculations";
import styles from "./Sustainability.module.css";

const Sustainability = () => {
  const { state, updateSustainability } = useApp();
  const [weeklyGoal, setWeeklyGoal] = useState(
    state.sustainability.weeklyGoal || 50,
  );
  const [activeTab, setActiveTab] = useState("overview");

  // Generate mock data
  const weeklyProgress = [
    { day: "Mon", cycling: 8, walking: 3, bus: 5, rail: 0 },
    { day: "Tue", cycling: 12, walking: 2, bus: 0, rail: 8 },
    { day: "Wed", cycling: 6, walking: 4, bus: 10, rail: 0 },
    { day: "Thu", cycling: 15, walking: 2, bus: 0, rail: 0 },
    { day: "Fri", cycling: 10, walking: 3, bus: 8, rail: 0 },
    { day: "Sat", cycling: 4, walking: 5, bus: 0, rail: 0 },
    { day: "Sun", cycling: 5, walking: 6, bus: 0, rail: 0 },
  ];

  const monthlyTrend = [
    { month: "Week 1", distance: 45, co2Saved: 3.2, goal: 50 },
    { month: "Week 2", distance: 52, co2Saved: 3.8, goal: 50 },
    { month: "Week 3", distance: 38, co2Saved: 2.7, goal: 50 },
    { month: "Week 4", distance: 60, co2Saved: 4.5, goal: 50 },
  ];

  const carbonComparison = [
    { name: "Car", value: 85, fill: "#EF4444" },
    { name: "Bus", value: 35, fill: "#3B82F6" },
    { name: "Rail", value: 20, fill: "#8B5CF6" },
    { name: "Cycle", value: 0, fill: "#10B981" },
    { name: "Walk", value: 0, fill: "#F59E0B" },
  ];

  const modeContribution = [
    { name: "Cycling", value: 60, color: "#10B981" },
    { name: "Walking", value: 25, color: "#F59E0B" },
    { name: "Public", value: 15, color: "#3B82F6" },
  ];

  const achievements = [
    {
      id: 1,
      name: "First Ride",
      description: "Complete your first sustainable journey",
      icon: "🚴",
      earned: true,
    },
    {
      id: 2,
      name: "Week Warrior",
      description: "Travel sustainably for 7 days",
      icon: "🏆",
      earned: true,
    },
    {
      id: 3,
      name: "Carbon Saver",
      description: "Save 10kg of CO2 emissions",
      icon: "🌱",
      earned: true,
    },
    {
      id: 4,
      name: "50 Club",
      description: "Travel 50km sustainably",
      icon: "🎯",
      earned: false,
    },
    {
      id: 5,
      name: "Eco Champion",
      description: "Save 50kg of CO2 emissions",
      icon: "🏅",
      earned: false,
    },
    {
      id: 6,
      name: "Month Master",
      description: "Maintain streak for 30 days",
      icon: "⭐",
      earned: false,
    },
  ];

  const currentWeekDistance = weeklyProgress.reduce(
    (sum, day) => sum + day.cycling + day.walking,
    0,
  );
  const goalProgress = Math.min((currentWeekDistance / weeklyGoal) * 100, 100);
  const totalCO2Saved = 12.5; // Mock value

  const handleGoalChange = (newGoal) => {
    setWeeklyGoal(newGoal);
    updateSustainability({ weeklyGoal: newGoal });
  };

  return (
    <div className={styles.sustainability}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1>Sustainability</h1>
            <p>Track your environmental impact and travel goals</p>
          </div>
          <div className={styles.scoreBadge}>
            <Leaf size={20} />
            <div>
              <span className={styles.scoreValue}>75</span>
              <span className={styles.scoreLabel}>Eco Score</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "overview" ? styles.active : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`${styles.tab} ${activeTab === "analytics" ? styles.active : ""}`}
            onClick={() => setActiveTab("analytics")}
          >
            Analytics
          </button>
          <button
            className={`${styles.tab} ${activeTab === "goals" ? styles.active : ""}`}
            onClick={() => setActiveTab("goals")}
          >
            Goals
          </button>
          <button
            className={`${styles.tab} ${activeTab === "achievements" ? styles.active : ""}`}
            onClick={() => setActiveTab("achievements")}
          >
            Achievements
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <>
            {/* Quick Stats */}
            <div className={styles.statsGrid}>
              <Card className={styles.statCard}>
                <div
                  className={styles.statIcon}
                  style={{ background: "#10B981" }}
                >
                  <Activity size={24} />
                </div>
                <div className={styles.statInfo}>
                  <span className={styles.statValue}>
                    {currentWeekDistance}
                  </span>
                  <span className={styles.statLabel}>km this week</span>
                </div>
                <div className={styles.statTrend}>
                  <TrendingUp size={16} /> +12%
                </div>
              </Card>

              <Card className={styles.statCard}>
                <div
                  className={styles.statIcon}
                  style={{ background: "#3B82F6" }}
                >
                  <Leaf size={24} />
                </div>
                <div className={styles.statInfo}>
                  <span className={styles.statValue}>{totalCO2Saved}</span>
                  <span className={styles.statLabel}>kg CO₂ saved</span>
                </div>
                <div className={styles.statTrend}>
                  <TrendingUp size={16} /> +8%
                </div>
              </Card>

              <Card className={styles.statCard}>
                <div
                  className={styles.statIcon}
                  style={{ background: "#F59E0B" }}
                >
                  <Target size={24} />
                </div>
                <div className={styles.statInfo}>
                  <span className={styles.statValue}>
                    {Math.round(goalProgress)}%
                  </span>
                  <span className={styles.statLabel}>weekly goal</span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${goalProgress}%` }}
                  />
                </div>
              </Card>

              <Card className={styles.statCard}>
                <div
                  className={styles.statIcon}
                  style={{ background: "#8B5CF6" }}
                >
                  <Trophy size={24} />
                </div>
                <div className={styles.statInfo}>
                  <span className={styles.statValue}>3</span>
                  <span className={styles.statLabel}>achievements</span>
                </div>
                <span className={styles.statSubtext}>2 more to unlock</span>
              </Card>
            </div>

            {/* Weekly Progress Chart */}
            <Card className={styles.chartCard}>
              <div className={styles.cardHeader}>
                <h2>Weekly Activity</h2>
                <span className={styles.cardSubtitle}>
                  Distance by travel mode (km)
                </span>
              </div>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyProgress}>
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
                      dataKey="cycling"
                      stackId="a"
                      fill="#10B981"
                      name="Cycling"
                    />
                    <Bar
                      dataKey="walking"
                      stackId="a"
                      fill="#F59E0B"
                      name="Walking"
                    />
                    <Bar dataKey="bus" stackId="a" fill="#3B82F6" name="Bus" />
                    <Bar
                      dataKey="rail"
                      stackId="a"
                      fill="#8B5CF6"
                      name="Rail"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Carbon Comparison */}
            <div className={styles.twoColumn}>
              <Card className={styles.chartCard}>
                <div className={styles.cardHeader}>
                  <h2>Carbon Footprint Comparison</h2>
                  <span className={styles.cardSubtitle}>
                    CO₂ emissions by mode (g/km)
                  </span>
                </div>
                <div className={styles.chartContainer}>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={carbonComparison} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis type="number" stroke="#64748B" fontSize={12} />
                      <YAxis
                        dataKey="name"
                        type="category"
                        stroke="#64748B"
                        fontSize={12}
                        width={60}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "#fff",
                          border: "1px solid #E2E8F0",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar
                        dataKey="value"
                        fill="#0D9488"
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className={styles.chartCard}>
                <div className={styles.cardHeader}>
                  <h2>Mode Distribution</h2>
                  <span className={styles.cardSubtitle}>
                    Your travel breakdown
                  </span>
                </div>
                <div className={styles.chartContainer}>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={modeContribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {modeContribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className={styles.legend}>
                    {modeContribution.map((item, index) => (
                      <div key={index} className={styles.legendItem}>
                        <span
                          className={styles.legendColor}
                          style={{ background: item.color }}
                        ></span>
                        <span>{item.name}</span>
                        <span className={styles.legendValue}>
                          {item.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <>
            <Card className={styles.chartCard}>
              <div className={styles.cardHeader}>
                <h2>Monthly Trend</h2>
                <span className={styles.cardSubtitle}>
                  Distance and CO₂ saved over time
                </span>
              </div>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                    <YAxis yAxisId="left" stroke="#64748B" fontSize={12} />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#64748B"
                      fontSize={12}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#fff",
                        border: "1px solid #E2E8F0",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="distance"
                      stroke="#0D9488"
                      fill="rgba(13, 148, 136, 0.2)"
                      name="Distance (km)"
                    />
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="co2Saved"
                      stroke="#F59E0B"
                      fill="rgba(245, 158, 11, 0.2)"
                      name="CO₂ Saved (kg)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className={styles.analyticsGrid}>
              <Card className={styles.analyticsCard}>
                <h3>Average Trip Distance</h3>
                <div className={styles.analyticsValue}>8.5 km</div>
                <p>Your typical sustainable journey length</p>
              </Card>
              <Card className={styles.analyticsCard}>
                <h3>Most Sustainable Day</h3>
                <div className={styles.analyticsValue}>Thursday</div>
                <p>Highest eco-friendly travel rate</p>
              </Card>
              <Card className={styles.analyticsCard}>
                <h3>CO₂ Avoided This Month</h3>
                <div className={styles.analyticsValue}>15.2 kg</div>
                <p>Equivalent to 60 car km</p>
              </Card>
            </div>
          </>
        )}

        {/* Goals Tab */}
        {activeTab === "goals" && (
          <>
            <Card className={styles.goalCard}>
              <div className={styles.goalHeader}>
                <h2>Weekly Cycling Goal</h2>
                <span className={styles.goalStatus}>
                  {currentWeekDistance} / {weeklyGoal} km
                </span>
              </div>
              <div className={styles.goalProgress}>
                <div
                  className={styles.goalFill}
                  style={{ width: `${goalProgress}%` }}
                />
              </div>
              <div className={styles.goalActions}>
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() =>
                    handleGoalChange(Math.max(10, weeklyGoal - 10))
                  }
                >
                  -10 km
                </Button>
                <span className={styles.goalValue}>{weeklyGoal} km</span>
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => handleGoalChange(weeklyGoal + 10)}
                >
                  +10 km
                </Button>
              </div>
            </Card>

            <div className={styles.goalsList}>
              <h3>Active Goals</h3>
              <Card className={styles.activeGoal}>
                <div className={styles.goalIcon}>
                  <Flame size={24} />
                </div>
                <div className={styles.goalInfo}>
                  <h4>Cycle 30km this month</h4>
                  <p>Current: 22km / 30km</p>
                </div>
                <div className={styles.goalProgressSmall}>
                  <div style={{ width: "73%" }} />
                </div>
              </Card>
              <Card className={styles.activeGoal}>
                <div className={styles.goalIcon}>
                  <Zap size={24} />
                </div>
                <div className={styles.goalInfo}>
                  <h4>Save 20kg CO₂</h4>
                  <p>Current: 15.2kg / 20kg</p>
                </div>
                <div className={styles.goalProgressSmall}>
                  <div style={{ width: "76%" }} />
                </div>
              </Card>
            </div>
          </>
        )}

        {/* Achievements Tab */}
        {activeTab === "achievements" && (
          <div className={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`${styles.achievementCard} ${achievement.earned ? styles.earned : ""}`}
              >
                <div className={styles.achievementIcon}>{achievement.icon}</div>
                <div className={styles.achievementInfo}>
                  <h3>{achievement.name}</h3>
                  <p>{achievement.description}</p>
                </div>
                {achievement.earned && (
                  <div className={styles.achievementBadge}>
                    <Award size={16} />
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sustainability;
