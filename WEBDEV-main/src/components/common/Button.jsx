import React from "react";
import styles from "./Button.module.css";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  icon: Icon,
  iconPosition = "left",
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    loading && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <span className={styles.spinner}></span>
      ) : (
        <>
          {Icon && iconPosition === "left" && <Icon size={18} />}
          {children && <span>{children}</span>}
          {Icon && iconPosition === "right" && <Icon size={18} />}
        </>
      )}
    </button>
  );
};

export default Button;
