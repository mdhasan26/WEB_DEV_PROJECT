// Utility functions for travel calculations

import { costFactors, co2Factors, timeFactors } from "../data/travelModes";

/**
 * Calculate estimated cost for a journey
 * @param {number} distance - Distance in km
 * @param {string} mode - Travel mode
 * @returns {object} Cost range object
 */
export const calculateCost = (distance, mode) => {
  const factors = costFactors[mode];
  if (!factors) return { min: 0, max: 0 };

  const baseCost = factors.base;
  const variableCost = factors.perKm * distance;
  const total = baseCost + variableCost;

  // Add some variance for estimate range
  const variance = mode === "bus" || mode === "rail" ? 0.5 : 0.2;

  return {
    min: parseFloat((total * (1 - variance)).toFixed(2)),
    max: parseFloat((total * (1 + variance)).toFixed(2)),
    average: parseFloat(total.toFixed(2)),
  };
};

/**
 * Calculate CO2 emissions for a journey
 * @param {number} distance - Distance in km
 * @param {string} mode - Travel mode
 * @returns {number} CO2 in kg
 */
export const calculateCO2 = (distance, mode) => {
  const factor = co2Factors[mode] || 0;
  return parseFloat((factor * distance).toFixed(3));
};

/**
 * Calculate travel time for a journey
 * @param {number} distance - Distance in km
 * @param {string} mode - Travel mode
 * @returns {number} Time in minutes
 */
export const calculateTime = (distance, mode) => {
  const factor = timeFactors[mode] || 15;
  return Math.round(factor * distance);
};

/**
 * Get convenience score for a travel mode
 * @param {string} mode - Travel mode
 * @returns {number} Score 1-10
 */
export const getConvenienceScore = (mode) => {
  const scores = {
    car: 9,
    bus: 6,
    rail: 7,
    cycling: 5,
    walking: 4,
    scooter: 6,
  };
  return scores[mode] || 5;
};

/**
 * Format duration in minutes to human readable
 * @param {number} minutes - Duration in minutes
 * @returns {string} Formatted duration
 */
export const formatDuration = (minutes) => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

/**
 * Format cost to currency
 * @param {number} cost - Cost in GBP
 * @returns {string} Formatted cost
 */
export const formatCost = (cost) => {
  if (cost === 0) return "Free";
  return `£${cost.toFixed(2)}`;
};

/**
 * Format CO2 to readable
 * @param {number} co2 - CO2 in kg
 * @returns {string} Formatted CO2
 */
export const formatCO2 = (co2) => {
  if (co2 === 0) return "0 kg";
  if (co2 < 1) return `${(co2 * 1000).toFixed(0)} g`;
  return `${co2.toFixed(2)} kg`;
};

/**
 * Get environmental impact label
 * @param {number} co2 - CO2 in kg
 * @returns {object} Label and color
 */
export const getEnvironmentalImpact = (co2) => {
  if (co2 === 0) {
    return { label: "Zero Emissions", color: "#10B981" };
  }
  if (co2 < 0.1) {
    return { label: "Low Impact", color: "#22C55E" };
  }
  if (co2 < 0.3) {
    return { label: "Medium Impact", color: "#F59E0B" };
  }
  return { label: "High Impact", color: "#EF4444" };
};

/**
 * Compare two travel modes
 * @param {string} mode1 - First mode
 * @param {string} mode2 - Second mode
 * @param {number} distance - Distance in km
 * @returns {object} Comparison data
 */
export const compareModes = (mode1, mode2, distance) => {
  const modes = [mode1, mode2].map((mode) => ({
    mode,
    time: calculateTime(distance, mode),
    cost: calculateCost(distance, mode),
    co2: calculateCO2(distance, mode),
    convenience: getConvenienceScore(mode),
  }));

  return modes;
};

/**
 * Get recommendation based on user behavior and time
 * @param {object} behavior - User behavior data
 * @param {string} timeOfDay - Time of day
 * @param {object} weather - Weather data (optional)
 * @returns {array} Recommended modes
 */
export const getIntelligentRecommendations = (
  behavior,
  timeOfDay,
  weather = null,
) => {
  let recommendations = [];

  // Time-based recommendations
  if (timeOfDay === "morning" || timeOfDay === "evening") {
    recommendations.push({
      mode: "cycling",
      reason: "Great for commute",
      score: 8,
    });
    recommendations.push({ mode: "rail", reason: "Avoid traffic", score: 7 });
  }

  if (timeOfDay === "midday") {
    recommendations.push({
      mode: "walking",
      reason: "Good for health",
      score: 8,
    });
    recommendations.push({ mode: "bus", reason: "Flexible option", score: 6 });
  }

  // Weather-based recommendations
  if (weather) {
    if (weather.rain > 0.5) {
      recommendations.unshift({ mode: "rail", reason: "Stay dry", score: 9 });
    }
    if (weather.temp > 25) {
      recommendations = recommendations.filter((r) => r.mode !== "car");
      recommendations.push({
        mode: "cycling",
        reason: "Beat the heat",
        score: 7,
      });
    }
  }

  // Behavior-based
  if (behavior?.frequentModes?.length > 0) {
    behavior.frequentModes.forEach((mode) => {
      if (!recommendations.find((r) => r.mode === mode)) {
        recommendations.push({ mode, reason: "Your usual choice", score: 7 });
      }
    });
  }

  // Sort by score and return top 3
  return recommendations.sort((a, b) => b.score - a.score).slice(0, 3);
};

/**
 * Calculate sustainability score
 * @param {object} sustainability - Sustainability data
 * @returns {object} Score and breakdown
 */
export const calculateSustainabilityScore = (sustainability) => {
  const { weeklyGoal, currentWeekDistance, totalCO2Saved } = sustainability;

  // Goal progress (0-40 points)
  const goalProgress = Math.min((currentWeekDistance / weeklyGoal) * 40, 40);

  // CO2 saved (0-30 points)
  const co2Score = Math.min(totalCO2Saved * 2, 30);

  // Consistency (0-30 points)
  const consistencyScore = Math.min(
    sustainability.weeklyHistory?.length * 5 || 0,
    30,
  );

  const total = goalProgress + co2Score + consistencyScore;

  return {
    total: Math.round(total),
    breakdown: {
      goalProgress: Math.round(goalProgress),
      co2Score: Math.round(co2Score),
      consistency: Math.round(consistencyScore),
    },
    level:
      total >= 80
        ? "Excellent"
        : total >= 60
          ? "Good"
          : total >= 40
            ? "Fair"
            : "Needs Improvement",
  };
};

export default {
  calculateCost,
  calculateCO2,
  calculateTime,
  getConvenienceScore,
  formatDuration,
  formatCost,
  formatCO2,
  getEnvironmentalImpact,
  compareModes,
  getIntelligentRecommendations,
  calculateSustainabilityScore,
};
