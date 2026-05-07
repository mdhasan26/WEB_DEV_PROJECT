import React from "react";
import styles from "./Card.module.css";

const Card = ({
  children,
  variant = "default",
  padding = "medium",
  hover = false,
  className = "",
  onClick,
  ...props
}) => {
  const classes = [
    styles.card,
    styles[variant],
    styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`],
    hover && styles.hover,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "" }) => (
  <div className={`${styles.header} ${className}`}>{children}</div>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={`${styles.content} ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = "" }) => (
  <div className={`${styles.footer} ${className}`}>{children}</div>
);

export default Card;
