// Travel modes data with descriptions, benefits, and limitations

export const travelModes = [
  {
    id: "bus",
    name: "Bus",
    icon: "Bus",
    color: "#3B82F6",
    description:
      "Public transportation on fixed routes serving urban and suburban areas.",
    benefits: [
      "Extensive network coverage",
      "Affordable fares",
      "Accessible for mobility-impaired passengers",
      "Frequent stops near destinations",
      "Eco-friendly compared to cars",
    ],
    limitations: [
      "Can be affected by traffic delays",
      "Less frequent on weekends/evenings",
      "Crowding during peak hours",
      "Fixed routes may not be direct",
    ],
    averageCost: "£2.50 - £4.50",
    co2PerKm: 0.089, // kg CO2 per passenger km
    speed: "15-25 km/h average",
  },
  {
    id: "rail",
    name: "Rail",
    icon: "Train",
    color: "#8B5CF6",
    description:
      "Fast rail services connecting cities and suburban areas with high capacity.",
    benefits: [
      "Fast and efficient for long distances",
      "Comfortable seating",
      "WiFi and power outlets available",
      "Less affected by road traffic",
      "Higher capacity means less crowding",
    ],
    limitations: [
      "Limited to station-to-station travel",
      "More expensive than buses",
      "Less frequent in rural areas",
      "May require transfers",
    ],
    averageCost: "£3.00 - £15.00",
    co2PerKm: 0.041,
    speed: "40-100 km/h average",
  },
  {
    id: "cycling",
    name: "Cycling",
    icon: "Bike",
    color: "#10B981",
    description:
      "Personal cycling using dedicated bike lanes and shared paths.",
    benefits: [
      "Zero emissions transportation",
      "Great for health and fitness",
      "Avoids traffic congestion",
      "Door-to-door flexibility",
      "Free to use once you have a bike",
    ],
    limitations: [
      "Weather dependent",
      "Limited to shorter distances",
      "Requires physical effort",
      "Safety concerns in busy roads",
      "Bike storage needed at destination",
    ],
    averageCost: "£0 (ownership cost only)",
    co2PerKm: 0,
    speed: "15-20 km/h average",
  },
  {
    id: "walking",
    name: "Walking",
    icon: "Footprints",
    color: "#F59E0B",
    description: "Pedestrian travel on sidewalks and pedestrianised zones.",
    benefits: [
      "Completely free",
      "Best for health",
      "No environmental impact",
      "Can access any location",
      "Mental health benefits",
    ],
    limitations: [
      "Very slow for long distances",
      "Limited by physical ability",
      "Weather dependent",
      "Not suitable for heavy loads",
      "Safety issues in some areas",
    ],
    averageCost: "£0",
    co2PerKm: 0,
    speed: "4-6 km/h average",
  },
  {
    id: "car",
    name: "Car",
    icon: "Car",
    color: "#EF4444",
    description: "Private vehicle travel for personal transportation.",
    benefits: [
      "Door-to-door convenience",
      "Flexible departure times",
      "Privacy and comfort",
      "Can carry passengers and cargo",
      "Useful for remote areas",
    ],
    limitations: [
      "High fuel and parking costs",
      "Congestion and traffic delays",
      "Environmental impact",
      "Stress of driving in traffic",
      "Finding parking at destination",
    ],
    averageCost: "£0.20 - £0.40 per km",
    co2PerKm: 0.171,
    speed: "30-50 km/h average (urban)",
  },
  {
    id: "scooter",
    name: "Scooter",
    icon: "Zap",
    color: "#EC4899",
    description: "Electric scooter sharing for short urban trips.",
    benefits: [
      "Quick and fun to ride",
      "Easy to find in urban areas",
      "No parking hassles",
      "Eco-friendly option",
      "Good for last-mile travel",
    ],
    limitations: [
      "Limited range per charge",
      "Not suitable for long trips",
      "Weather dependent",
      "Safety concerns",
      "Regulatory restrictions in some areas",
    ],
    averageCost: "£1.00 - £2.50 per trip",
    co2PerKm: 0.008,
    speed: "20-25 km/h average",
  },
];

// Cost estimation factors
export const costFactors = {
  bus: { base: 2.5, perKm: 0.15 },
  rail: { base: 3.0, perKm: 0.25 },
  cycling: { base: 0, perKm: 0.02 }, // Maintenance cost
  walking: { base: 0, perKm: 0 },
  car: { base: 3.0, perKm: 0.2 },
  scooter: { base: 1.0, perKm: 0.1 },
};

// CO2 emission factors (kg per km)
export const co2Factors = {
  bus: 0.089,
  rail: 0.041,
  cycling: 0,
  walking: 0,
  car: 0.171,
  scooter: 0.008,
};

// Travel time estimates (minutes per km)
export const timeFactors = {
  bus: 4,
  rail: 2,
  cycling: 4,
  walking: 15,
  car: 3,
  scooter: 3,
};

export default travelModes;
