import React, { useState } from "react";
import {
  Bell,
  AlertTriangle,
  Clock,
  XCircle,
  Info,
  Plus,
  Trash2,
  Search,
  Settings,
  CheckCircle,
} from "lucide-react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { serviceUpdates } from "../data/serviceUpdates";
import { useApp } from "../context/AppContext";
import styles from "./Alerts.module.css";

const Alerts = () => {
  const { state, addAlert, removeAlert, updateAlertSettings } = useApp();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAlert, setNewAlert] = useState({ route: "", type: "delay" });

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "high":
        return <AlertTriangle size={18} />;
      case "medium":
        return <Clock size={18} />;
      default:
        return <Info size={18} />;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "delay":
        return <Clock size={18} />;
      case "disruption":
        return <AlertTriangle size={18} />;
      case "closure":
        return <XCircle size={18} />;
      default:
        return <Info size={18} />;
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

  const getTypeClass = (type) => {
    switch (type) {
      case "delay":
        return styles.typeDelay;
      case "disruption":
        return styles.typeDisruption;
      case "closure":
        return styles.typeClosure;
      default:
        return styles.typeInfo;
    }
  };

  const filteredAlerts = serviceUpdates.filter((alert) => {
    if (filter !== "all" && alert.severity !== filter) return false;
    if (
      searchTerm &&
      !alert.line.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !alert.message.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  const handleCreateAlert = () => {
    if (newAlert.route) {
      addAlert({
        route: newAlert.route,
        type: newAlert.type,
        message: `Custom alert for ${newAlert.route}`,
        severity: "medium",
      });
      setNewAlert({ route: "", type: "delay" });
      setShowCreateForm(false);
    }
  };

  const handleToggleSetting = (key) => {
    updateAlertSettings({
      [key]: !state.alertSettings[key],
    });
  };

  return (
    <div className={styles.alerts}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1>Travel Alerts</h1>
            <p>Stay informed about service updates and disruptions</p>
          </div>
          <div className={styles.headerActions}>
            <Button
              variant="secondary"
              icon={Settings}
              onClick={() => setShowSettings(!showSettings)}
            >
              Settings
            </Button>
            <Button
              icon={Plus}
              onClick={() => setShowCreateForm((current) => !current)}
            >
              Create Alert
            </Button>
          </div>
        </div>

        {showCreateForm && (
          <Card className={styles.settingsCard}>
            <h3>Create Custom Alert</h3>
            <div className={styles.settingsList}>
              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <span className={styles.settingLabel}>Route or line</span>
                  <span className={styles.settingDescription}>
                    Name the route you want to monitor
                  </span>
                </div>
                <Input
                  placeholder="e.g. Bus Route 42"
                  value={newAlert.route}
                  onChange={(e) =>
                    setNewAlert((current) => ({
                      ...current,
                      route: e.target.value,
                    }))
                  }
                />
              </div>
              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <span className={styles.settingLabel}>Alert type</span>
                  <span className={styles.settingDescription}>
                    Select the kind of notice to track
                  </span>
                </div>
                <select
                  className={styles.searchInput}
                  value={newAlert.type}
                  onChange={(e) =>
                    setNewAlert((current) => ({
                      ...current,
                      type: e.target.value,
                    }))
                  }
                >
                  <option value="delay">Delay</option>
                  <option value="disruption">Disruption</option>
                  <option value="closure">Closure</option>
                </select>
              </div>
              <div className={styles.goalActions}>
                <Button
                  variant="ghost"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateAlert}>Save Alert</Button>
              </div>
            </div>
          </Card>
        )}

        {/* Settings Panel */}
        {showSettings && (
          <Card className={styles.settingsCard}>
            <h3>Alert Preferences</h3>
            <div className={styles.settingsList}>
              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <span className={styles.settingLabel}>
                    Enable Notifications
                  </span>
                  <span className={styles.settingDescription}>
                    Receive alerts for service updates
                  </span>
                </div>
                <button
                  className={`${styles.toggle} ${state.alertSettings.enabled ? styles.active : ""}`}
                  onClick={() => handleToggleSetting("enabled")}
                >
                  <span className={styles.toggleSlider}></span>
                </button>
              </div>
              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <span className={styles.settingLabel}>
                    Delay Notifications
                  </span>
                  <span className={styles.settingDescription}>
                    Get notified about service delays
                  </span>
                </div>
                <button
                  className={`${styles.toggle} ${state.alertSettings.notifyOnDelay ? styles.active : ""}`}
                  onClick={() => handleToggleSetting("notifyOnDelay")}
                >
                  <span className={styles.toggleSlider}></span>
                </button>
              </div>
              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <span className={styles.settingLabel}>Disruption Alerts</span>
                  <span className={styles.settingDescription}>
                    Get notified about service disruptions
                  </span>
                </div>
                <button
                  className={`${styles.toggle} ${state.alertSettings.notifyOnDisruption ? styles.active : ""}`}
                  onClick={() => handleToggleSetting("notifyOnDisruption")}
                >
                  <span className={styles.toggleSlider}></span>
                </button>
              </div>
              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <span className={styles.settingLabel}>Closure Notices</span>
                  <span className={styles.settingDescription}>
                    Get notified about service closures
                  </span>
                </div>
                <button
                  className={`${styles.toggle} ${state.alertSettings.notifyOnClosure ? styles.active : ""}`}
                  onClick={() => handleToggleSetting("notifyOnClosure")}
                >
                  <span className={styles.toggleSlider}></span>
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <button
              className={`${styles.filterBtn} ${filter === "all" ? styles.active : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`${styles.filterBtn} ${filter === "high" ? styles.active : ""}`}
              onClick={() => setFilter("high")}
            >
              <AlertTriangle size={14} /> High
            </button>
            <button
              className={`${styles.filterBtn} ${filter === "medium" ? styles.active : ""}`}
              onClick={() => setFilter("medium")}
            >
              <Clock size={14} /> Medium
            </button>
            <button
              className={`${styles.filterBtn} ${filter === "low" ? styles.active : ""}`}
              onClick={() => setFilter("low")}
            >
              <Info size={14} /> Low
            </button>
          </div>
          <div className={styles.searchWrapper}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* Alert Stats */}
        <div className={styles.alertStats}>
          <div className={`${styles.statCard} ${styles.statHigh}`}>
            <AlertTriangle size={20} />
            <span className={styles.statValue}>
              {serviceUpdates.filter((a) => a.severity === "high").length}
            </span>
            <span className={styles.statLabel}>High Priority</span>
          </div>
          <div className={`${styles.statCard} ${styles.statMedium}`}>
            <Clock size={20} />
            <span className={styles.statValue}>
              {serviceUpdates.filter((a) => a.severity === "medium").length}
            </span>
            <span className={styles.statLabel}>Medium</span>
          </div>
          <div className={`${styles.statCard} ${styles.statLow}`}>
            <Info size={20} />
            <span className={styles.statValue}>
              {serviceUpdates.filter((a) => a.severity === "low").length}
            </span>
            <span className={styles.statLabel}>Low Priority</span>
          </div>
          <div className={styles.statCard}>
            <Bell size={20} />
            <span className={styles.statValue}>{state.alerts.length}</span>
            <span className={styles.statLabel}>Custom Alerts</span>
          </div>
        </div>

        {/* Alerts List */}
        <div className={styles.alertsList}>
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert, index) => (
              <Card
                key={alert.id}
                className={`${styles.alertCard} ${getSeverityClass(alert.severity)}`}
                hover
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={styles.alertHeader}>
                  <div
                    className={`${styles.alertType} ${getTypeClass(alert.type)}`}
                  >
                    {getTypeIcon(alert.type)}
                  </div>
                  <div className={styles.alertInfo}>
                    <h3>{alert.line}</h3>
                    <span
                      className={`${styles.severityBadge} ${getSeverityClass(alert.severity)}`}
                    >
                      {getSeverityIcon(alert.severity)}
                      {alert.severity}
                    </span>
                  </div>
                  <span className={styles.alertTime}>
                    {new Date(alert.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className={styles.alertMessage}>{alert.message}</p>
                {alert.affectedStops.length > 0 && (
                  <div className={styles.affectedStops}>
                    <span>Affected stops:</span>
                    <div className={styles.stopsList}>
                      {alert.affectedStops.map((stop, i) => (
                        <span key={i} className={styles.stopTag}>
                          {stop}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className={styles.alertActions}>
                  <button className={styles.actionBtn}>
                    <CheckCircle size={16} /> Mark as read
                  </button>
                  <button className={styles.actionBtn}>
                    <Bell size={16} /> Subscribe
                  </button>
                </div>
              </Card>
            ))
          ) : (
            <Card className={styles.emptyCard}>
              <Bell size={48} className={styles.emptyIcon} />
              <h3>No alerts found</h3>
              <p>There are no alerts matching your current filters.</p>
            </Card>
          )}
        </div>

        {/* Custom Alerts Section */}
        {state.alerts.length > 0 && (
          <div className={styles.customAlerts}>
            <h2>Your Custom Alerts</h2>
            <div className={styles.customList}>
              {state.alerts.map((alert, index) => (
                <Card key={index} className={styles.customCard}>
                  <div className={styles.customContent}>
                    <Bell size={18} />
                    <div>
                      <h4>{alert.route}</h4>
                      <p>{alert.message}</p>
                    </div>
                  </div>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => removeAlert(alert.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;
