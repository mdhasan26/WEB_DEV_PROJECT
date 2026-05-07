import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MapPin,
  Menu,
  X,
  Home,
  Bus,
  Route,
  Scale,
  Bell,
  Leaf,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import styles from "./Header.module.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/travel-modes", label: "Travel Modes", icon: Bus },
    { path: "/planner", label: "Journey Planner", icon: Route },
    { path: "/compare", label: "Compare", icon: Scale },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/alerts", label: "Alerts", icon: Bell },
    { path: "/sustainability", label: "Sustainability", icon: Leaf },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <MapPin className={styles.logoIcon} />
          <span className={styles.logoText}>St Mary's Mobility</span>
        </Link>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navLink} ${isActive(item.path) ? styles.active : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <button className={styles.notificationBtn}>
            <Bell size={20} />
            <span className={styles.notificationDot}></span>
          </button>

          <div className={styles.profile}>
            <button
              className={styles.profileBtn}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className={styles.avatar}>U</div>
              <ChevronDown size={16} />
            </button>

            {isProfileOpen && (
              <div className={styles.profileDropdown}>
                <Link to="/dashboard" onClick={() => setIsProfileOpen(false)}>
                  My Dashboard
                </Link>
                <Link
                  to="/sustainability"
                  onClick={() => setIsProfileOpen(false)}
                >
                  Sustainability
                </Link>
                <hr />
                <button>Settings</button>
                <button>Sign Out</button>
              </div>
            )}
          </div>

          <button
            className={styles.menuBtn}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.mobileNavLink} ${isActive(item.path) ? styles.active : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
