import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Route,
  Scale,
  Bell,
  Leaf,
  Clock,
  Bus,
  Train,
  Bike,
  ArrowRight,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { serviceUpdates } from "../data/serviceUpdates";
import { useApp } from "../context/AppContext";
import styles from "./Home.module.css";

const Home = () => {
  const { state } = useApp();
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const quickActions = [
    { icon: Route, label: "Plan Journey", path: "/planner", color: "#3B82F6" },
    { icon: Scale, label: "Compare Modes", path: "/compare", color: "#8B5CF6" },
    { icon: Bell, label: "Check Alerts", path: "/alerts", color: "#F59E0B" },
    {
      icon: Leaf,
      label: "Sustainability",
      path: "/sustainability",
      color: "#10B981",
    },
  ];

  const travelTips = [
    {
      title: "Plan Ahead",
      description: "Check service updates before your journey to avoid delays.",
    },
    {
      title: "Off-Peak Travel",
      description: "Travel outside rush hours for more comfortable journeys.",
    },
    {
      title: "Combine Modes",
      description:
        "Mix walking or cycling with public transport for better health.",
    },
    {
      title: "Track Your Impact",
      description:
        "Use our sustainability tools to monitor your carbon footprint.",
    },
  ];

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "high":
        return <AlertTriangle size={16} />;
      case "medium":
        return <Clock size={16} />;
      default:
        return <CheckCircle size={16} />;
    }
  };

  const getSeverityClass = (severity) => {
    switch (severity) {
      case "high":
        return styles.severityHigh;
      case "medium":
        return styles.severityMedium;
      default:
        return styles.severityLow;
    }
  };

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>St Mary's Urban Mobility Hub</div>
          <h1 className={styles.heroTitle}>{getGreeting()}! 👋</h1>
          <p className={styles.heroSubtitle}>
            Your personal travel companion for urban mobility. Plan journeys,
            compare options, and track your environmental impact.
          </p>
          <div className={styles.heroActions}>
            <Button icon={Route} onClick={() => navigate("/planner")}>
              Plan Your Journey
            </Button>
            <Button
              variant="secondary"
              icon={MapPin}
              onClick={() => navigate("/travel-modes")}
            >
              View Travel Modes
            </Button>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroCards}>
            <div className={`${styles.heroCard} ${styles.card1}`}>
              <Bus size={24} />
              <span>Bus Routes</span>
            </div>
            <div className={`${styles.heroCard} ${styles.card2}`}>
              <Train size={24} />
              <span>Rail Services</span>
            </div>
            <div className={`${styles.heroCard} ${styles.card3}`}>
              <Bike size={24} />
              <span>Cycle Paths</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className={styles.quickActions}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Quick Actions</h2>
            <p>Access the most popular features</p>
          </div>
          <div className={styles.actionGrid}>
            {quickActions.map((action, index) => (
              <Link
                key={action.path}
                to={action.path}
                className={styles.actionCard}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={styles.actionIcon}
                  style={{ background: action.color }}
                >
                  <action.icon size={24} />
                </div>
                <span className={styles.actionLabel}>{action.label}</span>
                <ArrowRight size={16} className={styles.actionArrow} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Service Status */}
      <section className={styles.serviceStatus}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Live Service Updates</h2>
            <p>Current status of all transport services</p>
          </div>
          <div className={styles.statusGrid}>
            {serviceUpdates.slice(0, 4).map((update, index) => (
              <Card
                key={update.id}
                className={`${styles.statusCard} ${getSeverityClass(update.severity)}`}
                hover
              >
                <div className={styles.statusHeader}>
                  <span className={styles.statusLine}>{update.line}</span>
                  <span
                    className={`${styles.statusBadge} ${getSeverityClass(update.severity)}`}
                  >
                    {getSeverityIcon(update.severity)}
                    {update.severity}
                  </span>
                </div>
                <p className={styles.statusMessage}>{update.message}</p>
                <span className={styles.statusTime}>
                  {new Date(update.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </Card>
            ))}
          </div>
          <div className={styles.viewAll}>
            <Link to="/alerts">
              View all updates <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className={styles.travelTips}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Travel Tips</h2>
            <p>Helpful advice for your journeys</p>
          </div>
          <div className={styles.tipsGrid}>
            {travelTips.map((tip, index) => (
              <Card key={index} className={styles.tipCard} hover>
                <h3 className={styles.tipTitle}>{tip.title}</h3>
                <p className={styles.tipDescription}>{tip.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      {state.savedJourneys.length > 0 && (
        <section className={styles.dashboardPreview}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>Your Recent Activity</h2>
              <Link to="/dashboard">
                View Dashboard <ChevronRight size={16} />
              </Link>
            </div>
            <div className={styles.activityGrid}>
              {state.savedJourneys.slice(0, 3).map((journey) => (
                <Card key={journey.id} className={styles.activityCard} hover>
                  <div className={styles.activityIcon}>
                    {journey.mode === "bus" && <Bus size={20} />}
                    {journey.mode === "rail" && <Train size={20} />}
                    {journey.mode === "cycling" && <Bike size={20} />}
                  </div>
                  <div className={styles.activityInfo}>
                    <span className={styles.activityRoute}>
                      {journey.from} → {journey.to}
                    </span>
                    <span className={styles.activityDetails}>
                      {journey.duration} min • £{journey.cost}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sustainability Preview */}
      <section className={styles.sustainabilityPreview}>
        <div className={styles.container}>
          <Card className={styles.sustainabilityCard}>
            <div className={styles.sustainabilityContent}>
              <div className={styles.sustainabilityInfo}>
                <Leaf size={32} className={styles.sustainabilityIcon} />
                <div>
                  <h3>Track Your Environmental Impact</h3>
                  <p>
                    Monitor your carbon footprint and work towards sustainable
                    travel goals.
                  </p>
                </div>
              </div>
              <div className={styles.sustainabilityStats}>
                <div className={styles.stat}>
                  <span className={styles.statValue}>
                    {state.sustainability.totalDistance || 0}
                  </span>
                  <span className={styles.statLabel}>km travelled</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>
                    {state.sustainability.totalCO2Saved || 0}
                  </span>
                  <span className={styles.statLabel}>kg CO₂ saved</span>
                </div>
              </div>
              <Button
                variant="secondary"
                onClick={() => navigate("/sustainability")}
              >
                View Sustainability
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
