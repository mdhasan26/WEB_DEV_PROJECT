import React, { createContext, useContext, useReducer, useEffect } from "react";

// Initial state
const initialState = {
  // User preferences
  preferences: {
    preferredModes: [],
    homeLocation: null,
    workLocation: null,
    notifications: true,
    theme: "light",
  },

  // Saved journeys
  savedJourneys: [],

  // Favorite routes
  favorites: [],

  // Alerts
  alerts: [],
  alertSettings: {
    enabled: true,
    lines: [],
    notifyOnDelay: true,
    notifyOnDisruption: true,
    notifyOnClosure: true,
  },

  // Sustainability data
  sustainability: {
    weeklyGoal: 50, // km cycling goal
    currentWeekDistance: 0,
    weeklyHistory: [],
    monthlyHistory: [],
    totalDistance: 0,
    totalCO2Saved: 0,
    achievements: [],
  },

  // Recent activity
  recentActivity: [],

  // User behavior for recommendations
  behavior: {
    frequentModes: [],
    frequentTimes: [],
    frequentRoutes: [],
    lastActive: null,
  },
};

// Action types
const ActionTypes = {
  SET_PREFERENCES: "SET_PREFERENCES",
  ADD_SAVED_JOURNEY: "ADD_SAVED_JOURNEY",
  REMOVE_SAVED_JOURNEY: "REMOVE_SAVED_JOURNEY",
  ADD_FAVORITE: "ADD_FAVORITE",
  REMOVE_FAVORITE: "REMOVE_FAVORITE",
  ADD_ALERT: "ADD_ALERT",
  REMOVE_ALERT: "REMOVE_ALERT",
  UPDATE_ALERT_SETTINGS: "UPDATE_ALERT_SETTINGS",
  UPDATE_SUSTAINABILITY: "UPDATE_SUSTAINABILITY",
  ADD_ACTIVITY: "ADD_ACTIVITY",
  UPDATE_BEHAVIOR: "UPDATE_BEHAVIOR",
  LOAD_STATE: "LOAD_STATE",
  RESET_STATE: "RESET_STATE",
};

// Reducer function
function appReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_PREFERENCES:
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload },
      };

    case ActionTypes.ADD_SAVED_JOURNEY:
      return {
        ...state,
        savedJourneys: [
          ...state.savedJourneys,
          { ...action.payload, id: Date.now() },
        ],
      };

    case ActionTypes.REMOVE_SAVED_JOURNEY:
      return {
        ...state,
        savedJourneys: state.savedJourneys.filter(
          (j) => j.id !== action.payload,
        ),
      };

    case ActionTypes.ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, { ...action.payload, id: Date.now() }],
      };

    case ActionTypes.REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter((f) => f.id !== action.payload),
      };

    case ActionTypes.ADD_ALERT:
      return {
        ...state,
        alerts: [
          ...state.alerts,
          {
            ...action.payload,
            id: Date.now(),
            createdAt: new Date().toISOString(),
          },
        ],
      };

    case ActionTypes.REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter((a) => a.id !== action.payload),
      };

    case ActionTypes.UPDATE_ALERT_SETTINGS:
      return {
        ...state,
        alertSettings: { ...state.alertSettings, ...action.payload },
      };

    case ActionTypes.UPDATE_SUSTAINABILITY:
      return {
        ...state,
        sustainability: { ...state.sustainability, ...action.payload },
      };

    case ActionTypes.ADD_ACTIVITY:
      return {
        ...state,
        recentActivity: [
          { ...action.payload, timestamp: new Date().toISOString() },
          ...state.recentActivity.slice(0, 19),
        ],
      };

    case ActionTypes.UPDATE_BEHAVIOR:
      return {
        ...state,
        behavior: { ...state.behavior, ...action.payload },
      };

    case ActionTypes.LOAD_STATE:
      return action.payload;

    case ActionTypes.RESET_STATE:
      return initialState;

    default:
      return state;
  }
}

// Create context
const AppContext = createContext(null);

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("stmarys-app-state");
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        dispatch({ type: ActionTypes.LOAD_STATE, payload: parsed });
      } catch (e) {
        console.error("Failed to load state from localStorage:", e);
      }
    }
  }, []);

  // Save to localStorage on state change
  useEffect(() => {
    localStorage.setItem("stmarys-app-state", JSON.stringify(state));
  }, [state]);

  // Action creators
  const actions = {
    setPreferences: (preferences) => {
      dispatch({ type: ActionTypes.SET_PREFERENCES, payload: preferences });
    },

    addSavedJourney: (journey) => {
      dispatch({ type: ActionTypes.ADD_SAVED_JOURNEY, payload: journey });
    },

    removeSavedJourney: (id) => {
      dispatch({ type: ActionTypes.REMOVE_SAVED_JOURNEY, payload: id });
    },

    addFavorite: (favorite) => {
      dispatch({ type: ActionTypes.ADD_FAVORITE, payload: favorite });
    },

    removeFavorite: (id) => {
      dispatch({ type: ActionTypes.REMOVE_FAVORITE, payload: id });
    },

    addAlert: (alert) => {
      dispatch({ type: ActionTypes.ADD_ALERT, payload: alert });
    },

    removeAlert: (id) => {
      dispatch({ type: ActionTypes.REMOVE_ALERT, payload: id });
    },

    updateAlertSettings: (settings) => {
      dispatch({ type: ActionTypes.UPDATE_ALERT_SETTINGS, payload: settings });
    },

    updateSustainability: (data) => {
      dispatch({ type: ActionTypes.UPDATE_SUSTAINABILITY, payload: data });
    },

    addActivity: (activity) => {
      dispatch({ type: ActionTypes.ADD_ACTIVITY, payload: activity });
    },

    updateBehavior: (data) => {
      dispatch({ type: ActionTypes.UPDATE_BEHAVIOR, payload: data });
    },

    resetState: () => {
      dispatch({ type: ActionTypes.RESET_STATE });
    },
  };

  return (
    <AppContext.Provider value={{ state, ...actions }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

export default AppContext;
