import React from "react";
import styles from "./Title.module.css";

const Title = ({className, text, fontSize, subtitle,icon,  }) => {
  const sizeFunction = (size) => {
    if (size === "1") return "5rem";
    if (size === "3") return "3rem";
    if (size === "2") return "2rem";
  };

  return (
    <div className={`${styles.titleContainer} ${className}`}>
      <h1 style={{ fontSize: sizeFunction(fontSize) }}>
        {text}
      </h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};

export default Title;
