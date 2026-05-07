import React, { useState } from "react";
import styles from "./Input.module.css";

const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  icon: Icon,
  required = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`${styles.inputGroup} ${className}`}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div
        className={`${styles.inputWrapper} ${isFocused ? styles.focused : ""} ${error ? styles.error : ""} ${disabled ? styles.disabled : ""}`}
      >
        {Icon && <Icon size={18} className={styles.icon} />}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={styles.input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default Input;
