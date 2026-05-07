import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Mail, ExternalLink } from "lucide-react";
import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <MapPin size={24} />
              <span>St Mary's Mobility</span>
            </div>
            <p className={styles.description}>
              Your comprehensive travel companion for urban mobility. Plan
              journeys, compare options, and track your environmental impact.
            </p>
          </div>

          <div className={styles.links}>
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/travel-modes">Travel Modes</Link>
              </li>
              <li>
                <Link to="/planner">Journey Planner</Link>
              </li>
              <li>
                <Link to="/compare">Compare</Link>
              </li>
            </ul>
          </div>

          <div className={styles.links}>
            <h4>Features</h4>
            <ul>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/alerts">Alerts</Link>
              </li>
              <li>
                <Link to="/sustainability">Sustainability</Link>
              </li>
              <li>
                <Link to="/fare-estimator">Fare Estimator</Link>
              </li>
            </ul>
          </div>

          <div className={styles.contact}>
            <h4>Connect</h4>
            <div className={styles.social}>
              <a
                href="https://example.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Website"
              >
                <ExternalLink size={20} />
              </a>
              <a href="mailto:mobility@example.com" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            &copy; {currentYear} St Mary's Urban Mobility Hub. All rights
            reserved.
          </p>
          <p className={styles.disclaimer}>
            This is a student project for CPS4006 Web Design and Development.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
