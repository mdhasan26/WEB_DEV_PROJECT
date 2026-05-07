import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import TravelModes from "./pages/TravelModes";
import JourneyPlanner from "./pages/JourneyPlanner";
import JourneyCompare from "./pages/JourneyCompare";
import FareEstimator from "./pages/FareEstimator";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import Sustainability from "./pages/Sustainability";
import "./styles/global.css";

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/travel-modes" element={<TravelModes />} />
            <Route path="/planner" element={<JourneyPlanner />} />
            <Route path="/compare" element={<JourneyCompare />} />
            <Route path="/fare-estimator" element={<FareEstimator />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/sustainability" element={<Sustainability />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
