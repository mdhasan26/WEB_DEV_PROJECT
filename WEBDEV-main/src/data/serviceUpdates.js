// Mock service updates data

export const serviceUpdates = [
  {
    id: 1,
    type: "delay",
    severity: "medium",
    line: "Bus Route 42",
    message: "Minor delays due to roadworks on High Street",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    affectedStops: ["Market Square", "Church Lane"],
  },
  {
    id: 2,
    type: "disruption",
    severity: "high",
    line: "Rail Line Central",
    message:
      "Service suspended between Central and West stations due to signal failure",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    affectedStops: ["Central Station", "West Station", "University"],
  },
  {
    id: 3,
    type: "closure",
    severity: "low",
    line: "Bus Route 15",
    message: "Temporary stop closure - use alternative stop 200m away",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    affectedStops: ["Hospital Entrance"],
  },
  {
    id: 4,
    type: "info",
    severity: "low",
    line: "Bike Share",
    message: "New bike stations now available at Riverside Park",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    affectedStops: [],
  },
  {
    id: 5,
    type: "delay",
    severity: "low",
    line: "Bus Route 7",
    message: "Slight delays expected due to increased passenger volume",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    affectedStops: ["Town Centre", "Shopping Mall"],
  },
  {
    id: 6,
    type: "info",
    severity: "medium",
    line: "Rail Line Northern",
    message: "Reduced frequency on weekend services until end of month",
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    affectedStops: [],
  },
];

// Get service status color based on severity
export const getSeverityColor = (severity) => {
  switch (severity) {
    case "high":
      return "#EF4444";
    case "medium":
      return "#F59E0B";
    case "low":
      return "#3B82F6";
    default:
      return "#64748B";
  }
};

// Get service status icon based on type
export const getServiceTypeIcon = (type) => {
  switch (type) {
    case "delay":
      return "Clock";
    case "disruption":
      return "AlertTriangle";
    case "closure":
      return "XCircle";
    case "info":
      return "Info";
    default:
      return "Info";
  }
};

export default serviceUpdates;
