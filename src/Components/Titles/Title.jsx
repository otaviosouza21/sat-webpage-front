import React from "react";
import styles from "./Title.module.css";

const Title = ({ text, fontSize, subtitle }) => {
  const sizeFunction = (size) => {
    if (size === "1") return "5rem";
    if (size === "3") return "1.5rem";
  };

  return (
    <div className={styles.titleContainer}>
      <h1 style={{ fontSize: sizeFunction(fontSize) }}>{text}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};

export default Title;
